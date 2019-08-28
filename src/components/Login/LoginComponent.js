import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    ActivityIndicator,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Image
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStore from '@react-native-community/async-storage';
import RNAccountKit from 'react-native-facebook-account-kit';

import logo from '../../assets/codersTokyo.png';
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isActivity: false,
            username: '',
            password: '',
            isSecureTextEntry: true
        }
    }

    componentWillMount() {
        RNAccountKit.configure({
            responseType: 'token', // 'token' by default,
            titleType: 'login',
            initialAuthState: '',
            initialEmail: 'some.initial@email.com',
            initialPhoneCountryPrefix: '+84', // autodetected if none is provided
            initialPhoneNumber: '339643579',
            facebookNotificationsEnabled: true, // true by default
            readPhoneStateEnabled: true, // true by default,
            receiveSMS: true,
            defaultCountry: 'VN',
            theme: {
                // for iOS only, see the Theme section
            }
        })
    }

    componentDidMount() {
        const { navigate } = this.props.navigation;
        AsyncStore.getItem('token').then((res) => {
            if (res) {
                navigate('Home');
            } else {

            }
        })
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <View style={styles.container}>
                <Image
                    source={logo}
                    style={{ width: 200, height: 40, marginTop:100, alignSelf: 'center',}}
                ></Image>
                <Text style={[styles.containerLogin]}>LOGIN<Text style={[styles.containerLogin,{color:'#6cb693'}]}>.APPSHOP</Text></Text>
                <View style={[styles.containerEnter]}>

                    <Text style={{ fontSize: 12 }}>UserName:</Text>
                    <TextInput
                        placeholder={'Type your username'}
                        keyboardType={'name-phone-pad'}
                        style={{ borderBottomColor: '#CCC', borderBottomWidth: 1, fontSize: 13 }}
                        onChangeText={
                            (username) => this.setState({
                                username
                            })
                        }
                    />
                    <Text style={{ fontSize: 12, marginTop: 15 }}>Password:</Text>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderBottomColor: '#CCC',
                        borderBottomWidth: 0.5

                    }}>
                        <Icon size={16} name='lock' style={{ alignSelf: 'center' }} />
                        <TextInput
                            placeholder={'Type your password'}

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
                    <View style={[styles.containerCheckbox]}>
                        <Text style={[styles.containerCheckboxTxt]}>Forgot Password?</Text>
                    </View>
                    <LinearGradient
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#0092ff', '#c9bfff', '#c700fc']} style={[styles.linearGradient, { borderRadius: 50, marginVertical: 2 }]}
                    >

                        <TouchableOpacity
                            style={[styles.containerBtn]}
                            onPress={
                                () => {
                                    this.setState({ isActivity: !this.state.isActivity });
                                    // const { username, password } = this.state;
                                    setTimeout(async () => {
                                        AsyncStore.setItem('token', 'thisisthetoken');
                                        this.setState({ isActivity: !this.state.isActivity });
                                        navigate('Home');
                                    }, 3000)
                                }
                            }
                        >
                            <Text style={[styles.containerBtnTxt]}>LOGIN</Text>
                            {
                                this.state.isActivity && <ActivityIndicator
                                    size="small"
                                    color="#8a4af3"
                                    style={{ top: 10, position:'absolute' ,zIndex:9, alignSelf: 'center',}}
                                ></ActivityIndicator>
                            }
                        </TouchableOpacity>
                    </LinearGradient>
                    <LinearGradient
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#0092ff', '#c9bfff', '#c700fc']} style={[styles.linearGradient, { borderRadius: 50, marginVertical: 2 }]}
                    >

                        <TouchableOpacity
                            style={[styles.containerBtn]}
                        onPress={
                            () => {
                                RNAccountKit.loginWithPhone()
                                    .then((token) => {
                                        if (!token) {
                                            console.log('Login cancelled')
                                        } else {
                                            console.log(`Logged with phone. Token: ${token}`);
                                            AsyncStore.setItem('token', 'thisisthetoken');
                                            this.setState({ isActivity: !this.state.isActivity });
                                            navigate('Home');
                                        }
                                    })
                            }
                        }
                        >
                            <Text style={[styles.containerBtnTxt]}>LOGIN WITH NUMBER PHONE</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                    <LinearGradient
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#0092ff', '#c9bfff', '#c700fc']} style={[styles.linearGradient, { borderRadius: 50, marginVertical: 2 }]}
                    >

                        <TouchableOpacity
                            style={[styles.containerBtn]}
                        onPress={
                            () => {
                                RNAccountKit.loginWithEmail()
                                    .then((token) => {
                                        if (!token) {
                                            console.log('Login cancelled')
                                        } else {
                                            console.log(`Logged with email. Token: ${token}`)
                                        }
                                    })
                            }
                        }
                        >
                            <Text style={[styles.containerBtnTxt]}>LOGIN WITH EMAIL</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                    <Text style={{ textAlign: 'center', fontSize: 12, color: '#BBB', marginTop: 10 }}>Or Sign Up Using</Text>
                </View>
                <View style={[styles.containerIcon]}>

                    <View style={{ marginHorizontal: 8, width: 40, height: 40, borderRadius: 100, backgroundColor: '#00336B', justifyContent: 'center', alignSelf: 'center' }}>
                        <Icon name='facebook' size={25} color={'white'}
                            style={{ alignSelf: 'center' }}></Icon>
                    </View>
                    <View style={{ marginHorizontal: 8, width: 40, height: 40, borderRadius: 100, backgroundColor: '#2181C4', justifyContent: 'center', alignSelf: 'center' }}>
                        <Icon name='twitter' size={25} color={'white'}
                            style={{ alignSelf: 'center' }}></Icon>
                    </View>
                    <View style={{ marginHorizontal: 8, width: 40, height: 40, borderRadius: 100, backgroundColor: '#C10000', justifyContent: 'center', alignSelf: 'center' }}>
                        <Icon name='google' size={25} color={'white'} style={{ marginHorizontal: 8 }}></Icon>
                    </View>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        
    },
    containerLogin: {
        alignSelf:'center',
        width:160,
        fontSize: 18,
        fontWeight: 'bold',
        color:'#787878',
        textAlign: 'center',
        marginBottom: 100,
        borderBottomColor:'#005aa7',
        borderBottomWidth:1,
    },
    containerEnter: {
        marginHorizontal: 45,
        fontSize: 15,
        color: '#DDD'
    },
    containerTxt: {
        flex: 1,
        height: 50,
        fontSize: 13

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
        marginTop: 20
    }
})