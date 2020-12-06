//creating clickable buttons
import React from 'react'
import "./Button.css"

// weird way of getting images but interestingly the require("") way doesn't work anymore
import imgFr from '../../img/Fr_flag.jpg'
import imgUs from '../../img/US_flag.jpg'
import imgHome from '../../img/homepage.png'
import play from '../mastermind/img/play.png'
import question from '../mastermind/img/question.png'
import reset from '../mastermind/img/reset.png'
import next from '../mastermind/img/next.png'
import left from '../mastermind/img/left.png'
import right from '../mastermind/img/right.png'


// since reactjs require function sucks, we can't pass arguments. So bruteforce approach
const images = {
    "fr" : imgFr,
    "us" : imgUs,
    "home" : imgHome,
    "play" : play,
    "question" : question,
    "reset" : reset,
    "next" : next,
    "left" : left,
    "right" : right,
}



const Button = ({id, image, alt, title = '', overWriteDefaultCss = {}, onClick = ()=>{} }) => {
    /* creating buttons
    id : name of the button, used by the css stylesheet to apply some transformation
    pathImage : path to the image to include into the button
    alt : alternative text if image not displayed
    title : text to display when hovering on the button
    overWriteDefaultCss : put css properties if theere is a need to overwrite the default properties defined here
    onclick : function to apply when clicking on the button
    */
    return(
        <div className = 'imageContainer'>
            <img id={id} src={images[image]} className="button" alt={alt} title={title} onClick = {onClick} style = {{...overWriteDefaultCss}}/>
        </div>)
}

export default Button


/*
//creating clickable buttons
import React from 'react'
import {View, StyleSheet, Image, Dimensions, TouchableOpacity} from 'react-native'


const CustomizedButton = ({source, relativeImageSize = .1, onPress = () => {}}) => {
    // creating buttons
    var windowHeight = Dimensions.get('window').height
    var sizeImage = relativeImageSize * windowHeight

    return(
        <View style = {{width : sizeImage, height : sizeImage}}>
            <TouchableOpacity onPress = {onPress}>
                <Image source = {pathImages[source]} style = {{width : sizeImage, height : sizeImage, resizeMode : "cover", borderRadius : 100}}/>
            </TouchableOpacity>
        </View>
    )
}

const styles =  StyleSheet.create({})

export default CustomizedButton
*/
