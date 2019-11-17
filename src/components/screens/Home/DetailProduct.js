import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Image, StyleSheet, ScrollView } from 'react-native';
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/FontAwesome5';

const firebaseInit = firebase.initializeApp();
const rootRef = firebase.database().ref();
const productsRef = rootRef.child('products');

export default class DetailProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            product: null,
            content: '',
        }
    }

    componentDidMount() {
        productsRef.on('value', (childSnapshot) => {
            const pros = [];
            childSnapshot.forEach(doc => {
                pros.push({...doc.toJSON(),key:doc.key});
            });

            this.setState({ products: pros }, () => {
                const product = this.state.products.filter(item => {
                    return this.props.navigation.getParam('itemId', '') == item.id;
                });
                this.setState({ product: product[0]});
            });
        });

    }

    handleComment() {
        const commentRef = rootRef.child(`products/${this.state.product.key}/comments`);
        commentRef.push({
            time: new Date(),
            content: this.state.content,
            user:'Nguyen Van A'
        });
        this.setState({content:''});
    }
    render() {
        const item = this.props.navigation.getParam('item');
        return (
            <ScrollView>
                <View>
                    <Image source={{ uri: item.url }} style={styles.imageProduct}></Image>
                    <View style={styles.txtProduct}>
                        <Text style={styles.txtName}>{item.name}</Text>
                        <Text style={[styles.txtName, { fontWeight: 'bold' }]}>{item.price} $</Text>
                        <Text>1d ago</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }} >
                            <Icon name='map-marked-alt' size={20} />
                            <Text style={{ paddingLeft: 10, alignSelf: 'flex-end' }}>Đống Đa</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }} >
                            <Icon name='store' size={20} />
                            <Text style={{ paddingLeft: 10, alignSelf: 'flex-end' }}>Đồ điện tử</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', paddingLeft: 20 }}>
                        <Image source={{ uri: item.url }} style={{ width: 40, height: 40, borderRadius: 100, borderWidth: 1 }} ></Image>
                        <View style={{ alignSelf: 'center', paddingHorizontal: 20 }}>
                            <Text style={{ fontWeight: '900' }} >Nguyễn Thị Linh</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Icon name={'star'} size={10} color={'#f9d423'}></Icon>
                                <Icon name={'star'} size={10} color={'#f9d423'}></Icon>
                                <Icon name={'star'} size={10} color={'#f9d423'}></Icon>
                                <Icon name={'star'} size={10}></Icon>
                                <Icon name={'star'} size={10}></Icon>
                            </View>
                        </View>
                    </View>
                    <View style={{ marginLeft: 20, marginVertical: 10, flexDirection: 'row' }}>
                        <TextInput
                            placeholder={'Nhận xét về sản phẩm!'}
                            style={{ borderWidth: 0.5, borderRadius: 5, width: '75%', height: 40, paddingHorizontal: 5, textAlign: 'justify' }}
                            onChangeText={content => this.setState({ content })}
                            value={this.state.content}
                        ></TextInput>
                        <TouchableOpacity
                            style={{ borderRadius: 5, borderWidth: 0.5, alignSelf: 'center', justifyContent: 'center', height: 40, paddingHorizontal: 5, marginLeft: 5 }}
                            onPress={this.handleComment.bind(this)}
                        >
                            <Text style={{ fontWeight: '800', color: '#999' }}>Đánh Giá</Text>
                        </TouchableOpacity>
                    </View>
                    {
                        this.state.product &&
                        <FlatList
                            data={Object.values(this.state.product.comments)}
                            renderItem={(comment) => {
                                return (
                                    <View style={{ paddingLeft: 20, marginVertical:10 }}>
                                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                            <Icon name={'user'} size={20}></Icon>
                                            <Text style={{ alignSelf: 'flex-end', marginLeft: 10, textDecorationLine: 'underline' }}>{comment.item.user}</Text>
                                        </View>
                                        <Text style={{ paddingLeft: 30, paddingTop: 10, }}>{comment.item.content}</Text>
                                        <View style={{ borderWidth: 1, marginHorizontal: 20, borderColor: '#ddd' }}></View>
                                    </View>
                                )
                            }}
                            keyExtractor={(comment) => `${comment.time}`}
                        >

                        </FlatList>
                    }
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    imageProduct: {
        width: '80%', height: 200,
        borderRadius: 5,
        shadowColor: '#333',
        shadowRadius: 5,
        shadowOffset: { width: 10, height: 0 },
        shadowOpacity: 1,
        alignSelf: 'center',
        marginTop: 10

    },
    txtProduct: {
        flexDirection: 'column',
        paddingTop: 10,
        alignSelf: 'flex-start',
        paddingLeft: 20
    },
    txtName: {
        fontSize: 17,
        paddingVertical: 5,

    }
})