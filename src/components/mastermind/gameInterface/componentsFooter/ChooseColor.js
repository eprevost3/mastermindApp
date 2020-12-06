import React from 'react'
import {View, TouchableOpacity, StyleSheet, Dimensions, Animated} from 'react-native'

// dictionary converting "red", "blue" to rgb colors (better for customization)
const colToRGB = {red : "rgb(150, 0, 0)", blue : "rgb(0, 0, 150)",
                  green : "rgb(0, 150, 0)", purple : "rgb(150, 0, 150)",
                  black : "rgb(0, 0, 0)", grey : '#696969'}


class Color extends React.Component{
    constructor(props){
        super(props)
        this.borderWidth = new Animated.Value(4)
    }

    animation = () => {Animated.sequence([
            Animated.timing(this.borderWidth, {toValue : 3, duration : 1000, useNativeDriver : false}),
            Animated.timing(this.borderWidth, {toValue : 5, duration : 1000, useNativeDriver : false})
        ]).start(() => this.animation())
    }

    componentDidMount(){
        this.animation()
    }

    render(){
        const size = .15 * Dimensions.get('window').width
        if(this.props.isActive){var extraCSSProperties = {borderColor : "yellow",
                                                          borderWidth : this.borderWidth}
        }else{}

        return(
            <View>
                <TouchableOpacity onPress = {() => {this.props.activateCircle(this.props.backgroundColor)}}>
                    <Animated.View style={{borderRadius : 100,
                                           backgroundColor : colToRGB[this.props.backgroundColor],
                                           width : size,
                                           height : size,
                                           ...extraCSSProperties}}/>
                </TouchableOpacity>
            </View>
        )
    }
}



class ChooseColor extends React.Component{
    constructor(props){
        super(props)
        this.listColor = ["red", "blue", "green", "purple", "black"]
        this.state = {activeColor : this.props.getActiveColor()}
    }

    // determine which circle is active and which is not
    activateCircle = (color) => {
        this.setState({activeColor : color})

        // indicate to the board which color is active
        this.props.setActiveColor(color)
    }

    render(){

        return(
            <View style={styles.main}>
                {this.listColor.map((color, id) => (<Color backgroundColor = {color}
                                                           isActive = {color === this.state.activeColor}
                                                           activateCircle = {this.activateCircle}
                                                           key = {id}/>))}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main : {
        flex : 1,
        flexDirection : 'row',
        justifyContent : 'space-around',
        alignItems : 'center',
    },
})

export default ChooseColor
