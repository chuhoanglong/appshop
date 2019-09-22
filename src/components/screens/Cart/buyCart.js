import React from 'react';
import {
    View,
    Text,
    TextInput,
    Image,
    StyleSheet,
    FlatList,
    Picker,
    CheckBox,
    Alert,
    TouchableOpacity,
    TouchableNativeFeedback,
    KeyboardAvoidingView,
    ScrollView,
    label
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Swipeout from 'react-native-swipeout';

export default class BuyCart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isCheckbox: false,
            isTextFocusName: false,
            isTextFocusPhone: false,
            isTextFocusQ: false,
            isTextFocusP: false,
            isTextFocusAdd: false

        }
    }
    render() {
        return (
            <ScrollView>
                {/* <KeyboardAvoidingView
                    style={{ flex: 1, }}
                    behavior="padding"
                    enabled
                > */}

                <View style={styles.container}>
                    <Text style={styles.containerText} >Ho Ten:</Text>
                    <TextInput
                        placeholder={'Nhap ho ten'}
                        style={this.state.isTextFocusName ? styles.containerTextInputActive : styles.containerTextInput}
                        onFocus={
                            () => {
                                this.setState({
                                    isTextFocusName: true
                                })
                            }
                        }
                        onBlur={
                            () => {
                                this.setState({
                                    isTextFocusName: false
                                })
                            }
                        }
                    />
                    <Text style={styles.containerText} >Dien Thoai Di Dong:</Text>
                    <TextInput
                        placeholder={'Nhap so dien thoai'}
                        style={this.state.isTextFocusPhone ? styles.containerTextInputActive : styles.containerTextInput}
                        onFocus={
                            () => {
                                this.setState({
                                    isTextFocusPhone: true
                                })
                            }
                        }
                        onBlur={
                            () => {
                                this.setState({
                                    isTextFocusPhone: false
                                })
                            }
                        }

                    />
                    <Text style={styles.containerText}>Tinh/Thanh Pho:</Text>
                    <Picker
                    // selectedValue={item.size}
                    itemStyle={{ height: 50, flex: 0 }}
                    // onValueChange={(itemValue) => {
                    //     const newCarts = this.handleChangeSize(item.id, itemValue);
                    //     this.props.onChangeSize(newCarts);
                    // }}
                    >
                        <Picker.Item label="Chon Tinh/Thanh Pho" value="" />
                        <Picker.Item label="Thanh Pho Ho Chi Minh" value="Thanh Pho Ho Chi Minh" />
                        <Picker.Item label="Ha Noi" value="Ha Noi" />
                        <Picker.Item label="Da Nang" value="Da Nang" />
                        <Picker.Item label="An Giang" value="An Giang" />
                        <Picker.Item label="Ba Ria Vung Tau" value="Ba Ria Vung Tau" />
                        <Picker.Item label="Bac Giang" value="Bac Giang" />
                        <Picker.Item label="Bac Kan" value="Bac Kan" />
                        <Picker.Item label="Bac Lieu" value="Bac Lieu" />
                        <Picker.Item label="Bac Ninh" value="Bac Ninh" />
                        <Picker.Item label="Ben Tre" value="Ben Tre" />
                        <Picker.Item label="Binh Duong" value="Binh Duong" />
                        <Picker.Item label="Binh Phuoc" value="Binh Phuoc" />
                        <Picker.Item label="Binh Thuan" value="Binh Thuan" />
                        <Picker.Item label="Binh Dinh" value="Binh Dinh" />
                        <Picker.Item label="Ca Mau" value="Ca Mau" />
                        <Picker.Item label="Can Tho" value="Can Tho" />
                        <Picker.Item label="Cao Bang" value="Cao Bang" />


                    </Picker>
                    <Text style={styles.containerText}>Quan/Huyen:</Text>
                    <TextInput
                        placeholder={'Nhap Quan/Huyen'}
                        style={this.state.isTextFocusQ ? styles.containerTextInputActive : styles.containerTextInput}
                        onFocus={
                            () => {
                                this.setState({
                                    isTextFocusQ: true
                                })
                            }
                        }
                        onBlur={
                            () => {
                                this.setState({
                                    isTextFocusQ: false
                                })
                            }
                        }

                    />
                    <Text style={styles.containerText}>Phuong/Xa:</Text>
                    <TextInput
                        placeholder={'Nhap Phuong/Xa'}
                        style={this.state.isTextFocusP ? styles.containerTextInputActive : styles.containerTextInput}
                        onFocus={
                            () => {
                                this.setState({
                                    isTextFocusP: true
                                })
                            }
                        }
                        onBlur={
                            () => {
                                this.setState({
                                    isTextFocusP: false
                                })
                            }
                        }

                    />
                    <Text style={styles.containerText}>Dia Chi:</Text>
                    <TextInput
                        placeholder={'Nhap Dia Chi'}
                        style={this.state.isTextFocusAdd ? styles.containerTextInputActive : styles.containerTextInput}
                        onFocus={
                            () => {
                                this.setState({
                                    isTextFocusAdd: true
                                })
                            }
                        }
                        onBlur={
                            () => {
                                this.setState({
                                    isTextFocusAdd: false
                                })
                            }
                        }

                    />
                    <Text style={{fontStyle:'italic',color:'#AAA'}}>Để nhận hàng thuận tiện hơn, bạn vui lòng cho Tiki biết loại địa chỉ.</Text>
                    <Text style={styles.containerText}>Loai Dia Chi:</Text>
                    <Text>Nhà riêng / Chung cư</Text>
                    <CheckBox
                        testID='Nhà riêng / Chung cư'
                        value={!this.state.isCheckbox}
                        onValueChange={
                            () => {
                                this.setState({
                                    isCheckbox: !this.state.isCheckbox
                                });

                            }
                        }
                    ></CheckBox>
                    <Text>Cơ quan / Công ty</Text>
                    <CheckBox
                        testID='Cơ quan / Công ty'
                        value={this.state.isCheckbox}
                        onValueChange={
                            () => {
                                this.setState({
                                    isCheckbox: !this.state.isCheckbox
                                    
                                });
                            }
                        }
                    ></CheckBox>

                </View>
                <TouchableOpacity
                >
                    <View style={styles.btnBuy}>
                        <Text style={{ color: '#FFF' }}>BUY</Text>
                    </View>
                </TouchableOpacity>
                {/* </KeyboardAvoidingView> */}
            </ScrollView>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginVertical: 8,
    },
    btnBuy: {
        borderWidth: 1,
        borderColor: '#EEE',
        borderRadius: 10,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1c92d2',
        marginHorizontal: 10
    },
    containerTextInput: {
        borderBottomWidth: 1,
        borderBottomColor: '#DDD',
        marginHorizontal: 0,
        marginBottom: 18,
        marginTop: -10
    },
    containerTextInputActive: {
        borderBottomWidth: 1,
        borderBottomColor: '#147efb',
        marginHorizontal: 0,
        marginBottom: 18,
        marginTop: -10
    },
    containerText:{
            fontSize: 16,
            fontWeight:'bold'
    }
})