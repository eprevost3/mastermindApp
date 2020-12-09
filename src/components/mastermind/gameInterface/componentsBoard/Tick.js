import React from 'react'
import Button from '../../../other/Button'
import "./Tick.css"

class Tick extends React.Component{
    render(){
        return(
            <div id = "nextStep" className = {this.props.checkUserGuess() ? "tickBlink" : ""}>
                <Button image = "next"
                        onClick = {(this.props.onClick)}
                        overWriteDefaultCss = {{width : 'calc(.09 * 62vh)',
                                                height : 'calc(.09 * 62vh)'}}/>
            </div>
        )
    }
}



export default Tick
