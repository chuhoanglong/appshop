import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    FlatList,
    Picker,
    PickerIOS,
    Alert,
    TouchableOpacity,
    ActivityIndicator,
    Platform,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Swipeout from 'react-native-swipeout';
import Icons from 'react-native-vector-icons/FontAwesome';
export default class CartsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buy: 0,
            orderOfMe: [],
            isActivity: true,
        }
    }

    static navigationOptions = ({ navigation }) => ({ title: 'CART', tabBarLabel: "CART" })

    componentDidMount() {
        const uid = this.props.uid;
        fetch(`https://dmkjo.sse.codesandbox.io/customers/orderOfMe/${uid}`, {
            method: 'GET',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        }).then(res => {
            return res.json();
        }).then(resJson => {
            if (resJson.status == 200) {
                this.setState({ orderOfMe: resJson.item, isActivity: false }, () => {
                    console.log(this.state.orderOfMe);
                });
            }
        })
    }

    handleChangeSize(id, size) {
        const newCarts = this.props.carts.map((item) => {
            if (item.id == id) {
                return {
                    ...item,
                    size: size
                }
            } else {
                return { ...item }
            }
        });
        try {
            AsyncStorage.setItem('carts', JSON.stringify(newCarts))
        } catch (error) {
            console.log(error);

        }
        return newCarts;
    }

    sumPrice() {
        let buy = 0;
        for (const item of this.props.carts) {
            buy += parseInt(item.price);
        }
        return buy;
    }

    render() {
        const { orderOfMe } = this.state;
        console.log(orderOfMe);

        return (
            <View style={{ flex: 1 }}>
                {this.props.carts.length > 0 &&
                    <View>
                        <Text style={{ fontSize: 18, fontWeight: '600', color: '#828282', alignSelf: 'center', marginTop: 10 }}>Sản Phẩm Vừa Chọn</Text>
                        <FlatList
                            data={this.props.carts}
                            renderItem={({ item }) => (
                                <Swipeout
                                    right={[
                                        {
                                            text: <Icons name='trash-o' size={25} color={'#FFF'}></Icons>,
                                            onPress: () => {
                                                Alert.alert(
                                                    'Xóa Sản Phẩm',
                                                    `Bạn Có Muốn xóa sản phẩm ${item.name} này ?`,
                                                    [
                                                        {
                                                            text: 'Cancel',
                                                            onPress: () => console.log('Ask me later pressed'),
                                                            style: 'cancel',
                                                        },
                                                        {
                                                            text: 'OK',
                                                            onPress: () => {
                                                                let newCarts = this.props.carts.filter(
                                                                    (product) => {
                                                                        return product.key != item.key
                                                                    }
                                                                )
                                                                this.props.onDeleteProduct(newCarts);
                                                                try {
                                                                    AsyncStorage.setItem('carts', JSON.stringify(newCarts))
                                                                } catch (error) {
                                                                    console.log(error);

                                                                }
                                                            }
                                                        }


                                                    ]
                                                );

                                            },
                                            type: 'delete',
                                        }
                                    ]}
                                    backgroundColor={'transparent'}
                                    buttonWidth={60}

                                >
                                    <View style={[styles.container]}>
                                        <Image source={{ uri: item.url }} style={{ width: 170, height: 120, flex: 1 }}></Image>
                                        <View style={[styles.info]}>
                                            <Text style={{ fontSize: 20, marginVertical: 5 }}>{item.name}</Text>
                                            <Text style={{ fontSize: 15 }}>Color: {item.color}</Text>
                                            <Text style={{ fontSize: 15 }}>Price: ${item.price}</Text>
                                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                                <Text style={{ flex: 1 }}>Size: </Text>
                                                <Picker
                                                    selectedValue={item.size}
                                                    style={{ height: 20, flex: 1, width: 50 }}
                                                    itemStyle={{ width: 30, height: 42, marginTop: -14, marginHorizontal: -50 }}
                                                    onValueChange={(itemValue) => {
                                                        const newCarts = this.handleChangeSize(item.id, itemValue);
                                                        this.props.onChangeSize(newCarts);
                                                    }}
                                                >
                                                    <Picker.Item label="36" value="36" />
                                                    <Picker.Item label="37" value="37" />
                                                    <Picker.Item label="38" value="38" />
                                                    <Picker.Item label="39" value="39" />
                                                    <Picker.Item label="40" value="40" />
                                                </Picker>
                                            </View>
                                        </View>
                                    </View>
                                </Swipeout>
                            )}
                            keyExtractor={(item) => `${item.key}`}
                            style={{ paddingVertical: 8 }}
                        ></FlatList>
                    </View>
                }
                {
                    orderOfMe &&
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 18, fontWeight: '600', color: '#828282', alignSelf: 'center', marginTop: 10 }}>Đơn Đã Mua</Text>
                        <FlatList
                            data={orderOfMe.carts}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => {
                                        // this.onPress
                                        this.props.navigation.navigate('MethodBuy', {
                                            hoten: orderOfMe.name,
                                            dienthoai: orderOfMe.phone,
                                            thanhpho: orderOfMe.address.city,
                                            quanHuyen: orderOfMe.address.state,
                                            phuongXa: orderOfMe.address.state,
                                            diachi: orderOfMe.address.street,
                                            note: orderOfMe.txtNote || '',
                                            amount: orderOfMe.price || 1000,
                                            isVerifying: 2,
                                            id: orderOfMe.id
                                        })
                                    }}
                                >
                                    <View style={[styles.container]}>
                                        <Image source={{ uri: item.url }} style={{ width: 170, height: 120, flex: 1 }}></Image>
                                        <View style={[styles.info]}>
                                            <Text style={{ fontSize: 20, marginVertical: 5 }}>{item.name}</Text>
                                            <Text style={{ fontSize: 15 }}>Color: {item.color}</Text>
                                            <Text style={{ fontSize: 15 }}>Price: ${item.price}</Text>
                                            <Text style={{ flex: 1 }}>Size: {item.size}</Text>
                                        </View>
                                        <View style={{ backgroundColor: orderOfMe.isVerifying === 0 ? "#f57d7d" : "#7df59d", height: 95, width: 95, justifyContent: 'flex-end', transform: [{ rotate: '45deg' }], position: 'absolute', top: -47, right: -47 }}>
                                            <Text style={{ fontSize: 11.5, fontWeight: '600', alignSelf: 'center', color: '#fff' }}>{orderOfMe.isVerifying === 0 ? 'Chờ Xác Nhận' : orderOfMe.isVerifying === 2 ? 'Đã Xác Nhận' : ''}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item) => `${item.key}`}
                            style={{ paddingVertical: 8 }}
                        ></FlatList>
                    </View>
                }
                {
                    !this.props.carts.length && !orderOfMe &&
                    <View style={[styles.CartsEmpty]}>
                        <Text style={{ fontSize: 18, color: 'gray' }}>Empty basket !</Text>
                        <TouchableOpacity
                            onPress={
                                () => {
                                    this.props.navigation.navigate('Home')
                                }
                            }
                        >
                            <Text style={styles.GoToBuyShop}>Go To Buy Shop</Text>
                        </TouchableOpacity>
                    </View>
                }
                {
                    !!this.props.carts.length &&
                    <TouchableOpacity
                        onPress={
                            () => {
                                this.props.navigation.navigate('BuyCart', { amount: (this.sumPrice() * 23000) });
                            }
                        }
                    >
                        <View style={styles.btnBuy}>
                            <Text style={{ color: '#FFF' }}>BUY<Text style={{ fontSize: 18 }}>  ${this.sumPrice()}</Text></Text>
                        </View>
                    </TouchableOpacity>
                }
                {
                    this.state.isActivity && <ActivityIndicator
                        size="small"
                        color="#000"
                        style={{ zIndex: 9, alignSelf: 'center', position: 'absolute', top: '50%' }}
                    ></ActivityIndicator>
                }
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#fff',
        marginHorizontal: 8,
        marginVertical: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.19,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },
        elevation: 1,
        overflow: 'hidden',
    },
    info: {
        flex: 1,
    },
    CartsEmpty: {
        flex: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    GoToBuyShop: {
        color: '#66a6ff',
        borderColor: '#66a6ff',
        borderBottomWidth: 1,
        fontSize: 18
    },
    btnBuy: {
        borderWidth: 1,
        borderColor: '#EEE',
        borderRadius: 10,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1c92d2',
        marginHorizontal: 10
    }
});