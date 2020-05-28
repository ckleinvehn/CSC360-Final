/**
 * Christian Kleinvehn
 */

// Moment.js
import moment from 'moment';

const colors = ['57, 106, 177',
                '218, 124, 48',
                '62, 150, 81',
                '204, 37, 41',
                '83, 81, 84',
                '107, 76, 154',
                '146, 36, 40',
                '148, 139, 61'];


export default async function trendsFetch(top_n_keywords = 5, date = moment().subtract(1, 'months')) {
    var datasets = await mostRecentArchive(date, top_n_keywords); // returns an array of datasets, each with data (to be pushed onto) & a label
    var keywords = [];
    datasets.forEach(dataset => { keywords.push(dataset.label); });

    const [ labels, occurrences ] = await processArchivesPrior(keywords, date); // look for these keywords in months prior
    
    // mangle the data for chart viewing
    for (let i = 0; i !== datasets.length; ++i) {
        datasets[i].data  = datasets[i].data.concat(occurrences[i]).reverse();
        datasets[i].borderColor = `rgba(${colors[i % colors.length]}, .7)`;
        datasets[i].backgroundColor = `rgba(${colors[i % colors.length]}, .5)`;
        datasets[i].fill = false;
    }

    // reverse because we get it from most recent to least recent, but that looks odd graphed
    return [ labels.reverse(), datasets ];
}


/** @description Fetches the top N keywords from the NYT Archive API for a given month and year.
 */
function mostRecentArchive(date, top_n_keywords = 5) {
    // month + 1 because Moment is zero-based
    return fetch(`https://api.nytimes.com/svc/archive/v1/${date.year()}/${date.month() + 1}.json?api-key=${process.env.REACT_APP_NYT_KEY}`) 
        .then(response => response.json())
        .then(json => {
            let keywords_by_occurrence = {};

            json['response']['docs'].forEach(document => {
                document['keywords'].forEach(keyword => {
                    if (keywords_by_occurrence[keyword.value] === undefined)
                        keywords_by_occurrence[keyword.value] = 1;
                    else
                        ++keywords_by_occurrence[keyword.value];
                });
            });

            // dictionary to array; index 0 is key, index 1 is value
            let top_n = [];
            for (const keyword_occurrence in keywords_by_occurrence)
                top_n.push([keyword_occurrence, keywords_by_occurrence[keyword_occurrence]]);

            top_n.sort((lhs, rhs) => rhs[1] - lhs[1]); // compare by num of occurrences, descending
            top_n = top_n.slice(0, top_n_keywords); // only want top keywords

            // mangle the remaining data into a more Chart.js friendly structure
            return top_n.map(e => { return { label: e[0], data: [ e[1] ] }});;
        });
}


async function processArchivesPrior(keywords, date, months_to_go_back = 3)
{
    var labels = [ date.format("MMM YYYY") ];
    // empty array of arrays
    var data = []; for (let i = 0; i !== keywords.length; ++i) data.push([]);

    for (let i = 0; i !== months_to_go_back; ++i) {
        date = date.subtract(1, 'months');
        labels.push(date.format("MMM YYYY"));

        const occurrences = await archivePrior(keywords, date.year(), date.month() + 1); // +1 because Moment is zero-based

        for (let j = 0; j !== occurrences.length; ++j)
            data[j].push(occurrences[j]);
    }
     
    return [labels, data];
}


/** @description Search for keyword occurrences in an older archive given a list of them from a more recent archive.
 */
function archivePrior(keywords, year, month) {
    return fetch(`https://api.nytimes.com/svc/archive/v1/${year}/${month}.json?api-key=${process.env.REACT_APP_NYT_KEY}`)
        .then(response => response.json())
        .then(json => {
            let keywords_by_occurrence = {};
            for (let i = 0; i !== keywords.length; ++i)
                keywords_by_occurrence[keywords[i]] = [ 0, i ]; // index 0 is count, index 1 is its original position, so we can sort it again

            json['response']['docs'].forEach(document => {
                document['keywords'].forEach(keyword => {
                    if (!keywords.includes(keyword.value)) return;
                    ++keywords_by_occurrence[keyword.value][0];
                });
            });

            // dictionary to array; index 0 is key, index 1 is value
            let results = [];
            for (let keyword_occurrence in keywords_by_occurrence)
                results.push([keyword_occurrence, keywords_by_occurrence[keyword_occurrence]]);

            // we sort according to how it was sorted in the most recent archive, otherwise the datasets wouldn't line up
            results.sort((lhs, rhs) => lhs[1][1] - rhs[1][1]);
            return results.map(result => result[1][0]); // only need the counts in the end
        });
}
