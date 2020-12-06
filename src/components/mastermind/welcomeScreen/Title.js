import React from 'react'
import {connect} from 'react-redux'
import "./Title.css"

const Title = (props) => {
    return(
        <div id = "titleApp">
            <div id = "paddingTitle"></div>

            <div id = "displayTitle" onClick = {() => {}}>
                <p id = "valueTitle">Mastermind</p>
            </div>

            <div id = "paddingTitle"></div>
        </div>
    )
}


const mapStateToProps = (state) => {return({language : state.reducerLanguage.language,})}

export default connect(mapStateToProps)(Title)
