import React from 'react'
import {View, TouchableOpacity, StyleSheet, Dimensions, ImageBackground, Animated, Alert} from 'react-native'
import Tick from './Tick'

const Results = (props) => {
    var windowWidth = Dimensions.get('window').width
    var sizeButton = 0.05 * windowWidth

    var additionalStyles = {width : sizeButton, height : sizeButton,}
    var colors = props.colorPegs[props.id]



    return(
        <View style = {styles.blocResults}>
            <View style = {styles.padding}>
            </View>

            <View style = {styles.lineResult}>
                <View style = {{...styles.circle, ...additionalStyles, backgroundColor : colors[0]}}>
                </View>

                <View style = {{...styles.circle, ...additionalStyles, backgroundColor : colors[1]}}>
                </View>
            </View>

            <View style = {styles.lineResult}>
                <View style = {{...styles.circle, ...additionalStyles, backgroundColor : colors[2]}}>
                </View>

                <View style = {{...styles.circle, ...additionalStyles, backgroundColor : colors[3]}}>
                </View>
            </View>

            <View style = {styles.padding}>
            </View>
        </View>
    )
}

class Circle extends React.Component{
    constructor(props){
        super(props)
        this.state = {color : 'grey'}

        // dictionary converting "red", "blue" to rgb colors (better for customization)
        this.colToRGB = {red : "rgb(150, 0, 0)", blue : "rgb(0, 0, 150)",
                          green : "rgb(0, 150, 0)", purple : "rgb(150, 0, 150)",
                          black : "rgb(0, 0, 0)", grey : '#696969'}


        this.border = new Animated.Value(1)
    }

    // change the color of the circle only if we are on the current line being played
    changeColor = () => {
        if (this.props.isActive){
            this.setState({color : this.props.getActiveColor()})

            // update the list of the colors chosen by the user
            var idx = this.props.colId
            var color = this.props.getActiveColor()
            this.props.updateUserGuess(idx, color)

            this.props.colorCircles[this.props.lineId][idx] = color

            // indicate to the Line object that one button has been filled. Once
            // all buttons are filled, the animation of the tick object is triggered
            this.props.updateCount()
        }else{}
    }

    componentDidUpdate(){
        var colorCircle = this.props.colorCircles[this.props.lineId][this.props.colId]

        if (colorCircle !== this.state.color){this.setState({color : colorCircle})}
        else{}
    }

    // animation to modify the opacity
    modifyBorder = () => {
        // condition to stop the animation as soon as we good back to another screen
        // otherwise the animation continues running in the background
        if (this.props.getActiveView() === "gameInterface"){
            Animated.sequence([
                Animated.timing(this.border, {toValue : 3, duration : 1000, useNativeDriver : false}),
                Animated.timing(this.border, {toValue : 1, duration : 1000, useNativeDriver : false}),
            ]).start(() => this.modifyBorder())
        }else{}
    }

    componentDidMount(){
        this.modifyBorder()
    }

    render(){
        const size = .15 * Dimensions.get('window').width
        var color = this.colToRGB[this.state.color]

        // adding an animation if the circle is in the line that can be modified
        // the border is going to change
        var border = this.props.isActive && this.state.color === "grey" ? this.border : 0

        return(
            <View>
                <TouchableOpacity onPress = {() => this.changeColor()}>
                    <Animated.View style={{borderRadius : 100,
                                           backgroundColor : color,
                                           width : size,
                                           height : size,
                                           borderWidth : border,
                                           borderColor : '#888888',
                                           }}/>
                </TouchableOpacity>
            </View>
        )
    }
}

// size of the tick button: the board itself represents around 70% of the
// height screen, then we just have to divide by the number of lines
// we want to plot to avoid an oversized button
// also we have to deal with the width of the tick button (sometimes the
// height may be okay but the width is not, hence the button is too large
// for the space dedicated to it)
const setTickSize = (nbLines) => {
    const height = Dimensions.get("window").height
    const width = Dimensions.get("window").width
    let sizeTick

    // size of the box hosting the tick
    var heightTickParent = .7 * height / nbLines
    var widthTickParent = width * .17
    if (heightTickParent < widthTickParent){sizeTick = heightTickParent / height}
    else{
        // careful the size of the button is depending on the height of the window so
        // normalizing using the height
        sizeTick = widthTickParent / height
    }

    return(sizeTick)
}



class LineBoard extends React.Component{
    constructor(props){
        super(props)

        // defines how many circles of the line are filled with a color
        this.count = 0
    }

    // updates how many circles are not filled with a color yet
    updateCount = () => {
        this.count = 0

        for (var k = 0; k < 4; k++){
            if (this.props.colorCircles[this.props.id][k] !== "grey"){this.count ++}
            else{}
        }

        // trigger a rendering
        if (this.count === 4){this.setState({})}
        else{}
    }

    render(){
        const ids = [0, 1, 2, 3]

        // indicates if the tick button should be animated (when all buttons are filled with a color)
        const animateTick = this.props.isDisplayed * (this.count === 4)

        var button = this.props.isDisplayed ? <Tick relativeImageSize = {setTickSize(this.props.nbLines)}
                                                    onPress = {this.props.validate}
                                                    animateTick = {animateTick}
                                                    getActiveView = {this.props.getActiveView}
                                                    checkUserGuess = {this.props.checkUserGuess}/> : <View/>


        return(
            <View style = {{...styles.line}}>
                <View style = {styles.guesses}>
                    {ids.map((id) => (<Circle getActiveColor = {this.props.getActiveColor}
                                              isActive = {this.props.isDisplayed}
                                              key = {id}
                                              lineId = {this.props.id}
                                              colId = {id}
                                              updateUserGuess = {this.props.updateUserGuess}
                                              colorPegs = {this.props.colorPegs}
                                              colorCircles = {this.props.colorCircles}
                                              updateCount = {this.updateCount}
                                              getActiveView = {this.props.getActiveView}
                                              />))}
                </View>

                <View style = {styles.next}>
                    {button}
                </View>

                <View style = {styles.results}>
                    <ImageBackground source = {require("../../img/woodClear.png")} style = {styles.imageBackground}>
                        <Results colorPegs = {this.props.colorPegs} id = {this.props.id}/>
                    </ImageBackground>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    line : {
        flex : 1,
        flexDirection : 'row',
    },
    guesses : {
        flex : 4,
        flexDirection : 'row',
        justifyContent : 'space-around',
        alignItems : 'center',
    },
    next : {
        flex : 1,
        justifyContent : "center",
        alignItems : "center",
        paddingLeft : 2,
    },

    results : {
        flex : 1,
    },

    blocResults : {
        flex : 1,
        flexDirection : 'column',
        justifyContent : 'center'
    },

    lineResult : {
        flex : 1,
        flexDirection : 'row',
        justifyContent : 'space-around',
        alignItems : 'center',
    },

    circle : {
        borderRadius : 100,
    },

    padding : {
        flex : .5,
    },
    imageBackground : {
        flex : 1,
        resizeMode : "cover",
    }
})

export default LineBoard
