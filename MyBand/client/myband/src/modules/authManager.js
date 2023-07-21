import firebase from "firebase/app";
import "firebase/auth";

const _apiUrl = "/api/User";

const _doesUserExist = (firebaseId) => {
    return getToken().then((token) =>
        fetch(`${_apiUrl}/DoesUserExist/${firebaseId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(resp => resp.ok));
};

export const me = () => {
    return getToken().then((token) =>
        fetch(`${_apiUrl}/Me`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((resp) => resp.json()),
    );
};

export const getToken = () => firebase.auth().currentUser.getIdToken();

export const login = (email, pw) => {
    return firebase.auth().signInWithEmailAndPassword(email, pw)
        .then((signInResponse) => _doesUserExist(signInResponse.user.uid))
        .then((doesUserExist) => {
            if (!doesUserExist) {

                // If we couldn't find the user in our app's database, we should logout of firebase
                logout();

                throw new Error("Something's wrong. The user exists in firebase, but not in the application database.");
            }
        }).catch(err => {
            console.error(err);
            throw err;
        });
};


export const logout = () => {
    firebase.auth().signOut()
};

export const onLoginStatusChange = (onLoginStatusChangeHandler) => {
    firebase.auth().onAuthStateChanged((user) => {
        onLoginStatusChangeHandler(!!user);
    });
};