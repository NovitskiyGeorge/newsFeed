const WIDGET = document.querySelector(".widget");
let count = 0;
const MESSAGES = [ 
  {
    title: "Jaguar F-Pace SVR стал быстрее после рестайлинга",
    author: "Drive",
    date: "04.12",
    time: "09:30",
    details: "Подробнее",
    status: "прочитано",
  },
  {
    title: "ВТБ сообщил о новом виде мошенничества с платежами ЖКХ",
    author: "Интерфакс",
    date: "04.12",
    time: "13:10",
    details: "Подробнее",
    status: "прочитано",
  },
];

MESSAGES.forEach(function (item) { 
  count++;
});

let mess = document.createElement("div");
mess.className = "mess";
mess.innerHTML = `сообщения: ${count}`;
WIDGET.append(mess);

mess.addEventListener("click", function () {
  let newsFeed = document.createElement("div");
  newsFeed.className = "newsFeed";
  WIDGET.append(newsFeed);
  newsFeed.innerHTML = getAllMessages();
});

function getAllMessages() {
  return MESSAGES.map((message) => getMessageHtml(message)).join(''); 
}

function getMessageHtml(message) {
  return `<div class="news">
                <div class="news__title">${message.title}</div>
                <div class="news__info">
                    <div class="news__info__author">${message.author}</div>
                    <div class="news__info__time">${message.time} ${message.date}</div>
                </div>
                <div class="news__statusInfo">
                    <div class="news__statusInfo__detail">${message.details}</div>
                    <div class="news__statusInfo__status"></div>
                </div>
            </div>`;
}

document.addEventListener("click", function (e) {
  if (e.target && e.target.className == "news__statusInfo__detail") {
    let status = document.querySelectorAll(".news__statusInfo__status");
    let detail = document.querySelectorAll(".news__statusInfo__detail");
    let statusInfo = document.querySelectorAll(".news__statusInfo");

    detail.forEach(function (item, i) {
      item.id = i;
    });
    let idNews = +e.target.id;
    console.log(idNews);

    statusInfo[idNews].classList.add("news__statusInfo-active");
    if (statusInfo[idNews].classList.contains("news__statusInfo-active")) {
      count--;
      status[idNews].innerHTML = "прочитано";
    }
    mess.innerHTML = `сообщения: ${count}`;
  }
});
