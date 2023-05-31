// Функция для обработки сообщений от content.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // Проверяем, есть ли в сообщении токен и имя пользователя
  if (request.token && request.user) {
    console.log("Токен:", request.token);
    console.log("Имя пользователя:", request.user);
    // Записываем токен и имя пользователя в локальное хранилище расширения
    chrome.storage.local.set({ "token": request.token, "user": request.user });
  }
  // Проверяем, есть ли в сообщении имя стримера и статус
  else if (request.namestreamer && request.livestatus) {
    console.log("Имя стримера:", request.namestreamer);
    console.log("Статус стримера:", request.livestatus);
    // Записываем имя стримера и статус в локальное хранилище расширения
    chrome.storage.local.set({ "namestreamer": request.namestreamer, "livestatus": request.livestatus });
  }
  // Иначе выводим ошибку
  else {
    console.error("Ошибка получения данных:", request.error);
  }
});





chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status === "complete" && tab.active) {
    let url = tab.url;
    console.log("Текущий URL:", url);
    let isTwitchPage = url.includes("twitch.tv");

    if (isTwitchPage) {
      checkStreamAndSendRequest();
    }
  }
});
function checkStreamAndSendRequest() {
  setInterval(function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs.length > 0) {
        let url = tabs[0].url;
        console.log("Текущий URL:", url);
        let isTwitchPage = url.includes("twitch.tv");

        if (isTwitchPage) {
          //TODO: ТУТ ЕГО НУЖНО БУДЕТ ПОЛУЧИТЬ ИЗ ЛОКАЛЬНОГО ХРАНИЛИЩА
          chrome.storage.local.get(["token", "videoStatus", "username", "livestatus", 'namestreamer'], function (result) {
            const token = result.token;
            let status = result.videoStatus;
            let livestatus = result.livestatus;
            let namestreamer = result.namestreamer;
            
            
            console.log("Токен:", token);
            console.log("Статус видео:", status);
            console.log ("Статус стримера:", livestatus);
            console.log("Имя стримера:", namestreamer);
            let username= result.username
            // const regex = /twitch.tv\/([^/]+)/;
            // const match = url.match(regex);
            // //TODO: ТУТ НУЖНО БУДЕТ ЗАПИСАТЬ ИМЯ СТРИМЕРА В ПЕРЕМЕННУЮ и офлайн не офлайн
            // const streamerName = match ? match[1] : null;
            console.log("Имя стримера, бэкгроунд:", namestreamer);
            

            // chrome.storage.local.set({ 'streamerName': streamerName }, function() {
            //   if (chrome.runtime.lastError) {
            //     console.error(chrome.runtime.lastError);
            //   } else {
            //     console.log("Streamer name saved to local storage");
            //   }
            // });
            // Добавить если не офлайн в условие
            if (namestreamer && username && livestatus) {
              fetch('http://127.0.0.1:8000/api/points/create/', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Token ${token}`
                },
                body: JSON.stringify({ 'namestreamer': namestreamer })
              })
                .then(response => {
                  if (response.ok) {
                    return response.json();
                  } else {
                    throw new Error('Request failed:', response.status);
                  }
                })
                .then(data => {

                  chrome.storage.local.set({ 'serverResponse': data }, function() {
                    if (chrome.runtime.lastError) {
                      console.error(chrome.runtime.lastError);
                    } else {
                      console.log("Server response saved to local storage");
                    }
                  });
                }) 
                .catch(error => {
                  console.error('Request error:', error);
                });
            }
          });
        }
      }
    });
  }, 10000);
}

checkStreamAndSendRequest();

