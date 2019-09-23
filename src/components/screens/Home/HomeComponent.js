import React, { Component } from 'react';
import {
    Text,
    Image,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Linking,
    SafeAreaView
} from 'react-native';
// import FABsComponent from '../../Anima/FABsComponent';
import { Container, Header, View, Button, Icon, Fab } from 'native-base';


export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            active: false
        };
    }
    componentDidMount() {
        this.props.getCarts();
    }

    render() {
        // sử dụng navigate để di chuyển giữa 2 màn hình
        const { navigate } = this.props.navigation;
        console.log(this.props.categorys);

        return (
            <Container>
                <SafeAreaView>
                <View>
                    <FlatList
                        data={this.props.categorys}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.showProductTask(true,item.name);
                                    // navigate di chuyển sang màn hình Products và truyền dữ liệ qua Products
                                    navigate('Products', {
                                        category: item.name
                                    });
                                }}
                            >
                                <View style={[styles.container]}>
                                    <Image source={item.src} style={[styles.image]}></Image>
                                    <Text style={[styles.txtName]}>{item.name}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => `${item.id}`}
                    ></FlatList>
                </View>
                <View style={{ flex: 1 }}>
                    <Fab
                        active={this.state.active}
                        direction="up"
                        containerStyle={{}}
                        style={{ backgroundColor: '#5067FF' }}
                        position="bottomRight"
                        onPress={() => this.setState({ active: !this.state.active })}>
                        <Icon name="chatboxes" />
                        <Button style={{ backgroundColor: '#34A34F' }}>
                            <Icon name="logo-whatsapp" />
                        </Button>
                        <Button
                            style={{ backgroundColor: '#3B5998' }}
                            onPress={
                                () => {
                                    Linking.canOpenURL('https://urlgeni.us/facebook/AdminAppShop')
                                        .then((supported) => {
                                            if (!supported) {
                                                console.log("Can't handle url: " + 'https://urlgeni.us/facebook/AdminAppShop');
                                            } else {
                                                return Linking.openURL('https://urlgeni.us/facebook/AdminAppShop');
                                            }
                                        })
                                        .catch((err) => console.error('An error occurred', err))
                                }
                            }
                        >
                            <Icon name="logo-facebook" />
                        </Button>
                        <Button disabled style={{ backgroundColor: '#DD5144' }}>
                            <Icon name="mail" />
                        </Button>
                    </Fab>
                </View>
                </SafeAreaView>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        width: 128,
        height: 128,
        left: '35%'
    },
    txtName: {
        fontSize: 21,
        fontWeight: "bold",
        textAlign: 'center'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#FFF',
        marginHorizontal: 8,
        marginVertical: 16,
        borderRadius: 10,
        shadowColor: '#AAA',
        shadowOpacity: 0.5,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },
        elevation: 1
    }
})
