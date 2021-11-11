
const root = 'https://restcountries.com/v3.1/';

export async function getAll(...fields) {
    const url = `${root}all?fields=${fields.join(',')}`;
    try {
        const response = await fetch(url);
        return response.json();
    }
    catch (err) { return [] }
}

export async function getByName(name, ...fields) {
    const url = `${root}name/${name}?fields=${fields.join(',')}`;
    try {
        const response = await fetch(url);
        if (response.status === 404) return [];
        return response.json();
    }
    catch (err) { return [] }
}

export async function getByCode(code, ...fields) {
    const url = `${root}alpha/${code}?fields=${fields.join(',')}`;
    try {
        const response = await fetch(url);
        if (response.status === 404) return null;
        const json = await response.json();
        return json[0];
    }
    catch (err) { return null }
}