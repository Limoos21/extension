chrome.storage.local.get(['checkinstall'], function(result) {
    if (!result.hasOwnProperty('checkinstall') || result.checkinstall !== 'installed') {
      let settingsArr = [0, 0, 0, 0, 0];
      chrome.storage.local.set({"settings": settingsArr, "checkinstall": "installed"});
    }
  });
  
  function saveSettings(status, csrfToken, authToken) 
  {
    const settingsArr = [status, csrfToken, authToken];
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

  function checkStreamAndSendRequest() {
    // Получаем текущий URL
    // const url = window.location.href;
    // Проверяем, является ли URL страницей стрима Twitch
    if (1) {
      // Если пользователь смотрит стрим, то отправляем запрос на сервер Django каждые 10 секунд
      setInterval(function() {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://127.0.0.1:8000/api/points/create/', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = function() {
          if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            console.log('Request sent successfully');
          }
        };
        const data = {
          'key': 'value'
        };
        xhr.send(JSON.stringify(data));
      }, 10000);
    }
  }
  
  // Вызываем функцию при загрузке страницы
  checkStreamAndSendRequest();

  function getCsrfToken() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://127.0.0.1:8000/lkusers/api/points/getcsrf/');
    xhr.onload = function() {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        const csrfToken = response.csrf_token;
        // csrfToken теперь содержит полученный CSRF-токен
      }
    };
    xhr.send();
  }
  getCsrfToken();