import AsyncStorage from '@react-native-community/async-storage';
// phu trach GET POST PULL DELETE du lieu.
const URL_PRODUCT_PRODUCT = 'https://dmkjo.sse.codesandbox.io/products';
const URL_PRODUCT = 'http://192.168.0.113:3000/products';
const URL_USER = 'https://dmkjo.sse.codesandbox.io/users';

const getProducts = async (category) => {
    let URL = URL_PRODUCT_PRODUCT;
    if (!!category) {
        URL += '?category=' + category;
    }
    const res = await fetch(URL, {
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

const removeCartsFromAsyncStorage = async () => {
    await AsyncStorage.removeItem('carts');
    return [];
}

const getUserLogin = async (email,password) => {
    const res = await fetch(URL_USER,
        {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password,
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
    removeCartsFromAsyncStorage
}