import AsyncStorage from '@react-native-community/async-storage';
// phu trach GET POST PULL DELETE du lieu.
const URL_PRODUCT = 'https://068f3.sse.codesandbox.io/products';
// const URL_PRODUCT = 'http://localhost:3000/products';
const URL_USER = 'http://localhost:3000/users';

const getProducts = async (category) => {
    let URL = URL_PRODUCT;
    if (!!category) {
        URL += '?category=' + category;
    }
    const res = await fetch(URL_PRODUCT, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    });
    const responseJson = await res.json();
    return responseJson;
}

const getCartsFromAsyncStorage = async () => {
    const res = await AsyncStorage.getItem('carts');
    if (!!res) {
        return JSON.parse(res);
    } else {
        return [];
    }
}

const getUserLogin = async (name,pass) => {
    const res = await fetch(URL_USER,
        {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                pass,
            }),
        }
    );

    const response = await res.json();
    return response;
}

module.exports = {
    getProducts,
    getCartsFromAsyncStorage,
    getUserLogin,
}