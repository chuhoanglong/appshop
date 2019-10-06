import React, { useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    Image,
    Platform,
    DeviceEventEmitter,
    NativeModules,
    NativeEventEmitter,
} from 'react-native';
import { WebView } from 'react-native-webview';
import axios from "axios";
import qs from "qs"
import RNMomosdk from 'react-native-momosdk';

const RNMomosdkModule = NativeModules.RNMomosdk;
const EventEmitter = new NativeEventEmitter(RNMomosdkModule);
class MethodBuy extends React.Component {
    constructor() {
        super();
        this.state = {
            //paypall
            isWebViewLoading: false,
            paypalUrl: '',
            accessToken: '',
            shouldShowWebViewLoading: true,
            //MOMO
            description: "",
            processing: false,
            merchantname: "APPSHOP",// 
            merchantcode: "MOMOIQA420180417",
            merchantNameLabel: "App Shop",
            billdescription: "Thanh Toan Cho Appshop",
            amount: 0,
            enviroment: "0", //"0": SANBOX , "1": PRODUCTION
            processing: false,
            hoten: '',
            dienthoai: '',
            quanHuyen: '',
            phuongXa: '',
            diachi: ''
        }
    }

    componentWillMount(){
        const { navigation } = this.props;
        const hoten = JSON.stringify(navigation.getParam('hoten', 'NO-HOTEN'));
        const dienthoai = JSON.stringify(navigation.getParam('dienthoai', 'NO-DIENTHOAI'));
        const diachi = JSON.stringify(navigation.getParam('diachi', 'NO-DIACHI'));
        const quanHuyen = JSON.stringify(navigation.getParam('quanHuyen', 'NO-QUANHUYEN'));
        const phuongXa = JSON.stringify(navigation.getParam('phuongXa', 'NO-PHUONGXA'));
        const amount = navigation.getParam('amount', 0);
        this.setState({
            hoten,
            dienthoai,
            diachi,
            quanHuyen,
            phuongXa,
            amount
        })
 
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

    // TODO: Action to Request Payment MoMo App
onPressMOMO = async () => {
    if (!this.state.processing) {
        let jsonData = {};
        jsonData.action = "gettoken"; // default gettoken
        jsonData.partner = "merchant"; // default merchant
        jsonData.appScheme = "momoiqa420180417";// partnerSchemeId được cung cấp bởi MoMo ---iOS App Only , get from Info.plist > key URL types > URL Schemes. Check Readme 
        jsonData.amount = this.state.amount; // so tien thanh toan
        jsonData.description = this.state.billdescription;// Mo ta Chi tiet
        jsonData.merchantcode = "MOMOIQA420180417"; // thong tin partner code tu momo
        jsonData.merchantname = 'APP SHOP'; // ten shop
        jsonData.merchantnamelabel = this.state.merchantNameLabel; // Hien Thi ten shop tren momo
        jsonData.fee = 0; // phi thanh toan.
        jsonData.userName = this.state.userName;// dinh danh user email or id
        jsonData.orderLabel = "Ma don hang"; // Label để hiển thị Mã đơn hàng
        jsonData.orderId = JSON.stringify(new Date()); //Mã đơn hàng đối tác
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
                        customerName: this.state.hoten,
                        partnerCode: 'MOMOIQA420180417',
                        partnerRefId: this.state.orderId,
                        appData: momoToken,
                        description: `Thanh toan cho don hang ${this.state.orderId} qua MoMo`,
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

    //When loading paypal page it refirects lots of times. This prop to control start loading only first time
    SetIsWebViewLoading(is) {
        this.setState({ isWebViewLoading: is })
    }
    setPaypalUrl(url) {
        this.setState({ paypalUrl: url })
    }
    setAccessToken(token) {
        this.setState({ accessToken: token });
    }
    setShouldShowWebviewLoading(is) {
        this.setState({ shouldShowWebViewLoading: is });
    }
    /*---Paypal checkout section---*/
    buyBook = () => {

        //Check out https://developer.paypal.com/docs/integration/direct/payments/paypal-payments/# for more detail paypal checkout
        const dataDetail = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "transactions": [{
                "amount": {
                    "currency": "AUD",
                    "total": "26",
                    "details": {
                        "shipping": "6",
                        "subtotal": "20",
                        "shipping_discount": "0",
                        "insurance": "0",
                        "handling_fee": "0",
                        "tax": "0"
                    }
                },
                "description": "This is the payment transaction description",
                "payment_options": {
                    "allowed_payment_method": "IMMEDIATE_PAY"
                }, "item_list": {
                    "items": [{
                        "name": "Book",
                        "description": "Chasing After The Wind",
                        "quantity": "1",
                        "price": "20",
                        "tax": "0",
                        "sku": "product34",
                        "currency": "AUD"
                    }]
                }
            }],
            "redirect_urls": {
                "return_url": "https://example.com/",
                "cancel_url": "https://example.com/"
            }
        }

        const url = `https://api.sandbox.paypal.com/v1/oauth2/token`;

        const data = {
            grant_type: 'client_credentials'

        };

        const auth = {
            username: "Ado3YR9RPtGenpf3W4ABX799e7P0wCA1Xht-HlcTCn9wxGnLSHkn-lntNqaWOpJV9GeSbhVamd9T-GpY",  //"your_paypal-app-client-ID",
            password: "EIpdkrBpKNh4JBcAw0MYPUvGzSFq7VDTzSFfXZKz65477VkvpGkAJVQQjGKqUPUKLBGnAYAIgxukRPdF"   //"your-paypal-app-secret-ID


        };

        const options = {

            method: 'post',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Credentials': true
            },

            //Make sure you use the qs.stringify for data
            data: qs.stringify(data),
            auth: auth,
            url,
        };

        // Authorise with seller app information (clientId and secret key)
        axios(options).then(response => {
            this.setAccessToken(response.data.access_token)

            //Resquest payal payment (It will load login page payment detail on the way)
            axios.post(`https://api.sandbox.paypal.com/v1/payments/payment`, dataDetail,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${response.data.access_token}`
                    }
                }
            )
                .then(response => {
                    const { id, links } = response.data
                    const approvalUrl = links.find(data => data.rel == "approval_url").href

                    console.log("response", links)
                    this.setPaypalUrl(approvalUrl)
                }).catch(err => {
                    console.log({ ...err })
                })
        }).catch(err => {
            console.log(err)
        })
    };

    /*---End Paypal checkout section---*/

    onWebviewLoadStart = () => {
        if (this.state.shouldShowWebViewLoading) {
            this.SetIsWebViewLoading(true)
        }
    }

    _onNavigationStateChange = (webViewState) => {
        console.log("webViewState", webViewState)

        //When the webViewState.title is empty this mean it's in process loading the first paypal page so there is no paypal's loading icon
        //We show our loading icon then. After that we don't want to show our icon we need to set setShouldShowWebviewLoading to limit it
        if (webViewState.title == "") {
            //When the webview get here Don't need our loading anymore because there is one from paypal
            this.setShouldShowWebviewLoading(false)
        }

        if (webViewState.url.includes('https://example.com/')) {

            this.setPaypalUrl(null)
            const urlArr = webViewState.url.split(/(=|&)/);

            const paymentId = urlArr[2];
            const payerId = urlArr[10];

            axios.post(`https://api.sandbox.paypal.com/v1/payments/payment/${paymentId}/execute`, { payer_id: payerId },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.state.accessToken}`
                    }
                }
            )
                .then(response => {
                    this.setShouldShowWebviewLoading(true)
                    console.log(response)

                }).catch(err => {
                    this.setShouldShowWebviewLoading(true)
                    console.log({ ...err })
                })

        }
    }




    render() {
        return (
            <React.Fragment>
                <View style={styles.container}>
                    <Text>Chọn phương thức thanh toán</Text>
                    <TouchableOpacity style={styles.btn} onPress={this.onPressMOMO}>
                        <Text style={{ alignSelf: 'center', fontSize: 20 }}>Thanh toán bằng </Text>
                        <Image source={require('../../../assets/logoMOMO.png')} style={{ width: 50, height: 50 }} ></Image>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={this.buyBook}
                        style={
                            [styles.btn,{marginTop:30}]
                        }>
                        <Image source={require('../../../assets/logo-paypal.png')} style={{ width: 130, height: 60 }}  ></Image>
                    </TouchableOpacity>
                </View>
                {this.state.paypalUrl ? (
                    <View style={styles.webview}>
                        <WebView
                            style={{ height: "100%", width: "100%" }}
                            source={{ uri: this.state.paypalUrl }}
                            onNavigationStateChange={this._onNavigationStateChange}
                            javaScriptEnabled={true}
                            domStorageEnabled={true}
                            startInLoadingState={false}
                            onLoadStart={this.onWebviewLoadStart}
                            onLoadEnd={() => this.SetIsWebViewLoading(false)}
                        />
                    </View>
                ) : null}
                {this.state.isWebViewLoading ? (
                    <View style={{ ...StyleSheet.absoluteFill, justifyContent: "center", alignItems: "center", backgroundColor: "#ffffff" }}>
                        <ActivityIndicator size="small" color="#3c88fc" />
                    </View>
                ) : null}
            </React.Fragment>
        );
    }
};



export default MethodBuy;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
    },
    webview: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    btn: {
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 10,
        borderColor:'#aaa',
        backgroundColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        flexDirection: 'row',
        borderWidth: .5,
        width:250,
        height:70,
        shadowColor:'#aaa',
        shadowOpacity:.8,
        shadowOffset:{width:0,height:10},
        top:20
    },
});
