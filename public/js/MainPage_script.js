window.history.forward(1);
const container = document.querySelector('.container');
container.addEventListener('click',ifCorrect);
var life = 3;
var correctAmount = 0;

async function ifCorrect(e) {
    const statusPro = await fetch('/lookup/'+e.target.textContent);
    const status = await statusPro.text();
    const correct = document.querySelector('.correct');
    const wrong = document.querySelector('.wrong');
    const container = document.querySelector('.container');
    //container.classList.add('hidden');
    if(status=="correct"){
        correct.classList.remove('hidden');
        setTimeout(showNextWord,1000);
        correctAmount+=1;
    }
    else{  
        wrong.classList.remove('hidden');  
        setTimeout(showNextWord,1000);
        life-=1;
        if(life==0){
            window.location.href='/record/'+correctAmount;
        }
    }
}
async function  showNextWord(){
    const nextWordPro = await fetch('/nextword');
    const nextWord = await nextWordPro.json();
    const board = document.querySelector('.board');
    const option1 = document.querySelector('#option1');
    const option2 = document.querySelector('#option2');
    const option3 = document.querySelector('#option3');
    const option4 = document.querySelector('#option4');
    board.textContent = nextWord.word;
    option1.textContent = nextWord.option1;
    option2.textContent = nextWord.option2;
    option3.textContent = nextWord.option3;
    option4.textContent = nextWord.option4;
    const correct = document.querySelector('.correct');
    const wrong = document.querySelector('.wrong');
    correct.classList.add('hidden');
    wrong.classList.add('hidden');
   // window.location.href='/lookup/'+e.target.textContent;
}