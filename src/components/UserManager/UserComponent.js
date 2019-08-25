import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, BackHandler, TextInput, Button, Alert } from 'react-native';
import Modal from 'react-native-modal'
import AsyncStorage from '@react-native-community/async-storage';
const styles = StyleSheet.create({
    accountUser: {
        width: '100%',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'relative',

    },
    accountUserName: {
        fontSize: 23,
        fontWeight: 'bold',
        fontStyle: 'italic',
    },
    accountInfo: {
        position: 'absolute',
        zIndex: 2,
        top: 90

    }
})

export default class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isModal: false,
            txt: ''
        }
    }
    static navigationOptions = ({ navigation }) => ({ title: 'USER' })

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={[styles.accountUser]} >
                    <Image
                        source={{ uri: 'https://videohive.img.customer.envatousercontent.com/files/cb7508c9-cb21-4131-9cfc-369412411804/inline_image_preview.jpg?auto=compress%2Cformat&fit=crop&crop=top&max-h=8000&max-w=590&s=dfb01d793ada1c3be4a485070113d8c8' }}
                        style={{
                            width: '100%',
                            height: 150,
                            zIndex: 1,
                        }}
                    ></Image>
                    <View style={[styles.accountInfo]}>
                        <Image
                            source={{ uri: 'https://kenh14cdn.com/2019/4/10/ban-sao-hoatran-4272-1554901265999753211154.jpg' }}
                            style={{ width: 128, height: 128, borderRadius: 100 }}
                        ></Image>
                        <Text style={[styles.accountUserName]}>Linh Nguyen</Text>
                    </View>
                </View>
                <View style={{
                    flex: 1,
                    fontSize: 23,
                    paddingHorizontal: 16,
                    borderRadius: 10,
                    borderWidth: 0.5,
                    borderColor: '#DDD',
                    shadowRadius: 10,
                    shadowColor: "#DDD",
                    shadowOpacity: 1,
                    shadowOffset: { width: 0, height: 0 },
                    position: 'absolute',
                    top: '55%',
                    width: '100%',

                }}>
                    <Text
                        onPress={
                            () => {
                                this.setState({
                                    isModal: !this.state.isModal,
                                    txt: value
                                })
                            }
                        }
                    >Address: 141 Chiến Thắng, Thanh Trì, Hà Nội</Text>
                    <Text>Phone Number: 098888888</Text>
                    <Text>Email: LinhNguyen@yahoo.com</Text>
                </View>
                <View style={{
                    flex: 1,
                    marginTop: 180,
                    fontWeight: 'bold',
                    fontSize: 24,
                }}>
                    <Text style={{ color: '#1E96DD' }}>Change Password</Text>
                    <Text
                        style={{ color: '#1E96DD' }}
                        onPress={
                            () => {
                                Alert.alert(
                                    'LOG OUT',
                                    'You Want To Log Out?',
                                    [
                                        {
                                            text: 'Cancel',
                                            style: 'cancel'
                                        },
                                        {
                                            text: 'OK',
                                            onPress: () => {
                                                AsyncStorage.removeItem('token');
                                                this.props.navigation.navigate('Login');
                                            }
                                        }
                                    ]

                                )
                            }
                        }
                    >Log Out</Text>
                    <Text
                        style={{ color: '#1E96DD' }}
                        onPress={
                            () => {
                                BackHandler.exitApp();
                            }
                        }
                    >Exit App</Text>
                </View>


                <ModalView isModal={this.state.isModal} txt={this.state.txt}></ModalView>

            </View>
        )
    }

}

const ModalView = (props) => {
    const [txt, setTxt] = useState(props.txt || '');
    const [isModal, setIsModal] = useState(props.isModal || false);
    return (
        <View>
            <Modal
                isVisible={isModal}
            >
                <View
                    style={{
                        width: 200,
                        height: 100,

                    }}
                >
                    <TextInput
                        placeholder={'Enter Key'}
                        value={txt}
                        onChangeText={
                            (text) => {
                                setTxt(text)
                            }
                        }
                        style={{
                            borderBottomColor: 'gray',
                            borderBottomWidth: 1
                        }}
                    />
                    <Button
                        title={'Save'}
                        onPress={
                            () => {
                                setIsModal(!isModal);
                            }
                        }
                    />
                </View>
            </Modal>
        </View>
    )
}