
async function getToken() {
  const tokenUrl = "http://127.0.0.1:8000/api/get/token/"; // Замените на ваш URL представления TokenApi
  const response = await fetch(tokenUrl);
  if (response.ok) {
    const responseData = await response.json();
    const token = responseData.token;
    const username = responseData.user
    console.log("Токен:", token);
    console.log("Имя пользователя", username)
    chrome.storage.local.set({"token": token, "user":username})
  } else {
    console.error("Ошибка получения токена:", response.status);
  }
}

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("myButton").addEventListener("click", getToken);
});

