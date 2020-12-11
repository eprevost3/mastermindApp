import React from 'react'
import {connect} from 'react-redux'
import CustomizedButton from '../../other/Button'
import Title from './Title'
import translations from '../translations'
import "./WelcomeScreen.css"

const Play = (props) => {
    return(
        <div id = "play">
            <CustomizedButton image = "play"
                              relativeImageSize = {.2}
                              onClick = {() => props.changeView('gameInterface')}
                              title = {translations[props.language]["play"]}
                              overWriteDefaultCss = {{height : "12vh", width : "12vh"}}/>
        </div>
    )
}


class WelcomeScreen extends React.Component{
    changeLanguage = () =>  {
        var action = {type : this.props.language}

        this.props.dispatch(action)
    }

    changeLevel = (direction) => {
        const action = {type : direction, value : this.props.difficulty}
        this.props.dispatch(action)
    }


    render(){
        return(
            <div id = "imageWelcome">
                <div id = "headerApp">
                    <CustomizedButton image = "question"
                                         onClick = {() => {this.props.changeView("helpScreen")}}
                                         title = {translations[this.props.language]["help"]}
                                         overWriteDefaultCss = {{height : "7vh", width : "7vh"}}/>
                    <CustomizedButton image = {this.props.language}
                                         onClick = {this.changeLanguage}
                                         title = {translations[this.props.language]["changeLanguage"]}
                                         overWriteDefaultCss = {{height : "7vh", width : "7vh"}}/>
                </div>

                <div id = "bodyApp">
                    <div className = "padding"></div>

                    <Title/>

                    <div className = "padding"></div>

                    <div id = "chooseDifficulty">
                        <CustomizedButton image = "left"
                                             onClick = {() => {this.changeLevel("left")}}
                                             title = {translations[this.props.language]["changeLevel"]}
                                             overWriteDefaultCss = {{height : "7vh", width : "7vh"}}/>


                        <p id = "textDifficulty">
                            {translations[this.props.language].difficulty[this.props.difficulty]}
                        </p>

                        <CustomizedButton image = "right"
                                             onClick = {() => {this.changeLevel("right")}}
                                             title = {translations[this.props.language]["changeLevel"]}
                                             overWriteDefaultCss = {{height : "7vh", width : "7vh"}}/>

                    </div>

                    <div className = "padding"></div>

                    <Play changeView = {this.props.changeView} language = {this.props.language}/>

                    <div className = "padding"></div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {return({language : state.reducerLanguage.language,
                                            difficulty : state.setDifficulty.difficulty})}

export default connect(mapStateToProps)(WelcomeScreen)
