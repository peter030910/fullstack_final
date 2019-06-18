function form_receive(){
    const usernameElement = document.getElementById('username');
    const passwordElement = document.getElementById('password');
    const username = usernameElement.value;
    const password = passwordElement.value;
    console.log(username+password);
}
function register(){
    const usernameElement = document.getElementById('username');
    const passwordElement = document.getElementById('password');
    const username = usernameElement.value;
    const password = passwordElement.value;
    console.log(username+password);
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
