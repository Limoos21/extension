chrome.storage.local.get(["user", "token"], function(result){
    if (result.user !== null){
        document.querySelector(".username").textContent = result.user
        document.getElementById(".myButton").remove()
        document.querySelector(".autorize_text").textContent = "Вы вошли как:"
    }
    else {

    }
})