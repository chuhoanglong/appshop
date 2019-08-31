import React, { Component } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
const styles = StyleSheet.create({
    image: {
        width: 128,
        height: 128,
        left: '35%'
    },
    txtName: {
        fontSize: 21,
        fontWeight: "bold",
        textAlign: 'center'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#F8F8F8',
        marginHorizontal: 8,
        marginVertical: 16,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.9,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 0 },
        elevation: 1
    }
})

export default class Home extends Component {

    componentDidMount(){
        this.props.getCarts();
    }

    render() {
        // sử dụng navigate để di chuyển giữa 2 màn hình
        const { navigate } = this.props.navigation;
        console.log(this.props.categorys);

        return (
            <View>
                <FlatList
                    data={this.props.categorys}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => {
                                this.props.showProductTask(true);
                                // navigate di chuyển sang màn hình Products và truyền dữ liệ qua Products
                                navigate('Products', {
                                    category: item.name
                                });
                            }}
                        >
                            <View style={[styles.container]}>
                                <Image source={item.src} style={[styles.image]}></Image>
                                <Text style={[styles.txtName]}>{item.name}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => `${item.id}`}
                ></FlatList>
            </View>
        );
    }
}
// kết nối với provider.js sử dụng redux.
// do provider sử dụng combineReducers({r1,r2,...}) để ghép reducer nên phải sử dụng state.reducerProduct để lấy được data của reducerProduct
// export default connect((state)=>({data:state.reducerCategory}))(CategoryListItem);