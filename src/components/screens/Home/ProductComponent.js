import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ActivityIndicator
} from 'react-native';

export default class Products extends Component {

    constructor(props) {
        super(props);
        // lấy dữ liệu truyền sang kiểu props của CategoryListItem truyền sang
        const { navigation } = this.props;
        const category = navigation.getParam('category', '');
        this.state = {
            category: category,
        };
    }
    // config title. lấy category từ bên Home gửi sang.
    static navigationOptions = ({ navigation }) => ({ title: navigation.getParam('category', '') })


    render() {
        return (
            <View>
                {
                    this.props.isLoading && <ActivityIndicator size="large" color="#0000ff" />
                }
                <FlatList
                    //lọc những item có thể loại trùng với tên của categoryListItem
                    data={this.props.products.filter(item => item.category.toLocaleLowerCase() == this.state.category.toLocaleLowerCase())}
                    // render từng item có trong data phía trên.
                    renderItem={({ item }) => (
                        <View style={[styles.container]}>
                            <Image source={{ uri: item.url }} style={{ width: 160, height: 160 }}></Image>
                            <View style={[styles.info]}>
                                <Text >{item.name}</Text>
                                <Text >{item.price}</Text>
                            </View>
                            {/* <Button
                                color='#AAA'
                                title='Add Cart'
                                onPress={() => {
                                    dispatch({
                                        type: "ADD",
                                        carts: item
                                    });
                                    Alert.alert('Add To Cart Complete');
                                }
                                }
                            /> */}
                            <TouchableOpacity
                                style={styles.containerBtn}
                                onPress={
                                    () => {
                                        Alert.alert('ADD CART');
                                        this.props.addToCart(item);
                                    }
                                }
                            >
                                <Text style={styles.containerTxtAdd}>ADD CART</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    // tạo key cho mỗi 1 view.
                    keyExtractor={(item) => `${item.id}`}
                    // số lượng cột hiển thị
                    numColumns={2}
                    style={{ paddingHorizontal: 8 }}
                />
            </View>

        );
    }
}

const styles = StyleSheet.create({
    info: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontSize: 16,
        fontWeight: 'bold',
        height: 40,
        paddingTop: 8,
        backgroundColor: '#EEE',
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10,
        color: '#333'
    },
    container: {
        flex: 1,
        paddingHorizontal: 8,
        paddingVertical: 16,
        backgroundColor: '#FFF',
        marginHorizontal: 8,
        marginVertical: 16,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 0 },
        elevation: 1
    },
    containerBtn: {
        height: 40,
        backgroundColor: '#999',
        borderRadius: 10,
        borderColor: '#DDD',
        borderWidth: 1,
        marginTop: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerTxtAdd: {
        color: '#EEE',
        fontSize: 18,
        fontWeight: 'bold',
    }
});