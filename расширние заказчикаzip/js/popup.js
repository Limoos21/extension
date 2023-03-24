window.onload=function(){
    chrome.cookies.getAll({domain: "twitch.tv"}, function(cookies){
        console.log(cookies)
    })
    chrome.cookies.getAll({domain: "twitch.tv"}, function(cookies){
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

            chrome.storage.local.get(['settings', 'time'], function(result) {

                if (result.settings) {
                    if (result.settings[0] == 0) {
                        document.querySelector('.main_deauth').remove()
                        document.querySelector('.auth_user_stream').remove()
                        document.querySelector('.auth_user').style.display = '';
                        document.querySelector('.text_ex_first_img').src=result.settings[1];
                        document.querySelector('.text_ex_second').textContent=cookies[j].value;
                        document.querySelector('.text_ex_second_two').innerText = '...';
                        document.querySelector('.text_ex_three').style.background = 'gray';
                        document.querySelector('.text_ex_three').style.color = 'lightgray';
                        document.querySelector('.text_ex_three').style.cursor = 'default';
                    } else if (result.settings[0] == 1) {
                        document.querySelector('.main_deauth').remove()
                        document.querySelector('.auth_user').remove()
                        document.querySelector('.auth_user_stream').style.display = '';
                        document.querySelector('.text_ex_first_img').src=result.settings[3];
                        document.querySelector('.text_ex_second').textContent=result.settings[4];
                        document.querySelector('.text_ex_second_two').textContent = result.time;
                        document.querySelector('.text_ex_three').removeProperty('background');
                        document.querySelector('.text_ex_three').removeProperty('color');
                        document.querySelector('.text_ex_three').removeProperty('cursor');

                        if (result.time) {
                            document.querySelector('.text_ex_second_two').innerText = result.time;
                        }
                    }

                    if (result.settings[2] != username) {
                        let newSettings = result.settings
                        newSettings[2] = username
                        chrome.storage.local.set({"settings": newSettings, "time": '...'})
                    }

                } else {
                    let settingsArr = [0, 0, username, 0, 0, 0]
                    chrome.storage.local.set({"settings": settingsArr});
                }
            })
        } else {
            document.querySelector('.auth_user').remove()
            document.querySelector('.auth_user_stream').remove()
            document.querySelector('.main_deauth').style.display = '';
        }
    });
}

