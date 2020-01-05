import React from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Platform,
    Switch,
    KeyboardAvoidingView
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { connect } from 'react-redux';
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';

class BuyCart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isCheckbox: false,
            isTextFocusName: false,
            isTextFocusPhone: false,
            isTextFocusQ: false,
            isTextFocusP: false,
            isTextFocusAdd: false,
            description: "",
            processing: false,
            hoten: '',
            dienthoai: '',
            thanhpho: '',
            quanHuyen: '',
            phuongXa: '',
            diachi: '',
            txtNote: '',
            isVerifying: false,
        }
    }

    render() {
        return (
            <KeyboardAvoidingScrollView>
                <ScrollView>
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
                            onChangeText={
                                txt => {
                                    this.setState({ hoten: txt });
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
                            onChangeText={
                                txt => {
                                    this.setState({ dienthoai: txt });
                                }
                            }
                        />
                        <Text style={styles.containerText}>Tinh/Thanh Pho:</Text>
                        <TextInput
                            placeholder={'Nhap Tinh/Thanh Pho'}
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
                            onChangeText={
                                txt => {
                                    this.setState({ thanhpho: txt });
                                }
                            }
                        />
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
                            onChangeText={
                                txt => {
                                    this.setState({ quanHuyen: txt });
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
                            onChangeText={
                                txt => {
                                    this.setState({ phuongXa: txt });
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
                            onChangeText={
                                txt => {
                                    this.setState({ diachi: txt });
                                }
                            }
                        />
                        <Text style={{ fontStyle: 'italic', color: '#AAA' }}>Để nhận hàng thuận tiện hơn, bạn vui lòng cho Tiki biết loại địa chỉ.</Text>
                        <Text style={styles.containerText}>Loai Dia Chi:</Text>
                        {Platform.OS === 'android' ?
                            <React.Fragment>

                                <View style={styles.containerCheckBox}>
                                    <CheckBox
                                        value={!this.state.isCheckbox}
                                        style={{ alignSelf: 'center', width: 15, height: 15, marginRight: 10 }}
                                        onValueChange={
                                            () => {
                                                this.setState({
                                                    isCheckbox: !this.state.isCheckbox
                                                });

                                            }
                                        }
                                    ></CheckBox>
                                    <Text style={{ color: '#828282' }}>Mua Lô</Text>
                                </View>
                            </React.Fragment>
                            :
                            <View style={{ flexDirection: 'row' }}>
                                <Switch
                                    value={this.state.isCheckbox}
                                    onValueChange={
                                        () => {
                                            this.setState({
                                                isCheckbox: !this.state.isCheckbox

                                            });
                                        }
                                    }></Switch>
                                <Text style={{ alignSelf: 'center', marginHorizontal: 10, fontSize: 16, color: '#828282' }}>Mua Lô</Text>
                            </View>
                        }
                        {
                            this.state.isCheckbox &&
                            <View>
                                <TextInput
                                    placeholder={'Ghi Chú'}
                                    style={{ height: 100, borderRadius: 10, borderColor: '#828282', borderWidth: 1, marginVertical: 10, paddingHorizontal: 10 }}
                                    multiline={true}
                                    onChangeText={(txtNote) => { this.setState({ txtNote }) }}
                                ></TextInput>
                            </View>
                        }
                    </View>

                    {!this.state.isCheckbox ? < TouchableOpacity onPress={
                        () => {
                            // this.onPress
                            this.props.navigation.navigate('MethodBuy', {
                                hoten: this.state.hoten,
                                dienthoai: this.state.dienthoai,
                                thanhpho: this.state.thanhpho,
                                quanHuyen: this.state.quanHuyen,
                                phuongXa: this.state.phuongXa,
                                diachi: this.state.diachi,
                                amount: this.props.navigation.getParam('amount', 0)
                            })
                        }
                    }>
                        <View style={styles.btnBuy}>
                            <Text style={{ color: '#FFF' }}>BUY</Text>
                        </View>
                    </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={
                            () => {
                                // this.onPress
                                this.props.navigation.navigate('MethodBuy', {
                                    hoten: this.state.hoten,
                                    dienthoai: this.state.dienthoai,
                                    thanhpho: this.state.thanhpho,
                                    quanHuyen: this.state.quanHuyen,
                                    phuongXa: this.state.phuongXa,
                                    diachi: this.state.diachi,
                                    amount: this.props.navigation.getParam('amount', 0)
                                });
                                const { filterItemUid } = this.state;
                                for (let i = 0; i < Object.keys(filterItemUid).length; i++) {
                                    let element = [];
                                    let uid = Object.keys(filterItemUid)[i];
                                    for (let j = 0; j < filterItemUid[uid].length; j++) {
                                        element.push(filterItemUid[uid][j]);
                                    }

                                    fetch('https://dmkjo.sse.codesandbox.io/users/customers', {
                                        method: 'POST',
                                        headers: {
                                            Accept: "application/json",
                                            "Content-Type": "application/json"
                                        },
                                        body: JSON.stringify({
                                            hoten: this.state.hoten,
                                            dienthoai: this.state.dienthoai,
                                            diachi: this.state.diachi,
                                            thanhpho: this.state.thanhpho,
                                            quanHuyen: this.state.quanHuyen,
                                            phuongXa: this.state.phuongXa,
                                            createdAt: new Date(),
                                            amount: this.props.navigation.getParam('amount', 0),
                                            idShop: uid,
                                            carts: element,
                                            avatarUrl: this.props.user.avatar,
                                            email: this.props.user.email,
                                            note: this.state.txtNote,
                                            isVerifying: false,
                                        }),
                                    }).then(res => {
                                        console.log(res);
                                        element = [];
                                    });
                                }
                                alert('Xin Vui Lòng Chờ Xác Nhận Từ Đơn Vị Bán!');
                            }
                        }>
                            <View style={styles.btnBuy}>
                                <Text style={{ color: '#FFF' }}>Verify</Text>
                            </View>
                        </TouchableOpacity>}
                    {
                        this.state.isCheckbox && this.state.isVerifying && < TouchableOpacity onPress={
                            () => {
                                // this.onPress
                                this.props.navigation.navigate('MethodBuy', {
                                    hoten: this.state.hoten,
                                    dienthoai: this.state.dienthoai,
                                    thanhpho: this.state.thanhpho,
                                    quanHuyen: this.state.quanHuyen,
                                    phuongXa: this.state.phuongXa,
                                    diachi: this.state.diachi,
                                    note: this.state.txtNote,
                                    amount: this.props.navigation.getParam('amount', 0)
                                })
                            }
                        }>
                            <View style={styles.btnBuy}>
                                <Text style={{ color: '#FFF' }}>BUY</Text>
                            </View>
                        </TouchableOpacity>
                    }
                </ScrollView >
            </KeyboardAvoidingScrollView>

        );
    };
}

const mapStateToProps = (state) => {
    return {
        carts: state.CartReducer.carts,
        user: state.LoginReducer.user
    }
}

export default connect(mapStateToProps, null)(BuyCart);

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
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: '#DDD',
        marginHorizontal: 0,
        marginBottom: 18,
        marginTop: -10
    },
    containerTextInputActive: {
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: '#147efb',
        marginHorizontal: 0,
        marginBottom: 18,
        marginTop: -10
    },
    containerText: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    containerCheckBox: {
        flexDirection: 'row',
        marginVertical: 10
    }
});

const styles1 = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    },
    textInput: {
        fontSize: 16,
        marginHorizontal: 15,
        marginTop: 5,
        height: 40,
        paddingBottom: 2,
        borderBottomColor: '#dadada',
        borderBottomWidth: 1,
    },
    formInput: {
        backgroundColor: '#FFF',
        borderBottomColor: '#dadada',
        borderTopColor: '#dadada',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        paddingBottom: 10,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        backgroundColor: '#b0006d',
        borderRadius: 4,
        marginHorizontal: 40,
        marginVertical: 10
    },
    text: {
        color: "#FFFFFF",
        fontSize: 18,
        textAlign: 'center',
        paddingHorizontal: 10
    },
    textGrey: {
        color: "grey",
        fontSize: 18,
        textAlign: 'center',
    }
});