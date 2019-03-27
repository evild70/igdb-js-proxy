let api_key = localStorage.getItem('igdb-api-key') || '';
document.getElementById('api-key').value = api_key;

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
        url: `http://localhost:8080/${endpoint}`,
        headers: {
            'Accept': 'application/json',
            'user-key': api_key,
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
        queryResults.innerHTML = `${err.response.data[0].title} => ${err.response.data[0].cause} (Status: ${err.response.data[0].status})`;
    })
    .then(() => {
        // after any success or error
        queryBtn.classList.remove('is-loading');
    });
}


/**
 * page layout javascript
 */
const dropdown = document.getElementById('endpoint-dropdown');
const dropdownChoice = document.getElementById('dropdown-choice');
const items = document.querySelectorAll('.dropdown-item');
const queryField = document.getElementById('query-field');
const queryBtn = document.getElementById('query-btn');

function removeIsActive() {
    items.forEach(function(item) {
        item.classList.remove('is-active');
    });
}

/**
 * Save API key to localStorage so it doesn't have to be entered everytime
 */
function keyManagment(value) {
    if (localStorage.getItem('igdb-api-key') === value) { return; }

    localStorage.setItem('igdb-api-key', value);
    document.getElementById('api-key').value = value;
    api_key = value;
}

// add event listener to all dropdown-items
items.forEach(function(item) {
    item.addEventListener('click', function(event) {
        event.preventDefault();
        removeIsActive();
        this.classList.add('is-active');
        dropdown.setAttribute('data-endpoint-selected', this.getAttribute('data-value'));
        dropdownChoice.textContent = this.textContent;
        endpoint = dropdown.getAttribute('data-endpoint-selected');
    });
});

dropdown.addEventListener('click', function(event) {
    event.stopPropagation();
    this.classList.toggle('is-active');
});

queryBtn.addEventListener('click', function(event) {
    event.preventDefault();
    keyManagment(document.getElementById('api-key').value);
    this.classList.add('is-loading');
    query = queryField.value !== '' ? queryField.value : query;

    queryAPI();
});

// close dropdown when clicked anywhere on page
document.addEventListener('click', function(event) {
    if (event.target !== dropdown) {
        dropdown.classList.remove('is-active');
    }
});
