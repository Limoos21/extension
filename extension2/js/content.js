
async function getToken() {
  const tokenUrl = "http://127.0.0.1:8000/api/get/token/";
  const response = await fetch(tokenUrl);
  if (response.ok) {
    const responseData = await response.json();
    const token = responseData.token;
    const username = responseData.user;
    console.log("Токен:", token);
    console.log("Имя пользователя", username);
    chrome.storage.local.set({ "token": token, "user": username });
  } else {
    console.error("Ошибка получения токена:", response.status);
  }
  chrome.storage.local.get("user", function(result) {
    console.log("имя пользователя", result.user);
  });
}

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("myButton").addEventListener("click", getToken);

  function checkVideoStatus() {
    let video = document.querySelector('video');
    let status = true;
    console.log("Status:", status);

    // Сохранение статуса видео в локальное хранилище Chrome
    chrome.storage.local.set({ 'videoStatus': status }, function() {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
      } else {
        console.log("Video status saved to local storage");
      }
    });
  }

  setInterval(checkVideoStatus, 10000);
});


