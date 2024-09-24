importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyCHNlQPicRXuTinfVo7Ba5Gu_55DMzQIYA",
    authDomain: "kastkaar-7789c.firebaseapp.com",
    projectId: "kastkaar-7789c",
    storageBucket: "kastkaar-7789c.appspot.com",
    messagingSenderId: "1025449351408",
    appId: "1:1025449351408:web:1050df694480842e1a4a35"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
