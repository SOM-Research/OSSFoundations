//var url = "https://cors-anywhere.herokuapp.com/http://localhost:4041"
var url = "https://oss-foundations-api.herokuapp.com"

//Gets the foundations data in JSON
async function getFoundations() {
    const res = await fetch(url + '/foundations', {
        method: 'GET',
    });
    const res_1 = await res.json();
    return res_1;
}

//EXPORTS
export default { getFoundations };