
export default function RequestPopNews() {
    return fetch ("https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=" + String(process.env.REACT_APP_NYT_KEY))
        .then((response) => response.json())
}