import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey:  'AIzaSyAyILZQHaatSRRU2FdTUnmT_zE_02jerzg',//'AIzaSyAOWHBpPhKoNhcGFKHH_Q_0AtL2gV-imgQ',
  authDomain:  'https://reactfirebase-13e81.firebaseio.com',//'production-a9404.firebaseapp.com',
  databaseURL: 'https://reactfirebase-13e81.firebaseio.com',//'https://production-a9404.firebaseio.com',
  projectId: 'reactfirebase-13e81',//'production-a9404',
  storageBucket: 'reactfirebase-13e81.appspot.com',//'production-a9404.appspot.com',
  messagingSenderId: '105582483097',//'525472070731',
  appId: '1:105582483097:android:aa85e815b82cc4a52fca08',//'1:525472070731:web:ee873bd62c0deb7eba61ce',
};

if (!firebase.apps.length) {
  //alert(firebaseConfig);
    firebase.initializeApp(firebaseConfig);
    firebase.firestore().settings({ experimentalForceLongPolling: true });
}

export { firebase };
