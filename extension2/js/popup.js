chrome.cookies.getAll({domain: "twitch.tv"}, function(cookies) {
    let lenghtCockies = cookies.length
    let i = 0
    let timeObject
    let j
    while (i < lenghtCockies) {
        timeObject = cookies[i].name
        if (timeObject == 'name') {
            j = i
            i = lenghtCockies
        }
        i++
    }
    if (j) { // если залогинены
        const username = cookies[j].value;
        chrome.storage.local.set({"username":username})
    }
})
 chrome.storage.local.get(["user", "token", "streamerName", "serverResponse", "username"], function(result) {
     if (!result.username){
            document.querySelector(".username").remove();
            
            document.querySelector(".autorize_text");
            document.querySelector(".namwstreamer").remove();
            document.querySelector(".points").remove();
     }
     else{
         if (result.user !== null) {
            document.querySelector(".username").textContent = result.user;
            
            document.querySelector(".autorize_text").textContent = "Вы вошли как:";
            document.querySelector(".namwstreamer").textContent = result.streamerName
            document.querySelector(".points").textContent = result.serverResponse.msg
  }
         else {
            document.querySelector(".username").textContent = "вы вошли на twitch";
            S
            document.querySelector(".autorize_text").textContent = "не удалось авторизироваться на сайте streampoint";
            document.querySelector(".namwstreamer").remove();
            document.querySelector(".points").remove();
    }
 }

});