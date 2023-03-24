// let csrfToken;
// let authToken;


chrome.storage.local.get(['checkinstall'], function(result) {
  if (!result.hasOwnProperty('checkinstall') || result.checkinstall !== 'installed') {
    let settingsArr = [0, 0, 0, 0, 0];
    chrome.storage.local.set({"settings": settingsArr, "checkinstall": "installed"});
  }
});

function saveSettings(status, csrfToken, authToken, streamerIcon, streamerName) {
  const settingsArr = [status, csrfToken, authToken, streamerIcon, streamerName];
  chrome.storage.local.set({ "settings": settingsArr });
}
async function authorize(event) {
      event.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      console.log(username);
      console.log(password);

      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);

      try {
        const csrfResponse = await fetch("http://127.0.0.1:8000/lkusers/api/points/getcsrf/", {
          method: "GET",
        });
        const csrfData = await csrfResponse.json();
        console.log(csrfData);
        csrfToken = csrfData.csrf_token;

        const authResponse = await fetch("http://127.0.0.1:8000/auth/token/login/", {
          method: "POST",
          headers: {
            "X-CSRFToken": csrfToken,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username,
            password
          })
        });
        const authData = await authResponse.json();
        console.log(authData)
        authToken = authData.auth_token;
        console.log("Authorized");
        saveSettings(0, csrfToken, authToken, 0, 0);
        console.log(chrome.storage.local.get('settings'));
      } catch (error) {
        console.error("Authorization failed:", error);
      }
    }
chrome.storage.local.get(['settings'], async function (result) {
  if (!result.settings || (!result.settings[1] && !result.settings[2])) {
    document.getElementById("myButton").addEventListener("click", authorize);

  }
});

async function sendData(streamer, points) {
  const data = {
    streamer: streamer,
    points: points,
  };
  const json = JSON.stringify(data);
  document.getElementById("text1").innerText = json;
  const settings = await new Promise(resolve => chrome.storage.local.get(['settings'], resolve));

  try {
    if (!settings.settings[2]) {
      throw new Error("authToken not found in local storage");
    }

    const response = await fetch("http://127.0.0.1:8000/lkusers/api/points/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${settings.settings[2]}`,
        "X-CSRFToken": settings.settings[1],
      },
      body: json,
    });
    const responseData = await response.json();
    console.log(responseData);
  } catch (error) {
    console.error("Error sending data:", error);
  }
}

chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
  const url = tabs[0].url;
  if (url.startsWith("https://www.twitch.tv/")) {
    chrome.storage.local.get(['settings'], async function (result) {
      if (!result.settings || (!result.settings[1] && !result.settings[2])) {
        document.getElementById("myButton").addEventListener("click", authorize);
      } else {
        const authToken = result.settings[2];
        const csrfToken = result.settings[1]
        const streamerName = result.settings[4];

        if (authToken && csrfToken) {
          updateInfo();
        } else {
          document.getElementById("myButton").addEventListener("click", authorize);
        }
      }
      console.log(chrome.localStorage.get('settings'));
    });

    function updateInfo() {
      setInterval(async function () {
        chrome.storage.local.get(['settings'], async function (result) {
          const iconsContainer = document.querySelectorAll('.tw-image-avatar');
          const video = document.querySelector('.video-player');
          const status = !!(video && video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2);
          const idx = iconsContainer.length - 1;
          const streamerIcon = iconsContainer?.[idx] ? iconsContainer[idx].src : null;
          const streamerName = status && iconsContainer?.[idx] ? iconsContainer[idx].alt : null;

          if (!result.settings || !result.settings[1] || !result.settings[2]) {
            await authorize();
          }

          const {csrfToken, authToken} = result.settings ? {
            csrfToken: result.settings[1],
            authToken: result.settings[2]
          } : {};

          saveSettings(status, csrfToken, authToken, streamerIcon, streamerName);
          if (streamerName) {
          await sendData(streamerName, 100);
          }
          // await sendData(streamerName, 100);
          console.log(chrome.storage.local.get('settings'));

        });
        console.log(chrome.storage.local.get('settings'));
      }, 20000);
    }
    updateInfo();
  }
});
console.log(chrome.storage.local.get('settings'));
console.log("привет")



// chrome.storage.local.get(['checkinstall'], function(result) {
//     if (result.checkinstall) {
//       if (result.checkinstall != 'installed') {
//         let settingsArr = [0, 0, 0, 0, 0, 0]
//         chrome.storage.local.set({"settings": settingsArr});
//       }
//     } else {
//         let settingsArr = [0, 0, 0, 0, 0, 0]
//         chrome.storage.local.set({"settings": settingsArr});
//     }
// });