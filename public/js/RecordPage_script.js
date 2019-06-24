const back = document.querySelector('.back');
back.addEventListener('click',backtoLevel);

function backtoLevel(e) {
    window.location.href='/levelpage';
}