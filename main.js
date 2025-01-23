//Элементы
const body = document.querySelector("body");
const search = document.getElementById("search");

//Кнопки
const themeBtn = document.querySelector("#themeChange");
const searchBtn = document.querySelector("#themeChange");

//слушатели событий
themeBtn.addEventListener("click", themeChange);
searchBtn.addEventListener("click", findMovie);

function themeChange() {
  body.classList.toggle("dark");
}

async function findMovie() {
  const loader = document.querySelector(".loader");
  loader.computedStyleMap.display = "block";
  const data = { apikey: "126114d1", t: search.value };
  const response = await sendRequerst("http://www.omdbapi.com", "GET", data);
  loader.computedStyleMap.display = "none";
  if (response.Response === "False") {
  } else {
    showMuvie(response)  //тут происходит замыкание
  }
}

function showMuvie(data){

}


async function sendRequest(url, method, data) {
    if (method == "POST") {
      let response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      response = await response.json();
      return response;
    } else if (method == "GET") {
      url = url + "?" + new URLSearchParams(data);
      let response = await fetch(url, {
        method: "GET",
      });
      response = await response.json();
      return response;
    }
  }

