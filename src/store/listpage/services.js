function getList(q) {
    return fetch(q)
            .then(res => res.json())
            .catch(err => err);
}

export { getList };