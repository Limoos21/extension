

  function checkStreamAndSendRequest() {
    // Получаем текущий URL
    // const url = window.location.href;
    // Проверяем, является ли URL страницей стрима Twitch
    if (1) {
      // Если пользователь смотрит стрим, то отправляем запрос на сервер Django каждые 10 секунд
      chrome.storage.local.get("token", function (result) {
      const token = result.token;
      console.log("Токен:", token);

      setInterval(function() {
        fetch('http://127.0.0.1:8000/api/points/create/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
          },
          body: JSON.stringify({ 'key': 'value' })
        })
          .then(response => {
            if (response.ok) {
              console.log('Request sent successfully');
            } else {
              console.error('Request failed:', response.status);
            }
          })
          .catch(error => {
            console.error('Request error:', error);
          });
      }, 10000);
    });
  }
}

// Вызываем функцию при загрузке страницы
checkStreamAndSendRequest();

  // function getCsrfToken() {
  //   const xhr = new XMLHttpRequest();
  //   xhr.open('GET', 'http://127.0.0.1:8000/lkusers/api/points/getcsrf/');
  //   xhr.onload = function() {
  //     if (xhr.status === 200) {
  //       const response = JSON.parse(xhr.responseText);
  //       const csrfToken = response.csrf_token;
  //       // csrfToken теперь содержит полученный CSRF-токен
  //     }
  //   };
  //   xhr.send();
  // }