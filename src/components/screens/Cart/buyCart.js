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
    KeyboardAvoidingView
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Swipeout from 'react-native-swipeout';

export default class BuyCart extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <KeyboardAvoidingView
                style={{ flex: 1, }}
                behavior="padding"
                enabled
            >

                <View style={styles.container}>
                    <Text>Ho Ten:</Text>
                    <TextInput
                        placeholder={'Nhap ho ten'}
                    />
                    <Text>Dien Thoai Di Dong:</Text>
                    <TextInput
                        placeholder={'Nhap so dien thoai'}
                    />
                    <Text>Tinh/Thanh Pho:</Text>
                    <Picker
                    // selectedValue={item.size}
                    // style={{ height: 20, flex: 1 }}
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
                    <Text>Quan/Huyen:</Text>
                    <TextInput
                        placeholder={'Nhap Quan/Huyen'}
                    />
                    <Text>Phuong/Xa:</Text>
                    <TextInput
                        placeholder={'Nhap Phuong/Xa'}
                    />
                    <Text>Dia Chi:</Text>
                    <TextInput
                        placeholder={'Nhap Dia Chi'}
                    />
                    <Text>Để nhận hàng thuận tiện hơn, bạn vui lòng cho Tiki biết loại địa chỉ.</Text>
                    <Text>Loai Dia Chi:</Text>
                    <Text>Nhà riêng / Chung cư</Text>
                    <CheckBox
                        testID='Nhà riêng / Chung cư'
                    ></CheckBox>
                    <Text>Cơ quan / Công ty</Text>
                    <CheckBox
                        testID='Cơ quan / Công ty'
                    ></CheckBox>

                </View>
                <TouchableNativeFeedback
                >
                    <View style={styles.btnBuy}>
                        <Text style={{ color: '#FFF' }}>BUY</Text>
                    </View>
                </TouchableNativeFeedback>
            </KeyboardAvoidingView>
        );
    };
}

const styles = StyleSheet.create({
    container: {

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
    }
})