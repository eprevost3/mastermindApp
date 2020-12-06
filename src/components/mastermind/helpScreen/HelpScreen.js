import React from 'react';
import {connect} from 'react-redux'
import Button from '../../other/Button'
import Step from './Step'
import "./HelpScreen.css"
import translations from '../translations'

import firstMoveFr from "../img/1stMoveFr.png"
import seconddMoveFr from "../img/2ndMoveFr.png"
import firstMoveEn from "../img/1stMoveEn.png"
import secondMoveEn from "../img/2ndMoveEn.png"
import seventhMove from "../img/7thMove.png"
import victory from "../img/victory.png"

class HelpScreen extends React.Component{
    constructor(props){
        super(props)
        // # of the page
        this.state = {pageIndex : 0}
    }
    changeLanguage = () =>  {
        var action = {type : this.props.language}
        this.props.dispatch(action)
    }

    // display another documentation page
    changePage = (direction) => {
        if (direction === "left"){
            // making sure we can't get a negative page number
            this.setState({pageIndex : Math.max(0, this.state.pageIndex - 1)})
        }
        else if (direction === "right"){
            // making sure we can't go above a certain page number
            this.setState({pageIndex : Math.min(4, this.state.pageIndex + 1)})
        }else{}
    }

    render(){
        var imageSource = [undefined,
                            this.props.language === "fr" ? firstMoveFr: firstMoveEn,
                            undefined,
                            this.props.language === "fr" ? seconddMoveFr: secondMoveEn,
                            undefined,
                            seventhMove,
                            victory]

        return(
            <div id = "viewHelp">
                <div className = "headerHelp">
                    <Button image = "play"
                                      onClick = {() => this.props.changeView("gameInterface")}
                                      overWriteDefaultCss = {{height : "7vh", width : "7vh"}}/>
                    <Button image = "home"
                                      onClick = {() => this.props.changeView("welcomeScreen")}
                                      overWriteDefaultCss = {{height : "7vh", width : "7vh"}}/>
                    <Button image = {this.props.language}
                                      onClick = {this.changeLanguage}
                                      overWriteDefaultCss = {{height : "7vh", width : "7vh"}}/>
                </div>


                <Step id = {this.state.pageIndex}
                      language = {this.props.language}
                      imageSource = {imageSource[this.state.pageIndex]}/>

                <div className = "headerHelp">
                    <Button image = "left"
                                      onClick = {() => this.changePage("left")}
                                      overWriteDefaultCss = {{height : "7vh", width : "7vh"}}/>
                    <Button image = "right"
                                      onClick = {() => this.changePage("right")}
                                      overWriteDefaultCss = {{height : "7vh", width : "7vh"}}/>
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {return({language : state.reducerLanguage.language,})}

export default connect(mapStateToProps)(HelpScreen)
