
const url = 'https://restcountries.com/v3.1/';

export function getAll(...fields) {
    return fetch(`${url}all?fields=${fields.join(',')}`);
}

export function getByName(name) {
    return fetch(`${url}name/${name}`);
}