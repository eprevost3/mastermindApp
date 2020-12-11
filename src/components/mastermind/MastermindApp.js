import React from 'react';
import GameInterface from './gameInterface/GameInterface'
import WelcomeScreen from './welcomeScreen/WelcomeScreen'
import HelpScreen from './helpScreen/HelpScreen'

export default class MastermindApp extends React.Component{
    constructor(props){
        super(props)

        this.state = {view : "welcomeScreen"}
    }

    // display another view
    changeView = (viewToDisplay) => {this.setState({view : viewToDisplay})}

    // indicate which view is being displayed
    getActiveView = () => {return(this.state.view)}

    render(){
        let component

        if (this.state.view === "welcomeScreen"){component = <WelcomeScreen changeView = {this.changeView}/>}
        else if (this.state.view === "gameInterface"){component = <GameInterface changeView = {this.changeView} getActiveView = {this.getActiveView}/>}
        else if (this.state.view === "helpScreen"){component = <HelpScreen changeView = {this.changeView}/>}
        else{}

        return(
            <div>
                {component}
            </div>
        )
    }
}
