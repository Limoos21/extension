
// Функция для получения токена и имени пользователя из API и отправки их в background.js
async function getToken() {
 const tokenUrl = "http://127.0.0.1:8000/api/get/token/";
 const response = await fetch(tokenUrl);
 if (response.ok) {
 const responseData = await response.json();
 const token = responseData.token;
 const username = responseData.user;
 console.log("Токен:", token);
 console.log("Имя пользователя", username);
 // Отправляем токен и имя пользователя в background.js
 chrome.runtime.sendMessage({ token: token, user: username });
 } else {
 console.error("Ошибка получения токена:", response.status);
 }
}

// Функция для проверки статуса стримера и отправки его имени в background.js
function checkVideoStatus() {
 console.log("Функция запущена");
 let livestatus = false;
 let streamerName = document.querySelector(".channel-info-content .tw-title")?.textContent;

 let checkstatus = document.querySelector(".jiQuvm")?.textContent;

 if (checkstatus == null) {
 console.log("Стример в сети");
 console.log(checkstatus);
 livestatus = true;
 } else {
 console.log("Стример не в сети");
 console.log(checkstatus);
 }

 let status = true;
 console.log("Status:", status);

 console.log("Имя стримера контент js:", streamerName);

 chrome.runtime.sendMessage({ namestreamer: streamerName, livestatus: livestatus });
}

document.addEventListener("DOMContentLoaded", function() {
 document.getElementById("myButton").addEventListener("click", getToken);
});

// Запускаем функцию checkVideoStatus каждые 10 секунд
setInterval(checkVideoStatus, 1000);



