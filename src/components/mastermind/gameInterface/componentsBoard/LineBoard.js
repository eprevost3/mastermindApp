import React from 'react'
import Tick from './Tick'
import "./LineBoard.css"

const Results = (props) => {
    var colors = props.colorPegs[props.id]

    return(
        <div id = "blocResults">
            <div className = "padding">
            </div>

            <div id = "lineResult">
                <div className = "res" style = {{backgroundColor : colors[0]}}>
                </div>

                <div className = "res" style = {{backgroundColor : colors[1]}}>
                </div>
            </div>

            <div id = "lineResult">
                <div className = "res" style = {{backgroundColor : colors[2]}}>
                </div>

                <div className = "res" style = {{backgroundColor : colors[3]}}>
                </div>
            </div>

            <div className = "padding">
            </div>
        </div>
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

    render(){
        var color = this.colToRGB[this.state.color]

        // if the user gives a color to a button then we want the animation to stop
        var flag = this.props.getActiveView() === "gameInterface"
        flag *=  this.props.isActive && (this.state.color === "grey")

        return(
            <div className = "containerCircles">
                <div className = {flag ? "circle blink" : "circle"}
                     onClick = {() => this.changeColor()}
                     style = {{backgroundColor : color}}/>
            </div>
        )
    }
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

        var button = this.props.isDisplayed ? <Tick onClick = {this.props.validate}
                                                    animateTick = {animateTick}
                                                    getActiveView = {this.props.getActiveView}
                                                    checkUserGuess = {this.props.checkUserGuess}/> : <div/>

        return(
            <div id = "line">
                <div id = "guesses">
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
                </div>

                <div id = "next">
                    {button}
                </div>

                <div id = "results">
                    <Results colorPegs = {this.props.colorPegs} id = {this.props.id}/>
                </div>
            </div>
        )
    }
}

export default LineBoard
