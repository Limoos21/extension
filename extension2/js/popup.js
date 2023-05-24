
 chrome.storage.local.get(["user", "token", "streamerName", "serverResponse"], function(result) {
  if (result.user !== null) {
    document.querySelector(".username").textContent = result.user;
    document.getElementById("myButton").remove();
    document.querySelector(".autorize_text").textContent = "Вы вошли как:";
    document.querySelector(".namwstreamer").textContent = result.streamerName
    document.querySelector(".points").textContent = result.serverResponse.msg
  } else {
    // Здесь можно добавить дополнительные действия при отсутствии пользователя
  }
});