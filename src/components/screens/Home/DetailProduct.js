import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Image, StyleSheet, ScrollView, Modal, Alert } from 'react-native';
import firebase from 'react-native-firebase';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const firebaseInit = firebase.initializeApp();
const rootRef = firebase.database().ref();
const productsRef = rootRef.child('products');
const messengerRef = rootRef.child('message');

export default class DetailProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            product: null,
            content: '',
            modalVisible: false,
            message: [],
            contentChat: '',
            idChatCurrent: null,
        }
    }

    componentDidMount() {
        productsRef.on('value', (childSnapshot) => {
            const pros = [];
            childSnapshot.forEach(doc => {
                pros.push({ ...doc.toJSON(), key: doc.key });
            });

            this.setState({ products: pros }, () => {
                const product = this.state.products.filter(item => {
                    return this.props.navigation.getParam('itemId', '') == item.id;
                });
                this.setState({ product: product[0] });
            });
        });

    }

    handleComment() {
        const commentRef = rootRef.child(`products/${this.state.product.key}/comments`);
        commentRef.push({
            time: new Date(),
            content: this.state.content,
            user: this.props.user.name
        });
        this.setState({ content: '' });
    }

    setModalVisible() {
        this.setState({ modalVisible: !this.state.modalVisible });
    }

    render() {
        const item = this.props.navigation.getParam('item');
        return (
            <View>
                <ScrollView>
                    <View>
                        <Image source={{ uri: item.url }} style={styles.imageProduct}></Image>
                        <View style={styles.txtProduct}>
                            <Text style={styles.txtName}>{item.name}</Text>
                            <Text style={[styles.txtName, { fontWeight: 'bold' }]}>{item.price} $</Text>
                            <Text>1d ago</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }} >
                                <IconFontAwesome5 name='map-marked-alt' size={20} />
                                <Text style={{ paddingLeft: 10, alignSelf: 'flex-end' }}>Đống Đa</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }} >
                                <IconFontAwesome5 name='store' size={20} />
                                <Text style={{ paddingLeft: 10, alignSelf: 'flex-end' }}>Giày thể thao</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', paddingLeft: 20 }}>
                            <Image source={{ uri: item.url }} style={{ width: 40, height: 40, borderRadius: 100, borderWidth: 1 }} ></Image>
                            <View style={{ alignSelf: 'center', paddingHorizontal: 20 }}>
                                <Text style={{ fontWeight: '900' }} >{item.nameShop}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <IconFontAwesome5 name={'star'} size={10} color={'#f9d423'}></IconFontAwesome5>
                                    <IconFontAwesome5 name={'star'} size={10} color={'#f9d423'}></IconFontAwesome5>
                                    <IconFontAwesome5 name={'star'} size={10} color={'#f9d423'}></IconFontAwesome5>
                                    <IconFontAwesome5 name={'star'} size={10}></IconFontAwesome5>
                                    <IconFontAwesome5 name={'star'} size={10}></IconFontAwesome5>
                                </View>
                            </View>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible);
                                    firebase.database().ref(`message/${item.uid}_ONETOONE_${this.props.user.uid}`).on('value', (snapshot) => {
                                        if (!snapshot.val()) {
                                            firebase.database().ref(`message/${this.props.user.uid}_ONETOONE_${item.uid}`).on('value', (snapshot) => {
                                                if (!!snapshot.val()) {
                                                    this.setState({ message: Object.values(snapshot.val()), idChatCurrent: `${this.props.user.uid}_ONETOONE_${item.uid}` });
                                                } else {
                                                    firebase.database().ref(`message/${item.uid}_ONETOONE_${this.props.user.uid}`).set({
                                                        0: {
                                                            userName: this.props.user.name,
                                                            content: 'Xin Chao!',
                                                        }
                                                    });
                                                }
                                            })
                                        } else {
                                            this.setState({ message: Object.values(snapshot.val()), idChatCurrent: `${item.uid}_ONETOONE_${this.props.user.uid}` });
                                        }
                                    })
                                }}
                            >
                                <IconFontAwesome5 name={'facebook-messenger'} size={25} style={{ alignSelf: 'center', marginLeft: 100 }}></IconFontAwesome5>
                            </TouchableOpacity>
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
                                        <View style={{ paddingLeft: 20, marginVertical: 10 }}>
                                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                                <IconFontAwesome5 name={'user'} size={20}></IconFontAwesome5>
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
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <View style={{ flex: .9, justifyContent: 'center', alignItems: 'center', backgroundColor: '#9e9e9e87' }}>
                        <View style={{ marginTop: 50, backgroundColor: '#fff', width: '90%', height: '70%', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                            <TouchableOpacity
                                style={{ position: 'absolute', top: 0, right: 15 }}
                                onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible);
                                }}>
                                <IconIonicons name="ios-close" size={40} ></IconIonicons>
                            </TouchableOpacity>
                            <View style={{ borderWidth: 0, flex: .9, width: '90%', margin: 10 }}>
                                {/* <View style={{ width: '85%', borderRadius: 5, height: 50, padding: 5, backgroundColor: '#4285f4', marginBottom: 10 }}>
                                    <Text>Hello World!</Text>
                                </View>
                                <View style={{ width: '85%', borderRadius: 5, height: 50, padding: 5, backgroundColor: '#a3d4e0a3', marginBottom: 10, alignItems: 'flex-end', marginLeft: 50 }}>
                                    <Text>Hello World!</Text>
                                </View> */}
                                <FlatList
                                    data={this.state.message}
                                    renderItem={({ item }) => (
                                        <View style={{ width: '85%', borderRadius: 5, height: 'auto', padding: 5, backgroundColor: '#a3d4e0a3', marginBottom: 10, alignItems: item.uid == this.props.user.uid ? 'flex-end' : 'flex-start', marginLeft: item.uid == this.props.user.uid ? 40 : 0 }}>
                                            <Text style={{ fontSize: 16, fontWeight: '600' }}>{item.userName}</Text>
                                            <Text>{item.content}</Text>
                                        </View>
                                    )}
                                    keyExtractor={(item, index) => index.toString()}
                                >
                                </FlatList>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <TextInput
                                    placeholder={'Enter content here!'}
                                    style={{ width: '85%', height: 50, borderWidth: .5, borderRadius: 10, borderColor: '#666', alignSelf: 'flex-start', marginHorizontal: 5, padding: 10 }}
                                    onChangeText={txt => this.setState({ contentChat: txt })}
                                    value={this.state.contentChat}
                                ></TextInput>
                                <TouchableOpacity
                                    style={{ alignSelf: 'center', marginHorizontal: 5 }}
                                    onPress={() => {
                                        const { idChatCurrent } = this.state
                                        firebase.database().ref(`message/${idChatCurrent}`).push({
                                            userName: this.props.user.name,
                                            content: this.state.contentChat,
                                            uid: this.props.user.uid
                                        });
                                        this.setState({ contentChat: '' })
                                    }}
                                >
                                    <IconIonicons name="md-send" size={40} ></IconIonicons>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

            </View >
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