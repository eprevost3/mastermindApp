import React from "react"
import translations from '../translations'
import text from './text'
import './Step.css'

// bloc of text, image which represents a step of the game
const Step = ({id, language, imageSource}) => {
    // define the style of the text and the image: there is either text or
    // image, but not both
    let component
    if (imageSource !== undefined){
        component = <img src = {imageSource} id = "imageHelp"/>
    }
    else{component  = <div id = "text">{text[language][id].text}</div>}

    return(
        <div id = "stepApp">
            <div id = "headApp">
                <p id = "headNumberApp">{id + 1}</p>
                <p id = "headTextApp">{text[language][id].title}</p>
            </div>

            <div id = "contentApp">
                {component}
            </div>
        </div>
    )
}

export default Step
