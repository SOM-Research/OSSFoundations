import axios from "axios";
import firebase from 'firebase/app';
import 'firebase/auth';
//DEV
//var url = "http://localhost:5000"
//PROD
var url = "https://oss-foundations-api.herokuapp.com"



//DATA
//Gets the foundations with status "final"
async function getFoundations() {
    const res = await fetch(url + '/foundations', {
        method: 'GET',
    });
    return await res.json();
}

//Gets all the foundations
async function getAllFoundations() {
    const token = await getTokenIfLoggedIn();
    const res = await fetch(url + '/foundations/all/', {
        method: 'GET',
        headers:
            { authorization: `Bearer ${token}` }
    });
    return await res.json();
}

//Edits the foundation data that matches with the ID passed as a parameter
async function editFoundation(foundationId, foundation) {
    const token = await getTokenIfLoggedIn();
    const res = await axios.put(url + `/foundations/${foundationId}`, foundation, {
        headers:
            { authorization: `Bearer ${token}` }
    })
    return res;
}

//Sends a request to modify a foundation
async function editFoundationProposal(foundationId, foundation) {
    const res = await axios.put(url + `/foundations/edit/${foundationId}`, foundation);
    return res;
}

//Adds a new foundation
async function newFoundation(foundation) {
    const token = await getTokenIfLoggedIn();
    const res = await axios.post(url + '/foundations/', foundation, {
        headers:
            { authorization: `Bearer ${token}` }
    })
    return res;
}

//Adds a new foundation to the pending approval list
async function newFoundationPending(foundation) {
    const res = await axios.post(url + '/foundations/pending', foundation)
    return res;
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
        return await firebase.auth().currentUser.getIdToken();
    }
    return null;
}
//Makes an user "admin" passing its Firebase UID
async function makeUserAdmin(user) {
    // if (isLoggedIn()) {
    //     const res = await axios.post(url + '/makeUserAdmin/', user)
    //     return res;
    // }
    const token = await getTokenIfLoggedIn();
    const res = await axios.post(url + `/makeUserAdmin/`, user, {
        headers:
            { authorization: `Bearer ${token}` }
    })
    return res;
}

async function revokeUserAdmin(user) {
    const token = await getTokenIfLoggedIn();
    const res = await axios.post(url + `/revokeUserAdmin/`, user, {
        headers:
            { authorization: `Bearer ${token}` }
    })
    return res;
}


//Gets a list of all users in Firebase
async function getUsers() {
    const token = await getTokenIfLoggedIn();
    const res = await axios.get(url + `/users`, {
        headers:
            { authorization: `Bearer ${token}` }
    });
    return res;
}

//GITHUB COMMUNICATION
//Creates an issue in the Github repo
async function createIssue(data) {
    const token = await getTokenIfLoggedIn();
    const res = await axios.post(url + '/createIssue/', data, {
        headers:
            { authorization: `Bearer ${token}` }
    });
    return res;
}

//EXPORTS
export default { getFoundations, editFoundation, editFoundationProposal, newFoundation, newFoundationPending, deleteFoundation, getAllFoundations, makeUserAdmin, revokeUserAdmin, createIssue, getUsers };