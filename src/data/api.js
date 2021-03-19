import axios from "axios";
import firebase from 'firebase';
//DEV
var url = "http://localhost:5000"
//var url = "https://oss-foundations-api.herokuapp.com"

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
async function getFoundationsApproval() {
    const res = await fetch(url + '/foundationsToApprove/', {
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

//NEW FOUNDATIONS TO APPROVE

//Adds a new foundation to approve
async function newFoundationApproval(foundation) {
    const res = await axios.put(url + '/foundationsToApprove/', foundation)
    return res;
}

//Edits the foundation data that matches with the ID passed as a parameter
async function editFoundationApproval(foundationId, foundation) {
    const token = await getTokenIfLoggedIn();
    const res = await axios.post(url + `/foundationsToApprove/${foundationId}`, foundation, {
        headers:
            { authorization: `Bearer ${token}` }
    });
    return res;
}

//Deletes the foundation that matches with the ID passed as a parameter
async function deleteFoundationApproval(foundationId) {
    const token = await getTokenIfLoggedIn();
    console.log(token);
    const res = await axios.delete(url + `/foundationsToApprove/${foundationId}`, {
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
//Returns token if the user has logged in
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
//EXPORTS
export default { getFoundations, editFoundation, newFoundation, deleteFoundation, newFoundationApproval, getFoundationsApproval, editFoundationApproval, deleteFoundationApproval, makeUserAdmin };