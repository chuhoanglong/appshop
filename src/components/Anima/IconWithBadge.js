import React from 'react';
import { View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';


class IconWithBadge extends React.Component {
    render() {
        const { name, color, size } = this.props;
        const quatity = this.props.carts.length || 0;
        return (
            <View style={{ width: 24, height: 24, margin: 5 }}>
                <Ionicons name={name} size={size} color={color} />
                <View style={{
                    position: 'absolute',
                    right: -6,
                    top: -3,
                    backgroundColor: 'red',
                    borderRadius: 6,
                    width: 12,
                    height: 12,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>{quatity}</Text>
                </View>

            </View>
        );
    }
}

export default connect(state => ({ carts: state.CartReducer.carts }))(IconWithBadge);