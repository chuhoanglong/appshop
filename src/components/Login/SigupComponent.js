import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    ActivityIndicator,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/Ionicons'
import AsyncStore from '@react-native-community/async-storage';
import firebase from 'react-native-firebase';
import logo from '../../assets/codersTokyo.png';
export default class SigupComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isActivity: false,
            email: '',
            password: '',
            phoneNumber: '',
            code: '',
            isSecureTextEntry: true,
            isConfirm: false,
            confirmResult: null,
        }
    }

    onClickConfirmWithPhoneNumber() {
        this.setState({ isActivity: !this.state.isActivity });
        firebase
            .auth()
            .signInWithPhoneNumber(this.state.phoneNumber)
            .then(confirmResult => this.setState({ confirmResult, isActivity: !this.state.isActivity }))
            .catch(error => {
                alert(error);
                this.setState({ isActivity: !this.state.isActivity });
            })
    }
    onClickConfirm() {
        this.state.confirmResult.confirm(this.state.code)
            .then(user => {
                this.setState({ isConfirm: true });
                this.props.navigation.navigate('Home');
            })
            .catch(error => Error)
    }
    onClickSigup() {
        // this.setState({ isActivity: !this.state.isActivity });
        // const user = {
        //     email: this.state.email,
        //     password: this.state.password
        // }
        // new Promise((resolve, reject) => {
        //     user.resolve = resolve;
        //     user.reject = reject;
        //     this.props.loginUser(user);
        // }).then(res => {
        //     if (this.props.status == 200) {
        //         AsyncStore.setItem('token', 'thisisthetoken');
        //         this.setState({ isActivity: !this.state.isActivity });
        //         this.props.navigation.navigate('Home');
        //         Alert.alert(this.props.message);
        //     } else {
        //         Alert.alert(this.props.message);
        //         this.setState({ isActivity: !this.state.isActivity });
        //     }
        // }).catch(err => {
        //     Alert.alert(err);
        //     this.setState({ isActivity: !this.state.isActivity });
        // })
    }
    render() {
        const { navigate } = this.props.navigation;

        return (
            <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding' enabled>
                <View style={styles.container}>
                    <Image
                        source={logo}
                        style={{ width: 200, height: 40, marginTop: 50, alignSelf: 'center', }}
                    ></Image>
                    <Text style={[styles.containerLogin]}>LOGIN<Text style={[styles.containerLogin, { color: '#6cb693' }]}>.APPSHOP</Text></Text>
                    <View style={[styles.containerEnter]}>
                        {this.state.isConfirm &&
                            <View>
                                <Text style={{ fontSize: 12, fontWeight: 'bold' }}>UserName:</Text>
                                <TextInput
                                    placeholder={'Enter your email !'}
                                    keyboardType={'name-phone-pad'}
                                    style={styles.containerEnterUser}
                                    onChangeText={
                                        (email) => this.setState({
                                            email
                                        })
                                    }
                                />
                                <Text style={{ fontSize: 12, marginTop: 15, fontWeight: 'bold' }}>Password:</Text>
                                <View style={{
                                    flexDirection: "row",
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderBottomColor: '#CCC',
                                    borderBottomWidth: 0.5

                                }}>
                                    <Icon size={16} name='lock' style={{ alignSelf: 'center' }} />
                                    <TextInput
                                        placeholder={'Enter your password !'}
                                        secureTextEntry={this.state.isSecureTextEntry}
                                        style={[styles.containerTxt]}
                                        onChangeText={
                                            (password) => this.setState({
                                                password
                                            })
                                        }
                                    />

                                    {
                                        this.state.isSecureTextEntry ? <Icon size={16} name='eye-slash' style={{ alignSelf: 'center' }}
                                            onPress={
                                                () => {
                                                    this.setState({ isSecureTextEntry: !this.state.isSecureTextEntry });
                                                }
                                            }
                                        /> : <Icon size={16} name='eye' style={{ alignSelf: 'center' }}
                                            onPress={
                                                () => {
                                                    this.setState({ isSecureTextEntry: !this.state.isSecureTextEntry });
                                                }
                                            }
                                            />
                                    }
                                </View>
                                <LinearGradient
                                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#0092ff', '#1c92d2', '#1c92d2']} style={[styles.linearGradient, { borderRadius: 8, marginVertical: 50 }]}
                                >

                                    <TouchableOpacity
                                        style={[styles.containerBtn]}
                                        onPress={
                                            this.onClickSigup.bind(this)
                                        }
                                    >
                                        <Text style={[styles.containerBtnTxt]}>SIGUP</Text>
                                        {
                                            this.state.isActivity && <ActivityIndicator
                                                size="small"
                                                color="#000"
                                                style={{ top: 10, position: 'absolute', zIndex: 9, alignSelf: 'center', }}
                                            ></ActivityIndicator>
                                        }
                                    </TouchableOpacity>
                                </LinearGradient>
                            </View>
                        }
                        {
                            !this.state.isConfirm && !this.state.confirmResult &&
                            <View>
                                <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Phone Number:</Text>
                                <TextInput
                                    placeholder={'Enter Phone Number +84...'}
                                    keyboardType={'name-phone-pad'}
                                    style={styles.containerEnterUser}
                                    onChangeText={
                                        (phoneNumber) => this.setState({
                                            phoneNumber
                                        })
                                    }
                                />
                                <LinearGradient
                                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#0092ff', '#1c92d2', '#1c92d2']} style={[styles.linearGradient, { borderRadius: 8, marginVertical: 50 }]}
                                >

                                    <TouchableOpacity
                                        style={[styles.containerBtn]}
                                        onPress={
                                            this.onClickConfirmWithPhoneNumber.bind(this)
                                        }
                                    >
                                        <Text style={[styles.containerBtnTxt]}>CONFIRM</Text>
                                        {
                                            this.state.isActivity && <ActivityIndicator
                                                size="small"
                                                color="#000"
                                                style={{ top: 10, position: 'absolute', zIndex: 9, alignSelf: 'center', }}
                                            ></ActivityIndicator>
                                        }
                                    </TouchableOpacity>
                                </LinearGradient>
                            </View>
                        }
                        {
                            this.state.confirmResult && !this.state.isConfirm &&
                            <View>
                                <TextInput
                                    placeholder={'Code Confirm'}
                                    keyboardType={'name-phone-pad'}
                                    style={[styles.containerEnterUser, { textAlign: 'center' }]}
                                    onChangeText={
                                        (code) => this.setState({
                                            code
                                        })
                                    }
                                />
                                <LinearGradient
                                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#0092ff', '#1c92d2', '#1c92d2']} style={[styles.linearGradient, { borderRadius: 8, marginVertical: 10 }]}
                                >

                                    <TouchableOpacity
                                        style={[styles.containerBtn]}
                                        onPress={
                                            this.onClickConfirm.bind(this)
                                        }
                                    >
                                        <Text style={[styles.containerBtnTxt]}>CONFIRM</Text>
                                        {
                                            this.state.isActivity && <ActivityIndicator
                                                size="small"
                                                color="#000"
                                                style={{ top: 10, position: 'absolute', zIndex: 9, alignSelf: 'center', }}
                                            ></ActivityIndicator>
                                        }
                                    </TouchableOpacity>
                                </LinearGradient>
                            </View>
                        }

                    </View>
                    <View style={[styles.containerIcon]}>
                        <View style={{ marginHorizontal: 10 }}>
                            <View style={{ marginHorizontal: 8, width: 40, height: 40, borderRadius: 100, backgroundColor: '#00336B', justifyContent: 'center', alignSelf: 'center' }}>
                                <Icon name='facebook' size={25} color={'white'} style={{ alignSelf: 'center' }} />
                            </View>
                            <Text>Facebook</Text>
                        </View>
                        <View style={{ marginHorizontal: 10 }}>
                            <View style={{ marginHorizontal: 8, width: 40, height: 40, borderRadius: 100, backgroundColor: '#2181C4', justifyContent: 'center', alignSelf: 'center' }}>
                                <Icon name='twitter' size={25} color={'white'} style={{ alignSelf: 'center' }} />
                            </View>
                            <Text>Twiter</Text>
                        </View>
                        <View style={{ marginHorizontal: 10 }}>
                            <View style={{ marginHorizontal: 8, width: 40, height: 40, borderRadius: 100, backgroundColor: '#C10000', justifyContent: 'center', alignSelf: 'center' }}>
                                <Icon name='google' size={25} color={'white'} style={{ marginHorizontal: 8 }} />
                            </View>
                            <Text>Google</Text>
                        </View>

                    </View>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',

    },
    containerLogin: {
        alignSelf: 'center',
        width: 160,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#787878',
        textAlign: 'center',
        marginBottom: 50,
        borderBottomColor: '#005aa7',
        borderBottomWidth: 1,
    },
    containerEnter: {
        marginHorizontal: 45,
        fontSize: 15,
        color: '#DDD'
    },
    containerTxt: {
        flex: 1,
        height: 50,
        fontSize: 15,
        marginLeft: 10

    },
    containerCheckbox: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginVertical: 10,

    },
    containerCheckboxTxt: {
        marginTop: 8,
        color: '#BBB'
    },
    containerBtn: {
        borderRadius: 50,
        height: 30,
        marginVertical: 4,
        justifyContent: 'flex-start',
    },
    containerBtnTxt: {
        textAlign: 'center',
        alignSelf: 'center',
        top: 4,
        fontSize: 15,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 4
    },
    containerIcon: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 40,
    },
    containerEnterUser: {
        borderBottomColor: '#CCC',
        borderBottomWidth: 1,
        fontSize: 15,
        paddingLeft: 15,
        paddingVertical: 15,

    }
})