import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, Picker, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Swipeout from 'react-native-swipeout';
export default class CartsComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = ({ navigation }) => ({ title: 'CART', tabBarLabel: "CART" })

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
            AsyncStorage.setItem('carts',JSON.stringify(newCarts))
        } catch (error) {
            console.log(error);
            
        }
        return newCarts;
    }

    render() {
        return (
            <FlatList
                data={this.props.carts}
                renderItem={({ item }) => (
                    <Swipeout
                        right={[
                            {
                                text: 'Delete',
                                onPress: () => {
                                    Alert.alert(
                                        'DLETE',
                                        `You Want Delete Product ${item.name} ?`,
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
                                                        AsyncStorage.setItem('carts',JSON.stringify(newCarts))
                                                    } catch (error) {
                                                        console.log(error);
                                                        
                                                    }
                                                }
                                            }


                                        ]
                                    );

                                },
                                type: 'delete',
                                underlayColor: 'black',
                            }
                        ]}
                        backgroundColor={'transparent'}
                        buttonWidth={90}

                    >

                        <View style={[styles.container]}>
                            <Image source={{ uri: item.url }} style={{ width: 170, height: 120, flex: 1 }}></Image>
                            <View style={[styles.info]}>
                                <Text style={{ fontSize: 20 }}>{item.name}</Text>
                                <Text style={{ fontSize: 15 }}>Color: {item.color}</Text>
                                <Text style={{ fontSize: 15 }}>Price: {item.price}</Text>

                                {/* tuy chon size */}
                                <View style={{ flex: 1, flexDirection: 'row', }}>
                                    <Text style={{ flex: 1 }}>Size: </Text>
                                    <Picker
                                        selectedValue={item.size}
                                        style={{ height: 20, flex: 1 }}
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
                                    {/* ket thuc phan tuy chinh size */}
                                </View>

                            </View>
                        </View>
                    </Swipeout>
                )}
                keyExtractor={(item) => `${item.key}`}
                style={{ paddingVertical: 8 }}
            ></FlatList>

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
        marginVertical: 16,
        borderRadius: 4,
        shadowColor: '#000',
        shadowOpacity: 0.9,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 },
        elevation: 1,
        fontFamily: 'Raleway'

    },
    info: {
        flex: 1
    }
});