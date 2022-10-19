// змінна яка буде відповідати за постинг даних (коли ми відправляєм їх на сервер)
const postData = async (url, data) => {
    const res = await fetch(url, { // це все асинхронний код (ми не знаєм через скільки часу вернеться відповідь від сервера) не чекає інший код
        method: "POST", // яким чином
        headers: {
            'Content-type': 'application/json'
        }, // для того щоб відправити в форматі json
        body: data // що саме
    });
    // fetch - повертає проміс з який потрібно обробити
    return await res.json(); // це проміс
    // зробити так щоб асинхроний код перетворювався в синхронний (для цього викор оператори async, await)
};

async function getResource (url) {
    let res = await fetch(url); // це все асинхронний код (ми не знаєм через скільки часу вернеться відповідь від сервера) не чекає інший код

    if(!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json(); 
    // зробити так щоб асинхроний код перетворювався в синхронний (для цього викор оператори async, await)
}

export {postData};
export {getResource};