
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
          chrome.storage.local.get(["token", "videoStatus"], function (result) {
            const token = result.token;
            let status = result.videoStatus;
            console.log("Токен:", token);
            console.log("Статус видео:", status);

            const regex = /twitch.tv\/([^/]+)/;
            const match = url.match(regex);
            //TODO: ТУТ НУЖНО БУДЕТ ЗАПИСАТЬ ИМЯ СТРИМЕРА В ПЕРЕМЕННУЮ
            const streamerName = match ? match[1] : null;
            console.log("Имя стримера:", streamerName);

            // Запись имени стримера в локальное хранилище Chrome
            chrome.storage.local.set({ 'streamerName': streamerName }, function() {
              if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError);
              } else {
                console.log("Streamer name saved to local storage");
              }
            });

            if (streamerName && status) {
              fetch('http://127.0.0.1:8000/api/points/create/', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Token ${token}`
                },
                body: JSON.stringify({ 'streamerName': streamerName })
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

