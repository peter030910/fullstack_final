const express = require('express');
const bodyParser = require('body-parser');
const googleSheets = require('gsa-sheets');
const exphbs = require('express-handlebars');
const key = require('./privateSettings.json');

const SPREADSHEET_ID = '1g9kYGZjpqNMvbhp2b8MfeecJmCQ0XUmSpdSUEGYwn_s';
//const html = https://docs.google.com/spreadsheets/d/1g9kYGZjpqNMvbhp2b8MfeecJmCQ0XUmSpdSUEGYwn_s/edit#gid=0;

const sheet = googleSheets(key.client_email, key.private_key, SPREADSHEET_ID);

const app = express();
const jsonParser = bodyParser.json();

const hbs = exphbs.create();
app.engine('handlebars',hbs.engine);
app.set('view engine','handlebars');

app.use(express.static('public'));


let answerIndex = null;
let vocabulary = [];

function onGetLoginPage(req, res) {
  res.render('LoginPage');
}
app.get('/', onGetLoginPage);

async function onPostLogin(req, res) {
  const body = req.body;
  const username = body.username;
  const password = body.password;
  const result= await sheet.getRows();
  const rows = result.rows;
  for(var row=1,len=rows.length;row<len;row++){
    if(username==rows[row][0]&&password==rows[row][1]){
      console.log(username+" Login Success");
      res.send("Success");
      return;
    }
  }
  console.log("Login fail");
  res.send("Fail");
}
app.post('/login',jsonParser,onPostLogin);

function onGetLevelPage(req, res) {
  res.render('LevelPage');
}
app.get('/levelpage', onGetLevelPage);

async function onGetMainPage(req, res) {
  const routeParams = req.params;
  var difficulty = routeParams.difficulty;
  var wordIndex=0;
  var definitionIndex=0;
  if(difficulty=="easy"){wordIndex=2;definitionIndex=3;}
  else if(difficulty=="middle"){wordIndex=4;definitionIndex=5;}
  else {wordIndex=6;definitionIndex=7;}
  const result= await sheet.getRows();
  const rows = result.rows;
  for(var row=1;row<51;row++){
    vocabulary[row-1]=[rows[row][wordIndex],rows[row][definitionIndex]];
  }
  answerIndex = Math.floor(Math.random()*50);
  const optionArray = [];
  optionArray[0]=answerIndex;
  var index = 1;
  while(index<4){
    innerblock:{
      for(var i=0;i<index;i++){
        const random = Math.floor(Math.random()*50)
        if(optionArray[i] != random){
          optionArray[index] = random;
          index+=1;
          break innerblock;
        }
      }
    }
  }
  optionArray.sort();
  const placeholder = {
    word:vocabulary[answerIndex][0],
    option1:vocabulary[optionArray.pop()][1],
    option2:vocabulary[optionArray.pop()][1],
    option3:vocabulary[optionArray.pop()][1],
    option4:vocabulary[optionArray.pop()][1]
  }
  res.render('MainPage',placeholder);
  console.log(difficulty);
}
app.get('/mainpage/:difficulty', onGetMainPage);


async function onPostRegister(req, res) {
  const body = req.body;
  const username = body.username;
  const password = body.password;
  const result= await sheet.getRows();
  const rows = result.rows;
  for(var row=1,len=rows.length;row<len;row++){
    if(username==rows[row][0]){
      console.log("duplicated");
      res.send({response:"fail"});
      return;
    }
  }
  const status = await sheet.appendRow([username,password]);
  res.send(status);
  console.log("Register Success");
}
app.post('/register',jsonParser,onPostRegister);

function onGetLookupPage(req, res) {
  console.log("dd");
  const routeParams = req.params;
  const option = routeParams.definition;
  console.log("dd");
  console.log(vocabulary[answerIndex][1]);
  console.log(option);
  if(option==vocabulary[answerIndex][1]){
    res.send("correct");
    return;
  }
  else
    res.send("wrong");
}
app.get('/lookup/:definition', onGetLookupPage);

async function onGetNextWordPage(req, res) {
  answerIndex = Math.floor(Math.random()*50);
  const optionArray = [];
  optionArray[0]=answerIndex;
  var index=1;
  while(index<4){
    innerblock:{
      for(var i=0;i<index;i++){
        const random = Math.floor(Math.random()*50)
        if(optionArray[i] != random){
          optionArray[index] = random;
          index+=1;
          break innerblock;
        }
      }
    }
  }
  optionArray.sort();
  const placeholder = {
    word:vocabulary[answerIndex][0],
    option1:vocabulary[optionArray.pop()][1],
    option2:vocabulary[optionArray.pop()][1],
    option3:vocabulary[optionArray.pop()][1],
    option4:vocabulary[optionArray.pop()][1]
  }
  res.json(placeholder);
}
app.get('/nextword', onGetNextWordPage);

async function onGetRecordPage(req, res) {
  const routeParams = req.params;
  const correctAmount = routeParams.correctAmount;
  console.log(correctAmount);
  placeholder = {
    amount:correctAmount
  }
  res.render('RecordPage',placeholder);
}
app.get('/record/:correctAmount', onGetRecordPage);

const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`Server listening on port ${port}!`);
});

