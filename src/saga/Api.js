import AsyncStorage from '@react-native-community/async-storage';
// phu trach GET POST PULL DELETE du lieu.
const URL_PRODUCT = 'https://068f3.sse.codesandbox.io/products';

const getProducts = async () => {
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
    if(!!res){
        return JSON.parse(res);
    }else{
        return [];
    }
}

module.exports = {
    getProducts,
    getCartsFromAsyncStorage
}