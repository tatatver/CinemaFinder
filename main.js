//Элементы 
const body = document.querySelector("body");

//Кнопки
const themeBtn = document.querySelector("#themeChange");

//слушатели событий
themeBtn.addEventListener("click",themeChange);

function themeChange(){
    body.classList.toggle("dark")
}