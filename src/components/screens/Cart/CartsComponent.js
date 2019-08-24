import React from 'react';
import {View,Text,Image,StyleSheet,FlatList,Picker,Alert} from 'react-native';

export default class CartsComponent extends React.Component{

    constructor(props){
        super(props);
    }

    static navigationOptions = ({navigation}) => ({title:'Carts',tabBarLabel:"CART"})

    // handleChangeSize(id, size){
    //     const {data} = this.props;
    //     const newData = data.map((item)=>{
    //         if(item.id == id){
    //             return {
    //                 ...item,
    //                 size: size
    //             }
    //         }else{
    //             return {...item}
    //         }
    //     });
    //     return newData;
    // }
    
    render(){
        // lay data tu state
        // const {carts} = this.props;
        return(
            <View>
                <Text>Carts</Text>
                <FlatList
                    data={[]}
                    renderItem={({item})=>(
                        <View style={[styles.container]}>
                            <Image source={{uri:item.url}} style={{width:170,height:120,flex:1}}></Image>
                            <View style={[styles.info]}>
                                <Text style={{fontSize: 20}}>{item.name}</Text>
                                <Text style={{fontSize: 15}}>Color: {item.color}</Text>
                                <Text style={{fontSize: 15}}>Price: {item.price}</Text>
    
                                 {/* tuy chon size van chua hoan thanh */}
                                <View style={{flex:1,flexDirection:'row',}}>
                                    <Text style={{flex:1}}>Size: </Text>
                                    <Picker
                                        selectedValue={item.size}
                                        style={{height: 20,flex:1}}
                                        // onValueChange={(itemValue) =>{
                                        //     const {dispatch} = this.props;
                                        //     dispatch({
                                        //         type:"UPDATE",
                                        //         carts: this.handleChangeSize(item.id,itemValue)
                                        //     })
                                        // }}
                                        
                                        >
                                        <Picker.Item label="36" value="36" />
                                        <Picker.Item label="37" value="37" />
                                        <Picker.Item label="38" value="38" />
                                        <Picker.Item label="39" value="39" />
                                        <Picker.Item label="40" value="40" />
                                    </Picker>
                                    {/* ket thuc phan tuy chinh size */}
                                </View>  
                                                            
                            </View>
                        </View>
                    )}
                    keyExtractor={(item)=>`${item.id}`}
                    style={{paddingVertical: 8}}
                ></FlatList>
            </View>

        )
    }

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'stretch',
        backgroundColor:'#fff',
        marginHorizontal: 8,
        marginVertical: 16,
        borderRadius:4,
        shadowColor:'#000',
        shadowOpacity: 0.9,
        shadowRadius:10,
        shadowOffset:{width:0, height: 0},
        elevation: 1,
        fontFamily: 'Raleway'

    },
    info:{
        flex:1
    }
});