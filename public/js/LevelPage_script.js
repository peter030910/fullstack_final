const container = document.querySelector('.container');
container.addEventListener('click',startChanllenge);

function startChanllenge(e) {
    window.location.href='/mainpage/'+e.target.dataset.name;
    //window.location.href='/levelpage1';
}