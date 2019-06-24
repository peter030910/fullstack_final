async function form_receive(){
    const usernameElement = document.getElementById('login_username');
    const passwordElement = document.getElementById('login_password');
    const username = usernameElement.value;
    const password = passwordElement.value;
    const message = {
        username : username,
        password : password
    };
    const fetchOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
    };
    const record = await fetch('/login',fetchOptions);
    const status = await record.text();
    if(status=="Success") 
    window.location.href='/levelpage';
    else alert("Wrong Information");
}
async function register(){
    const usernameElement = document.getElementById('regis_username');
    const passwordElement = document.getElementById('regis_password');
    const username = usernameElement.value;
    const password = passwordElement.value;
    const message = {
        username : username,
        password : password
    };
    const fetchOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
    };
    const record = await fetch('/register',fetchOptions);
    const status = await record.json();
    if(status.response=="success"){
        window.location.href='/levelpage';
    }
    else{
        alert("The username has been used");
    }
}
function sign_up(){
    const boxElement = document.querySelector('.box');
    const boxfrontElement = document.querySelector('.box .front');
    const boxbackElement = document.querySelector('.box .back');
    boxbackElement.style.transform = 'rotateY(180deg)';
    boxElement.style.transform = 'rotateY(-180deg)';
    boxfrontElement.classList.add('hidden');
    boxbackElement.classList.remove('hidden');
}
function login(){
    const boxElement = document.querySelector('.box');
    const boxfrontElement = document.querySelector('.box .front');
    const boxbackElement = document.querySelector('.box .back');
    boxbackElement.style.transform = 'rotateY(180deg)';
    boxElement.style.transform = 'rotateY(0deg)';
    boxfrontElement.classList.remove('hidden');
    boxbackElement.classList.add('hidden');
}
