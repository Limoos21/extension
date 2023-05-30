
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
    let livestatus = false;
    // const namestreamer = document.getElementsByClassName('CoreText-sc-1txzju1-0 ScTitleText-sc-d9mj2s-0 jKVhlu igzOaC InjectLayout-sc-1i43xsx-0 tNDkq tw-title');
    let checkstatus = document.getElementsByClassName("CoreText-sc-1txzju1-0 jiQuvm");
    console.log("checkstatus", checkstatus.textContent);
    if (checkstatus.length <= 0)
    {
      console.log("Стример в сети")
     livestatus = true;
    } else { 
      console.log("Элемент класса пустой");
    }
    const video = document.querySelector('video');
    // const status = !!(video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2);
    let status = true;
    console.log("Status", status)
    let namestreamer =  document.querySelectorAll("h1"  );
    console.log("Имя стримера", namestreamer.textContent);
     chrome.storage.local.set({ 'videoStatus': status, "namestreamer": namestreamer, "livestatus": livestatus }, function() {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
      } else {
        console.log("Video status saved to local storage");
      }
    });
  }   
    

  setInterval(checkVideoStatus, 10000);
});


