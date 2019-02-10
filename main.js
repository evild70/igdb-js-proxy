// Replace with your IGDB API v3 key (https://api.igdb.com/)
const API_KEY = '[YOUR_IGDB_v3_API_KEY]';

// defaults
let endpoint = 'games';
let query = 'fields *;';

/**
 * Make HTTP requests with axios
 *
 * https://github.com/axios/axios
 */
function queryAPI() {
    const queryResults = document.getElementById('query-results');

    axios({
        method: 'POST',
        url: `http://localhost:8080/${endpoint}/`,
        headers: {
            'Accept': 'application/json',
            'user-key': API_KEY,
        },
        timeout: 5000,
        data: query
    })
    .then((response) => {
        console.log('Success ::', response.data);
        queryResults.innerHTML = JSON.stringify(response.data, undefined, 4);
    })
    .catch((err) => {
        console.log('Error ::', err.response)
        queryResults.innerHTML = err.response.data.length > 0 ? `${err.response.data[0].title} => ${err.response.data[0].cause} (Status: ${err.response.data[0].status})` : 'Check endpoint name (Status: 404)';
    })
    .then(() => {
        // after any success or error
        queryBtn.classList.remove('is-loading');
    });
}


/**
 * page layout javascript
 */
const endpointField = document.getElementById('endpoint');
const queryField = document.getElementById('query-field');
const queryBtn = document.getElementById('query-btn');

queryBtn.addEventListener('click', function(event) {
    event.preventDefault();
    this.classList.add('is-loading');
    query = queryField.value !== '' ? queryField.value : query;
    endpoint = endpointField.value !== '' ? endpointField.value : endpoint;

    queryAPI();
});
