import React from 'react'
import {View, Animated, StyleSheet, Dimensions} from 'react-native'
import CustomizedButton from '../../otherComponents/CustomizedButton'


class Tick extends React.Component{
    constructor(props){
        super(props)
        this.borderWidth = new Animated.Value(0)
        this.animationIsOn = false
    }

    borderBlink = (_continue = false) => {
        // bloc of conditions to make sure we do not activate multiple times
        // the tick animation. This happens when the rows has already been filled
        // with the 4 different colors but the user is still changing the circles colors.
        // when clicking on the circles we want to make sure the user won't
        // trigger another time this animation which would overlap over the current one
        if (this.animationIsOn){
            if (_continue & this.props.checkUserGuess()){}
            else{return}
        }else{this.animationIsOn = true}

        // this condition is here to make sure the function stops once we display another screen
        if (this.props.animateTick && this.props.getActiveView() === "gameInterface"){
            Animated.sequence([
                Animated.timing(this.borderWidth, {toValue : .5, duration : 1000, useNativeDriver : false}),
                Animated.timing(this.borderWidth, {toValue : 0, duration : 1000, useNativeDriver : false})
            ]).start(() => this.borderBlink(true))
        }else{}
    }

    // set the parameters for the tick animation: when all circles are filled,
    // we want the the tick to animate so the user knows what to do
    getAnimationParams = () => {
        var windowHeight = Dimensions.get('window').height
        var height = this.props.relativeImageSize * windowHeight

        const params = {
            borderRadius : 100,
            position : "absolute",
            height : height,
            width : height,
            backgroundColor : "gold",
            opacity : this.borderWidth,
        }
        return(params)
    }

    componentDidUpdate(){this.borderBlink()}

    render(){
        var borderStyle = this.getAnimationParams()

        return(
            <View>
                <Animated.View style = {borderStyle}/>
                <CustomizedButton source = "next"
                                  relativeImageSize = {this.props.relativeImageSize}
                                  onPress = {this.props.onPress}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
})


export default Tick
