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

//Deletes the foundation that matches with the ID passed as a parameter
async function deleteFoundation(foundationId) {
    const token = await getTokenIfLoggedIn();
    console.log(token);
    const res = await axios.delete(url + `/foundations/${foundationId}`, {
        headers:
            { authorization: `Bearer ${token}` }
    })
    return res;
}

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
//EXPORTS
export default { getFoundations, editFoundation, newFoundation, deleteFoundation };