import React from 'react'
import "./ChooseColor.css"

// dictionary converting "red", "blue" to rgb colors (better for customization)
const colToRGB = {red : "rgb(150, 0, 0)", blue : "rgb(0, 0, 150)",
                  green : "rgb(0, 150, 0)", purple : "rgb(150, 0, 150)",
                  black : "rgb(0, 0, 0)", grey : '#696969'}


class Color extends React.Component{
    render(){
        return(
            <div className = "boxContainer">
                <div className = {"chooseColor" + (this.props.isActive ? " activeColor" : "")}
                     onClick = {() => {this.props.activateCircle(this.props.backgroundColor)}}
                     style={{backgroundColor : colToRGB[this.props.backgroundColor],}}/>
            </div>
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
            <div id = "footerApp">
                {this.listColor.map((color, id) => (<Color backgroundColor = {color}
                                                           isActive = {color === this.state.activeColor}
                                                           activateCircle = {this.activateCircle}
                                                           key = {id}/>))}
            </div>
        )
    }
}

export default ChooseColor
