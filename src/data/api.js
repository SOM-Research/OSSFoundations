//import axios from "axios";

var url = "https://oss-foundations-api.herokuapp.com"

//Gets the foundations data in JSON
async function getFoundations() {
    const res = await fetch(url + '/foundations', {
        method: 'GET',
    });
    return await res.json();
}
// function sendFoundation(foundation) {
//     const json = foundation;
//     axios.post(url + '/post', json)
//         .then(response => response);
//     return response;
// }

// function deleteFoundation(foundationId) {
//     axios.delete(url + '/foundations')
//     .then(response => {
//         this.result.splice(foundationId, 1)
//     })
// }
//EXPORTS
export default { getFoundations, };