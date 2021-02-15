import axios from "axios";

//DEV
//var url = "http://localhost:5000"

var url = "https://oss-foundations-api.herokuapp.com"


//Gets the foundations data in JSON
async function getFoundations() {
    const res = await fetch(url + '/foundations', {
        method: 'GET',
    });
    return await res.json();
}
// function postFoundation(foundation) {
//     const json = foundation;
//     axios.post(url + '/post', json)
//         .then(response => response);
//     return response;
// }

function deleteFoundation(foundationId) {
    axios.delete(url + '/foundations', {id: foundationId})
    .then(response => {
        //this.result.splice(foundationId, 1)
        console.log(response);
    })
}
//EXPORTS
export default { getFoundations, deleteFoundation };