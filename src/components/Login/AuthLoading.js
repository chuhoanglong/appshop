import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet, Image } from 'react-native';
import logo from '../../assets/codersTokyo.png';
import AsyncStore from '@react-native-community/async-storage';
export default class AuthLoading extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        const { navigate } = this.props.navigation;
        try {
            AsyncStore.getItem('token').then(
                res => {
                    if (!res) {
                        navigate('Login');
                    } else {
                        navigate('Home');
                    }
                }
            )
        } catch (error) {

        }
    }

    render() {
        return (
            <View style={[styles.container, styles.horizontal]}>
                <Image
                    source={logo}
                    style={{
                        width: '100%',
                        height: 100
                    }}
                    width={250}
                    height={50}
                />
                <ActivityIndicator size="small" color="#0000ff" />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    horizontal: {
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 10,
        alignItems: 'center'
    }
})