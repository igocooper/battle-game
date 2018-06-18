import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAOOClfjA5kn7SeurmD1pkwv94vMxxiOYA",
    authDomain: "technolog-battle-game.firebaseapp.com",
    databaseURL: "https://technolog-battle-game.firebaseio.com",
    projectId: "technolog-battle-game",
    storageBucket: "technolog-battle-game.appspot.com",
    messagingSenderId: "542520700328"
  };

export const firebaseApp = firebase.initializeApp(config); 