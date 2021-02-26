import axios from "axios";

//DEV
var url = "http://localhost:5000"

//var url = "https://oss-foundations-api.herokuapp.com"


//Gets all the foundations data in JSON
async function getFoundations() {
    const res = await fetch(url + '/foundations', {
        method: 'GET',
    });
    return await res.json();
}

//Edits the foundation data that matches with the ID passed as a parameter
async function editFoundation(foundationId, foundation) {
    const res = await axios.post(url + `/foundations/${foundationId}`, foundation);
    return res;
}

//Adds a new foundation
async function newFoundation(foundation) {
    const res = await axios.put(url + '/foundations/', foundation)
    return res;
}

//Deletes the foundation that matches with the ID passed as a parameter
async function deleteFoundation(foundationId) {
    const res = await axios.delete(url + `/foundations/${foundationId}`)
    return res;
}
//EXPORTS
export default { getFoundations, editFoundation, newFoundation, deleteFoundation };