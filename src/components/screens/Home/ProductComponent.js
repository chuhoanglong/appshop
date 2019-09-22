import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    Alert,
    FlatList,
    TextInput,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';
import { Container, Header, Left, Body, Right, Title, Button, Icon } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
// import Icons from 'react-native-vector-icons/Ionicons'
// import Icons1 from 'react-native-vector-icons/FontAwesome'

export default class Products extends Component {

    constructor(props) {
        super(props);
        // lấy dữ liệu truyền sang kiểu props của CategoryListItem truyền sang
        const { navigation } = this.props;
        const category = navigation.getParam('category', '');
        this.state = {
            category: category,
            isSearch: false,
            isFilter: false,
            isFilterDown: false,
            isFilterUp: false,
            isTextFocusSearch: false,
            textSearch: ''
        };
    }
    // config title. lấy category từ bên Home gửi sang.
    static navigationOptions = ({ navigation }) => ({ title: navigation.getParam('category', '') })

    dataSearchOrFilter() {
        let dataSearch = [];
        //lọc những item có thể loại trùng với tên của categoryListItem
        let dataRoot = this.props.products.filter(item => item.category.toLocaleLowerCase() == this.state.category.toLocaleLowerCase())
        if (this.state.isSearch) {
            for (const item of dataRoot) {
                if (!item.name.toLocaleLowerCase().indexOf(this.state.textSearch.toLocaleLowerCase().trim())) {
                    dataSearch.push(item);
                }
            }
            return dataSearch;
        }
        if (this.state.isFilterUp) {
            dataRoot.sort(
                (item1, item2) => {
                    return item1.price - item2.price
                }
            );
            return dataRoot;
        }
        if (this.state.isFilterDown) {
            dataRoot.sort(
                (item1, item2) => {
                    return item2.price - item1.price
                }
            );
            return dataRoot;
        }
        if (!this.state.isSearch && !this.state.isFilterDown && !this.state.isFilterUp) {
            return dataRoot;
        }
    }



    render() {
        return (
            <Container>
                <Header
                    style={{ backgroundColor: '#FFF' }}
                >
                    <Left>
                        <TouchableOpacity
                            transparent
                            onPress={
                                () => {
                                    this.props.navigation.navigate('Home');
                                }
                            }
                        >
                            {/* <Icon name='arrow-back' style={{ color: '#000' }} /> */}
                        </TouchableOpacity>
                    </Left>
                    <Body>
                        <Title style={{ color: '#000' }}>{this.state.category}</Title>
                    </Body>
                    <Right>
                        <TouchableOpacity
                            transparent
                            onPress={
                                () => {
                                    this.setState({
                                        isFilter: !this.state.isFilter,
                                        isSearch: false
                                    })
                                }
                            }
                        >
                            <View style={{ marginHorizontal: 16 }}>
                                {/* <Icons1 name='filter' size={30} /> */}
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            transparent
                            onPress={
                                () => {
                                    this.setState({
                                        isSearch: !this.state.isSearch,
                                        isFilter: false
                                    });
                                }
                            }
                        >
                            <View style={{ marginHorizontal: 16 }}>
                                {/* <Icons name='ios-search' size={30} /> */}
                            </View>
                        </TouchableOpacity>
                    </Right>
                </Header>
                {
                    this.state.isSearch && <TextInput
                        style={this.state.isTextFocusSearch ? styles.containerTxtSearchFocus : styles.containerTxtSearch}
                        placeholder={'Enter key search...'}
                        value={this.state.textSearch}
                        onFocus={
                            () => {
                                this.setState({
                                    isTextFocusSearch: true
                                })
                            }
                        }
                        onBlur={
                            () => {
                                this.setState({
                                    isTextFocuosSearch: false
                                })
                            }
                        }
                        onChangeText={
                            (txt) => {
                                this.setState({ textSearch: txt });
                            }
                        }
                    />
                }
                {
                    this.state.isFilter &&
                    <View style={styles.containerFilter}>
                        <Text style={styles.containerFilterTxt}>Filter Price:</Text>
                        <TouchableOpacity
                            onPress={
                                () => {
                                    this.setState({
                                        isFilterDown: !this.state.isFilterDown
                                    })
                                }
                            }
                        >
                            <View
                                style={styles.containerFilterIcons}
                            >
                                {/* <Icons1 name={'sort-amount-desc'} color={'#4167b2'} size={25}></Icons1> */}
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={
                                () => {
                                    this.setState({
                                        isFilterUp: !this.state.isFilterUp
                                    })
                                }
                            }
                        >
                            <View
                                style={styles.containerFilterIcons}
                            >
                                {/* <Icons1 name={'sort-amount-asc'} color={'#4167b2'} size={25}></Icons1> */}
                            </View>
                        </TouchableOpacity>
                    </View>

                }
                <View>
                    {
                        this.props.isLoading && <ActivityIndicator size="small" color="#1c92d2" />
                    }
                    <FlatList
                        data={this.dataSearchOrFilter()}
                        // render từng item có trong data phía trên.
                        renderItem={({ item }) => (
                            <View style={[styles.container]}>
                                <Image source={{ uri: item.url }} style={{ width: 150, height: 150 }}></Image>
                                <View style={[styles.info]}>
                                    <Text style={{ marginLeft: 4 }}>{item.name}</Text>
                                    <Text style={{ marginRight: 4 }}>${item.price}</Text>
                                </View>
                                <TouchableOpacity
                                    style={styles.containerBtn}
                                    onPress={
                                        () => {
                                            Alert.alert('ADD TO CART!!!')
                                            let product = {
                                                ...item,
                                                key: new Date
                                            }
                                            this.props.addToCart(product);
                                            let carts = this.props.carts;
                                            carts.push(product);
                                            try {
                                                AsyncStorage.setItem('carts', JSON.stringify(carts));
                                            } catch (error) {
                                                console.log(error);

                                            }
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
                        style={{ paddingHorizontal: 4,width:'100%', marginBottom:60 }}
                    />
                </View>
            </Container>

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
        color: '#333',
    },
    container: {
        width: 170,
        paddingHorizontal: 8,
        paddingVertical: 16,
        backgroundColor: '#FFF',
        marginHorizontal: 8,
        marginVertical: 16,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 5 },
        elevation: 1
    },
    containerBtn: {
        height: 40,
        backgroundColor: '#1c92c0',
        borderRadius: 10,
        borderColor: '#DDD',
        borderWidth: 1,
        marginTop: 4,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 8 },
    },
    containerTxtAdd: {
        color: '#EEE',
        fontSize: 18,
        fontWeight: 'bold',
    },
    containerTxtSearch: {
        fontSize: 18,
        borderColor: '#DDD',
        borderRadius: 10,
        borderWidth: 1,
        marginHorizontal: 16,
        marginVertical: 6
    },
    containerTxtSearchFocus: {
        fontSize: 18,
        borderColor: '#67a4c2',
        borderRadius: 10,
        borderWidth: 1,
        marginHorizontal: 16,
        marginVertical: 6
    },
    containerFilter: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom:7,
    },
    containerFilterTxt: {
        flex: 8,
        fontSize: 23,
        fontStyle: 'italic',
        color: '#BBB',
        marginHorizontal: 20
    },
    containerFilterIcons: {
        flex: 1,
        marginVertical: 8,
        marginRight: 25,
        alignItems: 'flex-end'
    }
});