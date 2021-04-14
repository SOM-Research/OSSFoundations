import axios from "axios";
import firebase from 'firebase';
//DEV
var url = "http://localhost:5000"
//var url = "https://oss-foundations-api.herokuapp.com"
//var firebasedatabase = "https://oss-foundations-default-rtdb.europe-west1.firebasedatabase.app"
//AUTH


//DATA
//Gets all the foundations data in JSON
async function getFoundations() {
    const res = await fetch(url + '/foundations', {
        method: 'GET',
    });
    return await res.json();
}

//Edits the foundation data that matches with the ID passed as a parameter
async function editFoundation(foundationId, foundation) {
    const token = await getTokenIfLoggedIn();
    const res = await axios.post(url + `/foundations/${foundationId}`, foundation, {
        headers:
            { authorization: `Bearer ${token}` }
    });
    return res;
}

//Adds a new foundation
async function newFoundation(foundation) {
    const token = await getTokenIfLoggedIn();
    const res = await axios.put(url + '/foundations/', foundation, {
        headers:
            { authorization: `Bearer ${token}` }
    })
    return res;
}

//Gets all the foundations data to approve in JSON
async function getFoundationsPending() {
    const res = await fetch(url + '/foundations/pending/', {
        method: 'GET',
    });
    return await res.json();
}

//Deletes the foundation that matches with the ID passed as a parameter
async function deleteFoundation(foundationId) {
    const token = await getTokenIfLoggedIn();
    const res = await axios.delete(url + `/foundations/${foundationId}`, {
        headers:
            { authorization: `Bearer ${token}` }
    })
    return res;
}

//USERS

//Returns if the user has logged in
function isLoggedIn() {
    if (firebase.auth().currentUser != null) {
        return true;
    }
    return false;
}
//Returns Google token if the user has logged in
async function getTokenIfLoggedIn() {
    if (isLoggedIn()) {
        return firebase.auth().currentUser.getIdToken();
    }
    return null;
}
//Makes an user "admin" passing its Firebase UID
async function makeUserAdmin(user) {
    if (isLoggedIn()) {
        const res = await axios.post(url + '/makeUserAdmin/', user)
        return res;
    }
}

//Creates an issue in the Github repo
async function createIssue() {
    const res = await axios.post(url + '/createIssue/');
    return res;
}

//EXPORTS
export default { getFoundations, editFoundation, newFoundation, deleteFoundation, getFoundationsPending, makeUserAdmin, createIssue };