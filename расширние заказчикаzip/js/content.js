let csrfToken;
let authToken;

function saveSettings(status, csrfToken, authToken, streamerIcon, streamerName) {
  const settingsArr = [status, csrfToken, authToken, streamerIcon, streamerName];
  chrome.storage.local.set({ "settings": settingsArr });
}

// async function authorize(event) {
//   event.preventDefault();
//   const username = document.getElementById("username").value;
//   const password = document.getElementById("password").value;
//   console.log(username);
//   console.log(password);
//
//   const formData = new FormData();
//   formData.append('username', username);
//   formData.append('password', password);
//
//   try {
//     const csrfResponse = await fetch("http://127.0.0.1:8000/lkusers/api/points/getcsrf/", {
//       method: "GET",
//     });
//     const csrfData = await csrfResponse.json();
//     console.log(csrfData);
//     csrfToken = csrfData.csrf_token;
//
//     const authResponse = await fetch("http://127.0.0.1:8000/auth/token/login/", {
//       method: "POST",
//       headers: {
//         "X-CSRFToken": csrfToken,
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         username,
//         password
//       })
//     });
//     const authData = await authResponse.json();
//     console.log(authData)
//     authToken = authData.auth_token;
//     console.log("Authorized");
//     saveSettings(0, csrfToken, authToken, 0, 0);
//     console.log(localStorage.getItem('settings'));
//   } catch (error) {
//     console.error("Authorization failed:", error);
//   }
// }

// async function sendData(streamer, points) {
//   const data = {
//     streamer: streamer,
//     points: points,
//   };
//   const json = JSON.stringify(data);
//   document.getElementById("text1").innerText = json;
//   const settings = await new Promise(resolve => chrome.storage.local.get(['settings'], resolve));
//
//   try {
//     if (!settings.settings[2]) {
//       throw new Error("authToken not found in local storage");
//     }
//
//     const response = await fetch("http://127.0.0.1:8000/lkusers/api/points/create/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Token ${settings.settings[2]}`,
//         "X-CSRFToken": settings.settings[1],
//       },
//       body: json,
//     });
//     const responseData = await response.json();
//     console.log(responseData);
//   } catch (error) {
//     console.error("Error sending data:", error);
//   }
// }



// chrome.storage.local.get(['settings'], function(result) {
//   if (!result.settings || (!result.settings[1] && !result.settings[2])) {
//     document.getElementById("myButton").addEventListener("click", authorize);
//   }
//   // else {
//   //   const authToken = result.settings[2];
//   //   const streamerName = result.settings[4];
//   //
//   //   if (authToken && streamerName) {
//   //     startSending();
//   //   } else {
//   //     document.getElementById("myButton").addEventListener("click", authorize);
//   //   }
//   // }
// });
// function updateInfo() {
//   setInterval(async function() {
//     chrome.storage.local.get(['settings'], async function(result) {
//       // const iconsContainer = document.querySelectorAll('.tw-image-avatar');
//       // const video = document.querySelector('video');
//       // const status = !!(video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2);
//       // const idx = iconsContainer.length - 1;
//       // const streamerIcon = iconsContainer?.[idx] ? iconsContainer[idx].src : null;
//       // const streamerName = status && iconsContainer?.[idx] ? iconsContainer[idx].alt : null;
//       if (!result.settings || !result.settings[1] || !result.settings[2]) {
//         await authorize();
//       }
//
//       const {csrfToken, authToken} = result.settings ? {csrfToken: result.settings[1], authToken: result.settings[2]} : {};
//
//       saveSettings(status, csrfToken, authToken, streamerIcon, streamerName);
//     });
//   }, 20000);
// }
// updateInfo()



// let csrfToken;
// let authToken;
//
// function saveSettings(status, csrfToken, authToken, streamerIcon, streamerName) {
//   const settingsArr = [status, csrfToken, authToken, streamerIcon, streamerName];
//   chrome.storage.local.set({ "settings": settingsArr });
// }
//
// async function authorize(event) {
//   event.preventDefault();
//   const username = document.getElementById("username").value;
//   const password = document.getElementById("password").value;
//   console.log(username);
//   console.log(password);
//
//   const formData = new FormData();
//   formData.append('username', username);
//   formData.append('password', password);
//
//   try {
//     const csrfResponse = await fetch("http://127.0.0.1:8000/lkusers/api/points/getcsrf/", {
//       method: "GET",
//     });
//     const csrfData = await csrfResponse.json();
//     console.log(csrfData);
//     csrfToken = csrfData.csrf_token;
//
//     const authResponse = await fetch("http://127.0.0.1:8000/auth/token/login/", {
//       method: "POST",
//       headers: {
//         "X-CSRFToken": csrfToken,
//       },
//       body: formData,
//     });
//     const authData = await authResponse.json();
//     console.log(authData)
//     authToken = authData.auth_token;
//     console.log("Authorized");
//     return [csrfToken, authToken];
//   } catch (error) {
//     console.error("Authorization failed:", error);
//   }
// }
//
// async function sendData(streamer, points) {
//   const data = {
//     streamer: streamer,
//     points: points,
//   };
//   const json = JSON.stringify(data);
//   document.getElementById("text1").innerText = json;
//   const settings = await new Promise(resolve => chrome.storage.local.get(['settings'], resolve));
//
//   try {
//     if (!settings.settings[2]) {
//       throw new Error("authToken not found in local storage");
//     }
//
//     const response = await fetch("http://127.0.0.1:8000/lkusers/api/points/create/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Token ${settings.settings[2]}`,
//         "X-CSRFToken": settings.settings[1],
//       },
//       body: json,
//     });
//     const responseData = await response.json();
//     console.log(responseData);
//   } catch (error) {
//     console.error("Error sending data:", error);
//   }
// }
//
// let updateInfoInterval;
//
// chrome.storage.local.get(['settings'], function(result) {
//   if (!result.settings || (!result.settings[1] && !result.settings[2])) {
//     document.getElementById("myButton").addEventListener("click", authorize);
//   } else {
//     const authToken = result.settings[2];
//     const streamerName = result.settings[4];
//
//     if (authToken && streamerName) {
//       startSending();
//     } else {
//       document.getElementById("myButton").addEventListener("click", authorize);
//     }
//   }
// });
//
// function updateInfo() {
//   setInterval(async function() {
//     chrome.storage.local.get(['settings'], async function(result) {
//       const iconsContainer = document.querySelectorAll('.tw-image-avatar');
//       const video = document.querySelector('video');
//       const status = !!(video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2);
//       const idx = iconsContainer.length - 1;
//       const streamerIcon = iconsContainer?.[idx] ? iconsContainer[idx].src : null;
//       const streamerName = status && iconsContainer?.[idx] ? iconsContainer[idx].alt : null;
//
//       if (!result.settings || !result.settings[1] || !result.settings[2]) {
//         await authorize();
//       }
//
//       const {csrfToken, authToken} = result.settings ? {csrfToken: result.settings[1], authToken: result.settings[2]} : {};
//
//       saveSettings(status, csrfToken, authToken, streamerIcon, streamerName);
//     });
//   }, 10000);
// }





























// let csrfToken;
// let authToken;
//
// function saveSettings(status, csrfToken, authToken, streamerIcon, streamerName) {
//   const settingsArr = [status, csrfToken, authToken, streamerIcon, streamerName];
//   chrome.storage.local.set({ "settings": settingsArr });
// }
//
// async function authorize(event) {
//   event.preventDefault();
//   const username = document.getElementById("username").value;
//   const password = document.getElementById("password").value;
//   console.log(username);
//   console.log(password);
//
//   const formData = new FormData();
//   formData.append('username', username);
//   formData.append('password', password);
//
//   try {
//     const csrfResponse = await fetch("http://127.0.0.1:8000/lkusers/api/points/getcsrf/", {
//       method: "GET",
//     });
//     const csrfData = await csrfResponse.json();
//     console.log(csrfData);
//     csrfToken = csrfData.csrf_token;
//
//     const authResponse = await fetch("http://127.0.0.1:8000/auth/token/login/", {
//       method: "POST",
//       headers: {
//         "X-CSRFToken": csrfToken,
//       },
//       body: formData,
//     });
//     const authData = await authResponse.json();
//     console.log(authData)
//     authToken = authData.auth_token;
//     console.log("Authorized");
//
//     startSending();
//     return [csrfToken, authToken];
//   } catch (error) {
//     console.error("Authorization failed:", error);
//   }
// }
//
// async function sendData(streamer, points) {
//   const data = {
//     streamer: streamer,
//     points: points,
//   };
//   const json = JSON.stringify(data);
//   document.getElementById("text1").innerText = json;
//   const settings = await new Promise(resolve => chrome.storage.local.get(['settings'], resolve));
//
//   try {
//     if (!settings.settings[2]) {
//       throw new Error("authToken not found in local storage");
//     }
//
//     const response = await fetch("http://127.0.0.1:8000/lkusers/api/points/create/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Token ${settings.settings[2]}`,
//         "X-CSRFToken": settings.settings[1],
//       },
//       body: json,
//     });
//     const responseData = await response.json();
//     console.log(responseData);
//   } catch (error) {
//     console.error("Error sending data:", error);
//   }
// }
//
// let updateInfoInterval;
//
// chrome.storage.local.get(['settings'], function(result) {
//   if (!result.settings || (!result.settings[1] && !result.settings[2])) {
//     document.getElementById("myButton").addEventListener("click", authorize);
//   } else {
//     const authToken = result.settings[2];
//     const streamerName = result.settings[4];
//
//     if (authToken && streamerName) {
//       startSending();
//     } else {
//       document.getElementById("myButton").addEventListener("click", authorize);
//     }
//   }
// });
//
// function updateInfo() {
//   chrome.storage.local.get(['settings'], async function(result) {
//     const iconsContainer = document.querySelectorAll('.tw-image-avatar');
//     const video = document.querySelector('video');
//     const status = !!(video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2);
//     const idx = iconsContainer.length - 1;
//     const streamerIcon = iconsContainer?.[idx] ? iconsContainer[idx].src : null;
//     const streamerName = status && iconsContainer?.[idx] ? iconsContainer[idx].alt : null;
//
//     if (!result.settings || !result.settings[1] || !result.settings[2]) {
//       await authorize();
//     }
//
//     const {csrfToken, authToken} = result.settings ? {csrfToken: result.settings[1], authToken: result.settings[2]} : {};
//
//     saveSettings(status, csrfToken, authToken, streamerIcon, streamerName);
//   });
// }






















// let csrfToken;
// let authToken;
//
// function saveSettings(status, csrfToken, authToken, streamerIcon, streamerName) {
//   const settingsArr = [status, csrfToken, authToken, streamerIcon, streamerName];
//   chrome.storage.local.set({ "settings": settingsArr });
// }
//
// function updateInfo() {
//   chrome.storage.local.get(['settings'], function(result) {
//     const iconsContainer = document.querySelectorAll('.tw-image-avatar');
//     const video = document.querySelector('video');
//     const status = !!(video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2);
//     const idx = iconsContainer.length - 1;
//     const streamerIcon = iconsContainer?.[idx] ? iconsContainer[idx].src : null;
//     const streamerName = status && iconsContainer?.[idx] ? iconsContainer[idx].alt : null;
//
//     saveSettings(status, csrfToken, authToken, streamerIcon, streamerName);
//   });
// }
//
// async function authorize(event) {
//   event.preventDefault();
//   const username = document.getElementById("username").value;
//   const password = document.getElementById("password").value;
//   console.log(username);
//   console.log(password);
//
//   const formData = new FormData();
//   formData.append('username', username);
//   formData.append('password', password);
//
//   try {
//     const csrfResponse = await fetch("http://127.0.0.1:8000/lkusers/api/points/getcsrf/", {
//       method: "GET",
//     });
//     const csrfData = await csrfResponse.json();
//     console.log(csrfData);
//     csrfToken = csrfData.csrf_token;
//
//     const authResponse = await fetch("http://127.0.0.1:8000/auth/token/login/", {
//       method: "POST",
//       headers: {
//         "X-CSRFToken": csrfToken,
//       },
//       body: formData,
//     });
//     const authData = await authResponse.json();
//     console.log(authData)
//     authToken = authData.auth_token;
//     console.log("Authorized");
//
//     startSending();
//     return [csrfToken, authToken];
//   } catch (error) {
//     console.error("Authorization failed:", error);
//   }
// }
//
// async function sendData(streamer, points) {
//   const data = {
//     streamer: streamer,
//     points: points,
//   };
//   const json = JSON.stringify(data);
//   document.getElementById("text1").innerText = json;
//   const settings = await new Promise(resolve => chrome.storage.local.get(['settings'], resolve));
//
//   try {
//     if (!settings.settings[2]) {
//       throw new Error("authToken not found in local storage");
//     }
//
//     const response = await fetch("http://127.0.0.1:8000/lkusers/api/points/create/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Token ${settings.settings[2]}`,
//         "X-CSRFToken": settings.settings[1],
//       },
//       body: json,
//     });
//     const responseData = await response.json();
//     console.log(responseData);
//   } catch (error) {
//     console.error("Error sending data:", error);
//   }
// }
//
// let updateInfoInterval;
// function startSending() {
//   let time = 0;
//
//   setInterval(function () {
//     chrome.storage.local.get(['settings'], function(result) {
//       if (result.settings) {
//         time += 20;
//         const points = Math.floor(time / 40);
//         const status = result.settings[0]
//         if (status != 1) return;
//         const streamer = result.settings[4];
//         document.getElementById("text").innerText = streamer
//         document.getElementById("text1").innerText = points
//         sendData(streamer, points)
//       }
//     });
//   }, 20000);
//
//   updateInfoInterval = setInterval(function() {
//     updateInfo()
//   }, 1000);
// }
// chrome.storage.local.get(['settings'], function(result) {
//   if (result.settings) {
//     const authToken = result.settings[2];
//     const streamerName = result.settings[4];
//
//     if (authToken && streamerName) {
//       startSending();
//     } else {
//       document.getElementById("myButton").addEventListener("click", function authorize() {
//         window.close();
//       });
//     }
//   } else {
//     document.getElementById("myButton").addEventListener("click", function authorize() {
//         window.close();
//       });
//   }
// });

// function stopSending() {
//   clearInterval(updateInfoInterval);
// }
//
// document.getElementById("stopButton").addEventListener("click", stopSending);










// let csrfToken;
// let authToken;
//
// function saveSettings(status, csrfToken, authToken, streamerIcon, streamerName) {
//   const settingsArr = [status, csrfToken, authToken, streamerIcon, streamerName];
//   chrome.storage.local.set({ "settings": settingsArr });
// }
//
// function updateInfo() {
//   chrome.storage.local.get(['settings'], function(result) {
//     const iconsContainer = document.querySelectorAll('.tw-image-avatar');
//     const video = document.querySelector('video');
//     const status = !!(video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2);
//     const idx = iconsContainer.length - 1;
//     const streamerIcon = iconsContainer?.[idx] ? iconsContainer[idx].src : null;
//     const streamerName = status && iconsContainer?.[idx] ? iconsContainer[idx].alt : null;
//
//     saveSettings(status, csrfToken, authToken, streamerIcon, streamerName);
//   });
// }
//
// async function authorize(event) {
//   event.preventDefault();
//   const username = document.getElementById("username").value;
//   const password = document.getElementById("password").value;
//   console.log(username);
//   console.log(password);
//
//   const formData = new FormData();
//   formData.append('username', username);
//   formData.append('password', password);
//
//   try {
//     const csrfResponse = await fetch("http://127.0.0.1:8000/lkusers/api/points/getcsrf/", {
//       method: "GET",
//     });
//     const csrfData = await csrfResponse.json();
//     console.log(csrfData);
//     csrfToken = csrfData.csrf_token;
//
//     const authResponse = await fetch("http://127.0.0.1:8000/auth/token/login/", {
//       method: "POST",
//       headers: {
//         "X-CSRFToken": csrfToken,
//       },
//       body: formData,
//     });
//     const authData = await authResponse.json();
//     console.log(authData)
//     authToken = authData.auth_token;
//     console.log("Authorized");
//
//     startSending();
//     return [csrfToken, authToken];
//   } catch (error) {
//     console.error("Authorization failed:", error);
//   }
// }
//
// async function sendData(streamer, points) {
//   const data = {
//     streamer: streamer,
//     points: points,
//   };
//   const json = JSON.stringify(data);
//   document.getElementById("text1").innerText = json;
//   const settings = await new Promise(resolve => chrome.storage.local.get(['settings'], resolve));
//
//   try {
//     if (!settings.settings[2]) {
//       throw new Error("authToken not found in local storage");
//     }
//
//     const response = await fetch("http://127.0.0.1:8000/lkusers/api/points/create/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Token ${settings.settings[2]}`,
//         "X-CSRFToken": settings.settings[1],
//       },
//       body: json,
//     });
//     const responseData = await response.json();
//     console.log(responseData);
//   } catch (error) {
//     console.error("Error sending data:", error);
//   }
// }
//
// let updateInfoInterval;
//
// function startSending() {
//   let time = 0;
//
//   setInterval(function () {
//     chrome.storage.local.get(['settings'], function(result) {
//     if (result.settings) {
//       time += 20;
//       const points = Math.floor(time / 40);
//       const status = result.settings[0]
//       if (status != 1) return;
//       const streamer = result.settings[4];
//       document.getElementById("text").innerText = streamer
//       document.getElementById("text1").innerText = points
//       sendData(streamer, points)
//     }
//   });
//
//     updateInfoInterval = setInterval(function() {
//         updateInfo()
//     }, updateInfoInterval ? 1000 : 1);
//
//   }); // add a closing curly brace here
// }
//
// chrome.storage.local.get(['settings'], function(result) {
//   if (result.settings) {
//     const authToken = result.settings[2];
//     const streamerName = result.settings[4];
//
//     if (authToken && streamerName) {
//       startSending();
//     } else {
//       document.getElementById("myButton").addEventListener("click", authorize);
//     }
//   } else {
//     document.getElementById("myButton").addEventListener("click", authorize);
//   }
// });















// let csrfToken;
// let authToken;
//
// function saveSettings(status, csrfToken, authToken, streamerIcon, streamerName) {
//   const settingsArr = [status, csrfToken, authToken, streamerIcon, streamerName];
//   chrome.storage.local.set({ "settings": settingsArr });
// }
//
// function updateInfo() {
//   chrome.storage.local.get(['settings'], function(result) {
//     const iconsContainer = document.querySelectorAll('.tw-image-avatar');
//     const video = document.querySelector('video');
//     const status = !!(video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2);
//     const idx = iconsContainer.length - 1;
//     const streamerIcon = iconsContainer?.[idx] ? iconsContainer[idx].src : null;
//     const streamerName = status && iconsContainer?.[idx] ? iconsContainer[idx].alt : null;
//
//     saveSettings(status, csrfToken, authToken, streamerIcon, streamerName);
//   });
// }
//
// async function authorize(event) {
//   event.preventDefault();
//   const username = document.getElementById("username").value;
//   const password = document.getElementById("password").value;
//   console.log(username);
//   console.log(password);
//
//   const formData = new FormData();
//   formData.append('username', username);
//   formData.append('password', password);
//
//   try {
//     const csrfResponse = await fetch("http://127.0.0.1:8000/lkusers/api/points/getcsrf/", {
//       method: "GET",
//     });
//     const csrfData = await csrfResponse.json();
//     console.log(csrfData);
//     csrfToken = csrfData.csrf_token;
//
//     const authResponse = await fetch("http://127.0.0.1:8000/auth/token/login/", {
//       method: "POST",
//       headers: {
//         "X-CSRFToken": csrfToken,
//       },
//       body: formData,
//     });
//     const authData = await authResponse.json();
//     console.log(authData)
//     authToken = authData.auth_token;
//     console.log("Authorized");
//
//     startSending();
//     return [csrfToken, authToken];
//   } catch (error) {
//     console.error("Authorization failed:", error);
//   }
// }
// chrome.storage.local.get(['settings'], function(result) {
//     async function sendData(streamer, points) {
//       const data = {
//         streamer: streamer,
//         points: points,
//       };
//       const json = JSON.stringify(data);
//       document.getElementById("text1").innerText = json;
//       const authT = result.settings[2]
//       const csrf = result.settings[1];
//
//       try {
//         if (!authT) {
//           throw new Error("authToken not found in local storage");
//         }
//
//         const response = await fetch("http://127.0.0.1:8000/lkusers/api/points/create/", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Token ${authT}`,
//             "X-CSRFToken": csrf,
//           },
//           body: json,
//         });
//         const responseData = await response.json();
//         console.log(responseData);
//       } catch (error) {
//         console.error("Error sending data:", error);
//       }
//   }
//
//
// });
//
//
// let updateInfoInterval;
//
//
// function startSending() {
//   let time = 0;
//
//   setInterval(function () {
//     chrome.storage.local.get(['settings'], function(result) {
//     if (result.settings) {
//       time += 20;
//       const points = Math.floor(time / 40);
//       const status = result.settings[0]
//       if (status != 1) return;
//       const streamer = result.settings[4];
//       document.getElementById("text").innerText = streamer
//       document.getElementById("text1").innerText = points
//       sendData(streamer, points)
//     }
//   });
//
//     updateInfoInterval = setInterval(function() {
//         updateInfo()
//     }, updateInfoInterval ? 1000 : 1);
//
// });
//
// chrome.storage.local.get(['settings'], function(result) {
//   if (result.settings) {
//     const authToken = result.settings[2];
//     const streamerName = result.settings[4];
//
//     if (authToken && streamerName) {
//       startSending();
//     } else {
//       document.getElementById("myButton").addEventListener("click", authorize);
//     }
//   } else {
//     document.getElementById("myButton").addEventListener("click", authorize);
//   }
// })








// function saveSettings(status, csrfToken, authToken, streamerIcon, streamerName) {
//     let settingsArr = [status, csrfToken, authToken, streamerIcon, streamerName]
//     chrome.storage.local.set({"settings": settingsArr});
// }
//
// function updateInfo() {
//
//     chrome.storage.local.get(['settings'], function() {
//
//         const iconsContainer = document.querySelectorAll('.tw-image-avatar');
//         let csrfToken = csrfToken;
//         let authToken = authToken;
//         const video = document.querySelector('video');
//         const status = !!(video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2);
//         const idx = iconsContainer.length - 1;
//         const streamerIcon = iconsContainer?.[idx] ? iconsContainer[idx].src : null;
//         const streamerName = status && iconsContainer?.[idx] ? iconsContainer?.[idx]?.alt : null;
//
//
//         saveSettings(status, csrfToken, authToken, streamerIcon, streamerName)
//     });
// }
//
//
// async function authorize(event) {
//     event.preventDefault(); // предотвращаем отправку формы по умолчанию
//     const username = document.getElementById("username").value;
//     const password = document.getElementById("password").value;
//     console.log(username)
//     console.log(password)
//
//     const formData = new FormData();
//     formData.append('username', username);
//     formData.append('password', password);
//
//     try {
//         // Получаем CSRF-токен
//         const csrfResponse = await fetch("http://127.0.0.1:8000/lkusers/api/points/getcsrf/", {
//             method: "GET",
//         });
//         const csrfData = await csrfResponse.json();
//         console.log(csrfData);
//         csrfToken = csrfData.csrf_token;
//         // Отправляем данные для авторизации и получения токена авторизации
//         const authResponse = await fetch("http://127.0.0.1:8000/auth/token/login/", {
//             method: "POST",
//             headers: {
//                 "X-CSRFToken": csrfToken,
//             },
//             body: formData,
//         });
//         const authData = await authResponse.json();
//         console.log(authData)
//         authToken = authData.auth_token;
//         console.log("Authorized");
//         return [csrfToken, authToken];
//         startSending();
//     } catch (error) {
//         console.error("Authorization failed:", error);
//     }
// }
// function updateTimer() {
//
//     chrome.storage.local.get(['settings'], function(result) {
//
//         if (result.settings) {
//             const status = result.settings[0]
//             if (status != 1) return;
//             const streamer = result.settings[4];
//             let csrftoken = result.settings[1];
//             let authToken = result.settings[2];
//
//
//                 async function sendData(points) {
//                 const data = {
//                     streamer: streamer,
//                     points: points,
//                 };
//                 const json = JSON.stringify(data);
//                 document.getElementById("text1").innerText = json;
//
//                 try {
//                     if (!authToken) {
//                         throw new Error("authToken not found in local storage");
//                     }
//
//                     // Добавление csrf-токена и токена авторизации в заголовок запроса аутентификации
//                     const response = await fetch("http://127.0.0.1:8000/lkusers/api/points/create/", {
//                         method: "POST",
//                         headers: {
//                             "Content-Type": "application/json",
//                             "Authorization": `Token ${authToken}`,
//                             "X-CSRFToken": csrftoken,
//                         },
//                         body: json,
//                     });
//                     const responseData = await response.json();
//                     console.log(responseData);
//                 } catch (error) {
//                     console.error("Error sending data:", error);
//                 }
//             }
//         }
//     });
// }
//
// const intervals = {
//     updateInfo: '',
//     updateTimer: '',
// };
// window.onload=function(){
//     if (window.location.host === 'www.twitch.tv') {
//         function startSending() {
//             let time = 0;
//
//             setInterval(function () {
//                 time += 20;
//                 const points = Math.floor(time / 40);
//                 sendData(points);
//             }, 20000);
//         }
//
//
//         intervals.updateInfo = setInterval(function() {
//             updateInfo()
//         }, intervals.updateInfo ? 1000 : 1);
//
//
//         intervals.updateTimer = setInterval(function() {
//             updateTimer()
//         }, intervals.updateTimer ? 60 * 1000 : 1000);
//     }
// }
// chrome.storage.local.get(['settings'], function(result) {
//     window.addEventListener('DOMContentLoaded', function () {
//     if (result.settings[2]&&result.settings[3]) {
//         startSending();
//     } else {
//         document.getElementById("myButton").addEventListener("click", authorize);
//     }
//     });
// })




// function saveSettings(status, csrfToken, authToken, streamerIcon, streamerName) {
//     let settingsArr = [status, csrfToken, authToken, streamerIcon, streamerName]
//     chrome.storage.local.set({"settings": settingsArr});
// }
//
// // const getUserName = () => {
// //     const userLoginCookie =
// //       document.cookie.split(';').filter((el) => {
// //           return el.includes(' login=');
// //       });
// //     if (userLoginCookie.length) {
// //         return userLoginCookie[0].split('=')[1].trim();
// //     }
// //     return null;
// // }
//
// function updateInfo() {
//
//     chrome.storage.local.get(['settings'], function() {
//
//         const iconsContainer = document.querySelectorAll('.tw-image-avatar');
//         let csrfToken = csrfToken;
//         let authToken = authToken;
//         const video = document.querySelector('video');
//         const status = !!(video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2);
//         const idx = iconsContainer.length - 1;
//         const streamerIcon = iconsContainer?.[idx] ? iconsContainer[idx].src : null;
//         const streamerName = status && iconsContainer?.[idx] ? iconsContainer?.[idx]?.alt : null;
//
//
//         saveSettings(status, csrfToken, authToken, streamerIcon, streamerName)
//     });
// }
//
//
// async function authorize(event) {
//     event.preventDefault(); // предотвращаем отправку формы по умолчанию
//     const username = document.getElementById("username").value;
//     const password = document.getElementById("password").value;
//     console.log(username)
//     console.log(password)
//
//     const formData = new FormData();
//     formData.append('username', username);
//     formData.append('password', password);
//
//     try {
//         // Получаем CSRF-токен
//         const csrfResponse = await fetch("http://127.0.0.1:8000/lkusers/api/points/getcsrf/", {
//             method: "GET",
//         });
//         const csrfData = await csrfResponse.json();
//         console.log(csrfData);
//         csrfToken = csrfData.csrf_token;
//
//
//         // localStorage.setItem("csrfToken", csrfToken);
//         // document.getElementById("text2").innerText = csrfToken;
//
//         // Отправляем данные для авторизации и получения токена авторизации
//         const authResponse = await fetch("http://127.0.0.1:8000/auth/token/login/", {
//             method: "POST",
//             headers: {
//                 "X-CSRFToken": csrfToken,
//             },
//             body: formData,
//         });
//         const authData = await authResponse.json();
//         console.log(authData)
//         authToken = authData.auth_token;
//         // localStorage.setItem("authToken", authToken); // сохраняем токен в локальном хранилище
//         // document.getElementById("text").innerText = JSON.stringify(authData);
//         console.log("Authorized");
//         return [csrfToken, authToken];
//         // startSending();
//     } catch (error) {
//         console.error("Authorization failed:", error);
//     }
// }
//
//
//
//
//
// function updateTimer() {
//
//     chrome.storage.local.get(['settings'], function(result) {
//
//         if (result.settings) {
//             const status = result.settings[0]
//             if (status != 1) return;
//
//             // const viewer = result.settings[2];
//             const streamer = result.settings[4];
//             let csrftoken = result.settings[1];
//             let authToken = result.settings[2];
//
//
//                 async function sendData(points) {
//                 const data = {
//                     streamer: streamer,
//                     points: points,
//                 };
//                 const json = JSON.stringify(data);
//                 document.getElementById("text1").innerText = json;
//
//                 try {
//                     if (!authToken) {
//                         throw new Error("authToken not found in local storage");
//                     }
//
//                     // Добавление csrf-токена и токена авторизации в заголовок запроса аутентификации
//                     const response = await fetch("http://127.0.0.1:8000/lkusers/api/points/create/", {
//                         method: "POST",
//                         headers: {
//                             "Content-Type": "application/json",
//                             "Authorization": `Token ${authToken}`,
//                             "X-CSRFToken": csrftoken,
//                         },
//                         body: json,
//                     });
//                     const responseData = await response.json();
//                     console.log(responseData);
//                 } catch (error) {
//                     console.error("Error sending data:", error);
//                 }
//             }
//
//             // $.post('https://twitchpoints.ru/php/api/timer?viewer=' + viewer + '&streamer=' + streamer,
//             //     contentType="application/json; charset=utf-8", function( data ) {
//             //
//             //         let time;
//             //         let error;
//             //         if (data['error']) {
//             //             time = '-';
//             //             error = data['error'];
//             //         } else {
//             //             time = Math.round(data['time']);
//             //         }
//             //         chrome.storage.local.set({"time": time, "error": error});
//             //     }, "json")
//             //     .fail(function(err) {
//             //         chrome.storage.local.set({"error": err});
//             //     });
//         }
//     });
// }
//
// const intervals = {
//     updateInfo: '',
//     updateTimer: '',
// };
// window.onload=function(){
//     if (window.location.host === 'www.twitch.tv') {
//         function startSending() {
//             let time = 0;
//
//             setInterval(function () {
//                 time += 20;
//                 const points = Math.floor(time / 40);
//                 sendData(streamer, points);
//             }, 20000);
//         }
//
//
//         intervals.updateInfo = setInterval(function() {
//             updateInfo()
//         }, intervals.updateInfo ? 1000 : 1);
//
//
//         intervals.updateTimer = setInterval(function() {
//             updateTimer()
//         }, intervals.updateTimer ? 60 * 1000 : 1000);
//     }
// }
// chrome.storage.local.get(['settings'], function(result) {
//     window.addEventListener('DOMContentLoaded', function () {
//     if (result.settings[2]&&result.settings[3]) {
//         startSending();
//     } else {
//         document.getElementById("myButton").addEventListener("click", authorize);
//     }
//     });
// })