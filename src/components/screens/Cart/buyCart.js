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
    Platform,
    DeviceEventEmitter,
    NativeModules,
    NativeEventEmitter,
    SafeAreaView,
    ActivityIndicator
} from 'react-native';
import RNMomosdk from 'react-native-momosdk';
import AsyncStorage from '@react-native-community/async-storage';
import Swipeout from 'react-native-swipeout';
// import RSAKey from 'react-native-rsa';
// const NodeRSA = require('node-rsa');
const RNMomosdkModule = NativeModules.RNMomosdk;
const EventEmitter = new NativeEventEmitter(RNMomosdkModule);


export default class BuyCart extends React.Component {
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
            merchantname: "APPSHOP",// 
            merchantcode: "MOMOIQA420180417",
            merchantNameLabel: "App Shop",
            billdescription: "Fast and Furious 8",
            amount: 0,
            enviroment: "0", //"0": SANBOX , "1": PRODUCTION
            userName: '',
            phone: '',
            quanHuyen: '',
            phuongXa: '',
            address: ''

        }
    }
    componentDidMount() {
        // Listen for native events
        let me = this;
        EventEmitter.addListener('RCTMoMoNoficationCenterRequestTokenReceived', (response) => {
            console.log("<MoMoPay>Listen.Event::" + JSON.stringify(response));
            try {
                if (response && response.status == 0) {
                    let fromapp = response.fromapp; //ALWAYS:: fromapp==momotransfer
                    me.setState({ description: JSON.stringify(response), processing: false });
                    let momoToken = response.data;
                    let phonenumber = response.phonenumber;
                    let message = response.message;
                    let orderId = response.refOrderId; //your orderId
                    let requestId = response.refRequestId; //your requestId
                    //continue to submit momoToken,phonenumber to server
                    console.log('componentDidMount: ', fromapp, momoToken, phonenumber, message, orderId, requestId);

                } else {
                    me.setState({ description: "message: Get token fail", processing: false });
                }
            } catch (ex) { }

        });

        //OPTIONAL
        EventEmitter.addListener('RCTMoMoNoficationCenterRequestTokenState', (response) => {
            console.log("<MoMoPay>Listen.RequestTokenState:: " + response.status);
            // status = 1: Parameters valid & ready to open MoMo app.
            // status = 2: canOpenURL failed for URL MoMo app 
            // status = 3: Parameters invalid
        })
    }

    formatNumberToMoney(number, defaultNum, predicate) {
        predicate = !predicate ? "" : "" + predicate;
        if (number == 0 || number == '' || number == null || number == 'undefined' ||
            isNaN(number) === true ||
            number == '0' || number == '00' || number == '000')
            return "0" + predicate;

        var array = [];
        var result = '';
        var count = 0;

        if (!number) {
            return defaultNum ? defaultNum : "" + predicate
        }

        let flag1 = false;
        if (number < 0) {
            number = -number;
            flag1 = true;
        }

        var numberString = number.toString();
        if (numberString.length < 3) {
            return numberString + predicate;
        }

        for (let i = numberString.length - 1; i >= 0; i--) {
            count += 1;
            if (numberString[i] == "." || numberString[i] == ",") {
                array.push(',');
                count = 0;
            } else {
                array.push(numberString[i]);
            }
            if (count == 3 && i >= 1) {
                array.push('.');
                count = 0;
            }
        }

        for (let i = array.length - 1; i >= 0; i--) {
            result += array[i];
        }

        if (flag1)
            result = "-" + result;

        return result + predicate;
    }

    // TODO: Action to Request Payment MoMo App
    onPress = async () => {
        if (!this.state.processing) {
            let jsonData = {};
            jsonData.action = "gettoken"; // default gettoken
            jsonData.partner = "merchant"; // default merchant
            jsonData.appScheme = "momoiqa420180417";// partnerSchemeId được cung cấp bởi MoMo ---iOS App Only , get from Info.plist > key URL types > URL Schemes. Check Readme 
            jsonData.amount = this.state.amount; // so tien thanh toan
            jsonData.description = this.state.billdescription;// Mo ta Chi tiet
            jsonData.merchantcode = "MOMOIQA420180417"; // thong tin partner code tu momo
            jsonData.merchantname = 'APP SHOP'; // ten shop
            jsonData.merchantnamelabel = this.state.mermerchantNameLabel; // Hien Thi ten shop tren momo
            jsonData.fee = 0; // phi thanh toan.
            jsonData.userName = this.state.userName;// dinh danh user email or id
            jsonData.orderLabel = "Ma don hang"; // Label để hiển thị Mã đơn hàng
            jsonData.orderId = "490741545892130"; //Mã đơn hàng đối tác
            jsonData.isDev = true; //SANBOX only , remove this key on PRODUCTION 
            jsonData.enviroment = "0"; //"0": SANBOX , "1": PRODUCTION
            jsonData.requestId = "your_requestId";

            if (Platform.OS == 'android') {
                console.log(Platform.OS);
                // Gui req toi server MOMO.
                let dataPayment = await RNMomosdk.requestPayment(jsonData);
                // sau khi MOMO tra ve.
                this.momoHandleResponse(dataPayment);
            } else {
                RNMomosdk.requestPayment(JSON.stringify(jsonData));
            }
            this.setState({ description: "", processing: true });
        }
        else {
            this.setState({ description: ".....", processing: false });
        }
    }

    async momoHandleResponse(response) {
        try {
            if (response && response.status == 0) {

                let fromapp = response.fromapp; //ALWAYS:: fromapp==momotransfer
                this.setState({ description: JSON.stringify(response), processing: false });
                let momoToken = response.data;
                let phonenumber = response.phonenumber;
                //continue to submit momoToken,phonenumber to server
                    console.log("response:_______", response);

                    fetch("http://192.168.0.113:3000/paymentMOMO",
                        {
                            method: 'POST',
                            headers: {
                                Accept: "application/json",
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                customerNumber: phonenumber,
                                customerName: 'Nguyen Van A',
                                partnerCode: 'MOMOIQA420180417',
                                partnerRefId: '490741545892130',
                                appData: momoToken,
                                description: "Thanh toan cho don hang Merchant123556666 qua MoMo",
                                amount: this.state.amount,
                                partnerTransId: 'Thanh Toan MOMO'
                            }),
                        }
                    ).then(
                        res => {
                            return res.json();
                        }
                    ).then(
                        res1 => {
                            console.log(res1.encrypted);

                        }
                    )

                
            } else {
                this.setState({ description: "message: Get token fail", processing: false });
            }
        } catch (ex) { }
    }

    // onChangeText = (value) => {
    //     let newValue = value.replace(/\./g, "").trim();
    //     let amount = this.formatNumberToMoney(newValue, null, "");
    //     this.setState({ amount: newValue, textAmount: amount, description: "" });
    // }
    render() {
        // let { textAmount, description } = this.state;
        return (
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
                                this.setState({ userName: txt });
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
                                this.setState({ phone: txt });
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
                                this.setState({ address: txt });
                            }
                        }
                    />
                    <Text style={{ fontStyle: 'italic', color: '#AAA' }}>Để nhận hàng thuận tiện hơn, bạn vui lòng cho Tiki biết loại địa chỉ.</Text>
                    <Text style={styles.containerText}>Loai Dia Chi:</Text>
                    <View style={styles.containerCheckBox}>
                        <CheckBox
                            testID='Nhà riêng / Chung cư'
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
                        <Text>Nhà riêng / Chung cư</Text>
                    </View>
                    <View style={styles.containerCheckBox}>
                        <CheckBox
                            testID='Cơ quan / Công ty'
                            value={this.state.isCheckbox}
                            style={{ alignSelf: 'center', width: 15, height: 15, marginRight: 10 }}
                            onValueChange={
                                () => {
                                    this.setState({
                                        isCheckbox: !this.state.isCheckbox

                                    });
                                }
                            }
                        ></CheckBox>
                        <Text>Cơ quan / Công ty</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={this.onPress}>
                    <View style={styles.btnBuy}>
                        <Text style={{ color: '#FFF' }}>BUY</Text>
                    </View>
                </TouchableOpacity>
                {/* <SafeAreaView style={{ flex: 1, marginTop: 50, backgroundColor: 'transparent' }}>
                    <View style={styles.container}>
                        <View style={[{ backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center', height: 100 }]}>
                        </View>
                        <Text style={[styles.text, { color: 'red', fontSize: 20 }]}>{"MOMO DEVELOPMENT"}</Text>
                        <Text style={[styles.text, { color: 'red', fontSize: 18 }]}>{"React native version"}</Text>
                        <Text style={[styles.text, { color: '#000', fontSize: 14, marginVertical: 5, textAlign: 'left', marginTop: 20 }]}>{"MerchantCode : " + merchantcode}</Text>
                        <Text style={[styles.text, { color: '#000', fontSize: 14, marginVertical: 5, textAlign: 'left' }]}>{"MerchantName : " + merchantname}</Text>
                        <Text style={[styles.text, { color: '#000', fontSize: 14, marginVertical: 5, textAlign: 'left' }]}>{"Description : " + billdescription}</Text>
                        <View style={styles.formInput}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ flex: 1, fontSize: 18, paddingHorizontal: 10 }}>{"Total amount"}</Text>
                                <TextInput
                                    autoFocus={true}
                                    maxLength={10}
                                    placeholderTextColor={"#929292"}
                                    placeholder={"Enter amount"}
                                    keyboardType={"numeric"}
                                    returnKeyType="done"
                                    value={textAmount == 0 ? "" : textAmount}
                                    style={[styles.textInput, { flex: 1, paddingRight: 30 }]}
                                    onChangeText={this.onChangeText}
                                    underlineColorAndroid="transparent"
                                />
                                <Text style={{ position: 'absolute', right: 20, fontSize: 30 }}>{"đ"}</Text>
                            </View>
                        </View>

                        <TouchableOpacity onPress={this.onPress} style={styles.button} >
                            {
                                this.state.processing ?
                                    <Text style={styles.textGrey}>Waiting response from MoMo App</Text>
                                    :
                                    <Text style={styles.text}>Confirm Payment</Text>
                            }
                        </TouchableOpacity>
                        {this.state.processing ?
                            <ActivityIndicator size="small" color="#000" />
                            : null
                        }
                        {
                            description != "" ?
                                <Text style={[styles.text, { color: 'red' }]}>{description}</Text>
                                : null
                        }
                    </View>
                </SafeAreaView> */}
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
        flexDirection: 'row'
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