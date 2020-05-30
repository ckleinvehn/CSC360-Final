import moment from 'moment';


/** @description Makes a fetch call for each query.
 * @param {Array} queries The queries the user requested.
 * @param {string} startDate Start date of the search.
 * @param {string} endDate End date of the search.
 * @return The number of hits per query.
 */
export default async function browseFetch(queries, startDate, endDate) {
    return await Promise.all(queries.map(query => fetchQuery(query, startDate, endDate)));
}


/** @description Fetches the number of hits for a query from the NYT Article Search API.
 * @param {string} query A query used in the fetch.
 * @param {string} startDate Start date of the search.
 * @param {string} endDate End date of the search
 * @return The number of hits returned from the query.
 */ 
function fetchQuery(query, startDate, endDate) {
    const baseUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
    const url = `${baseUrl}?q=${query}&begin_date=${moment(startDate).format('YYYYMMDD')}&end_date=${moment(endDate).format('YYYYMMDD')}&api-key=${process.env.REACT_APP_NYT_KEY}`;
    
    return fetch(url)
        .then(response => response.json())
        .then(json => json['response']['meta']['hits']);
}
