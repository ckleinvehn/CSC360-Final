/**
 * Brandon Hernandez, Christian Kleinvehn
 */

import nytLogo from '../images/nyt-logo.jpg';
require('dotenv').config()


/** @description Fetches the NYT Most Popular API to retrieve the 20 most viewed articles for a given period.
 * @param {number} period 1, 7, or 30 days (limited by the API).
 * @return {Promise} Promise that resolves into an array of article objects.
 */
export default function homeFetch(period = 30) {
    if (![1, 7, 30].includes(period)) period = 30; // fallback

    return fetch(`https://api.nytimes.com/svc/mostpopular/v2/viewed/${period}.json?api-key=${process.env.REACT_APP_NYT_KEY}`)
        .then(response => response.json())
        .then(json => {
            let thumbnail = null;
            return json.results.map(article => {
                try { thumbnail = article.media[0]["media-metadata"][2].url; }
                catch (e) { thumbnail = nytLogo; }
                return {
                    headline: article.title,
                    snippet: article.abstract,
                    thumbnail: thumbnail,
                    url: article.url,
                    descriptions: adjust(article.des_facet),
                    organizations: adjust(article.org_facet),
                    people: adjust(article.per_facet),
                    geography: adjust(article.geo_facet)
                }
            });
        });
}


/** @description If a tag is too long to display, ellide the rest but also package it with the original (to use as a title tooltip).
 * @param {Array} tags Array which contains tags (each a string).
 * @return {Array} Array which contains nested array elements: first elem is a <= 35 char. equivalent of a tag and second is its original text.
 */
function adjust(tags) {
    for (let i = 0; i !== tags.length; ++i)
        if (tags[i].length > 35)
            tags[i] = [ tags[i].slice(0, 32) + '...', tags[i] ];
        else
            tags[i] = [ tags[i], null ]

    return tags;
}
