import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyBCqbfLbW4DlDDJWb8_hg_gjAUVzYxY2RM',
  authDomain: 'wallpaper-8c551.firebaseapp.com',
  databaseURL: 'https://wallpaper-8c551.firebaseio.com',
  projectId: 'wallpaper-8c551',
  storageBucket: 'wallpaper-8c551.appspot.com',
  messagingSenderId: '896165273896',
  appId: '1:896165273896:web:e65f4913e226dc36f0301d',
  measurementId: 'G-QBDWRTV3ND',
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

;(async function setPersistence() {
  await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
})()


export const auth = firebase.auth()
export const github = new firebase.auth.GithubAuthProvider()
export const google = new firebase.auth.GoogleAuthProvider()
export const facebook = new firebase.auth.FacebookAuthProvider()
export const storageRef = firebase.storage().ref()
export default firebase
