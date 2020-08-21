import * as firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDBW5KIEDZJBjPldk5o2phZ0rd4D2CiDQY',
  authDomain: 'wallpaper-2fbd1.firebaseapp.com',
  databaseURL: 'https://wallpaper-2fbd1.firebaseio.com',
  projectId: 'wallpaper-2fbd1',
  storageBucket: 'wallpaper-2fbd1.appspot.com',
  messagingSenderId: '885838087101',
  appId: '1:885838087101:web:86856177e844dadf3d88d4',
  measurementId: 'G-CQWGWZC1VK',
}

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : ' '

export const auth = firebase.auth()
export const github = new firebase.auth.GithubAuthProvider()
export const google = new firebase.auth.GoogleAuthProvider()
export const facebook = new firebase.auth.FacebookAuthProvider()
export default firebase
