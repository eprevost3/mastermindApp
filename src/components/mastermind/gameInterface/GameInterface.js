import React from 'react'
import {connect} from 'react-redux'
import Button from '../../other/Button'
// import ChooseColor from './componentsFooter/ChooseColor'
// import LineBoard from './componentsBoard/LineBoard'
import translations from '../translations'
import GameLogic from './componentsBoard/gameLogic'
import "./GameInterface.css"

class GameInterface extends React.Component{
    constructor(props){
        super(props)
        this.activeColor = "green"

        // describes how many lines we have depending on the difficulty Level
        // key : difficulty level. 0 is easy, 1 medium, 2 hard
        this.nbLines = {0: 7, 1: 6, 2: 5}
        this.maxTries = this.nbLines[this.props.difficulty]

        // game logic
        this.gameLogic = new GameLogic()

        // array containing the user guess
        this.userGuess = {0: undefined, 1: undefined, 2: undefined, 3: undefined}

        // colors of the right pegs indicating if hte user got some right guess or not
        this.colorPegs = this.initPegDict()

        this.state = {lineDisplayed : this.initArrayLinesDisplayed()}

        this.colorCircles = this.initCircleColors()

    }

    // returns the color used to fill the circles
    getActiveColor = () => {return(this.activeColor)}
    // changes the color we use to fill in the circles
    setActiveColor = (color) => {this.activeColor = color}
    // goes back to zero: the user can input a complete new combination
    reinitUserGuess = () => {this.userGuess = {0: undefined, 1: undefined, 2: undefined, 3: undefined}}
    // when the user chooses to fill a circle with a specific color, this function updates the
    // corresponding objects
    updateUserGuess = (idx, value) => {this.userGuess[idx] = value}


    checkUserGuess = () => {
        var allPegsFilled = (this.userGuess[0] !== undefined) * (this.userGuess[1] !== undefined) * (this.userGuess[2] !== undefined) * (this.userGuess[3] !== undefined)

        return(allPegsFilled)
    }

    // creates a dictionary containing all the colors of the different circles
    // not used as much as it should be, but it would involve too much code change
    initCircleColors = () => {
        var colorCircles = {}

        for (var line = 0; line < this.maxTries; line ++){
            colorCircles[line] = {0 : 'grey', 1 : 'grey', 2 : 'grey', 3 : 'grey'}
        }
        return colorCircles
    }

    // when hitting the reset button the game is reinintialized. However we are
    // asking the user for confirmation just to make sure it's not a mistake
    reinitGameWithWarning = () => {
        alert(translations[this.props.language].restart)

        // reset the game
        this.reinitGame()
        }

    // reset the game board
    reinitGame = () => {
        // dictionary containing all the colors of the different circles of the board
        this.colorCircles = this.initCircleColors()

        this.gameLogic.setHiddenPattern()

        // array containing the user guess
        this.reinitUserGuess()

        // quality how user guess : how many pegs were guessed correctly, how many were placed
        // correctly, how many not etc.
        this.result = []

        // colors of the right pegs indicating if hte user got some right guess or not
        this.colorPegs = this.initPegDict()

        this.setState({lineDisplayed : this.initArrayLinesDisplayed()})
    }

    // once a line is completed a user can validate the line  to get the result
    // and get to the next line
    validate = () => {
        // retrieve the user guess, double check all buttons have a color
        var flag = this.checkUserGuess()

        // if not all pegs have been filled then we can't move forward. THe user has to fill everything
        if (!flag){
            alert(translations[this.props.language].notAllFilled)

            // prevents the code below from executing
            return
        }
        else{}

        // check the score
        this.result = this.gameLogic.checkUserGuess(this.userGuess)

        var win = this.gameLogic.checkIfWin(this.result)

        if (win){
            alert(translations[this.props.language].win)

            // going back to the welcomeScreen
            this.props.changeView("welcomeScreen")
        }
        else{
            // reinintialize the list of the user guesses (since new line)
            this.reinitUserGuess()

            // change the active line ie, the line on which we can change the colors
            var [indexNewLine, newLineDisplayedArr] = this.changeActiveLine()

            // update the right pegs to indicate to the user the quality of his assessment
            // (the column containing the black circles)
            this.getQualityOfGuess(indexNewLine - 1)

            // check if the user has used all the allowed tries, user has lost
            if(indexNewLine === this.maxTries){
                var lang = this.props.language

                // displaying the solution to the user
                var dic = translations[lang].colors, solution = this.gameLogic.hiddenPattern
                var sol = `${translations[lang].solution}${dic[solution[0]]}, ${dic[solution[1]]}, ${dic[solution[2]]}, ${dic[solution[3]]}`

                alert(translations[lang].loss + "\n" + sol)
                this.props.changeView("welcomeScreen")
            }
            else{this.setState({lineDisplayed : newLineDisplayedArr})}
        }
    }

    // indicates which line of buttons can be modified
    changeActiveLine = () => {
        // change the active line
        var indexActiveLine = 0
        while (!this.state.lineDisplayed[indexActiveLine]){indexActiveLine++}

        // copy the array containing each line's state and change the active line
        var newLineDisplayed = this.state.lineDisplayed.slice()

        if (indexActiveLine + 1 < this.maxTries){
            newLineDisplayed[indexActiveLine] = false
            newLineDisplayed[indexActiveLine + 1] = true
        }
        return([indexActiveLine + 1, newLineDisplayed])
    }

    // dictionary of dictionaries. Each of the latter represents the color of
    // every one of the 4 small pegs on the right. The latter indicates if the
    // user got a good guess or a bad one
    initPegDict(){
        var dict = {}
        for (var k = 0; k < this.maxTries; k ++){dict[k] = {0 : "black", 1 : "black", 2 : "black", 3 : "black",}}
        return dict
    }

    // returns an array indicating which lines are displayed
    initArrayLinesDisplayed = () => {
        var arr = [true], nbLines = this.nbLines[this.props.difficulty]

        for(var k = 1; k < nbLines; k++){arr.push(false)}
        return(arr)
    }

    // assess how many circles have the right color / how many colors are correct
    getQualityOfGuess = (key) => {
        var nbTwos = this.result.filter(x => x === 2).length
        var nbOnes = this.result.filter(x => x === 1).length

        var k = 0
        for (var k = 0; k < nbTwos; k++){this.colorPegs[key][k] = "red"}
        for (var k = nbTwos; k < nbOnes + nbTwos; k++){this.colorPegs[key][k] = "white"}
    }

    // sets up a warning before going back to the welcome screen
    goHome = () => {
        var flag = window.confirm(translations[this.props.language].goHome)

        if (flag) {this.props.changeView("welcomeScreen")}
        else{}
    }

    // set up a message before going to the help screen (because the game is reset
    // when leaving the screen
    goHelp = () => {
        var flag = window.confirm(translations[this.props.language].goHelp)

        if (flag) {this.props.changeView("helpScreen")}
        else{}
    }

    render(){
        return(
            <div id = "mainView">
                <div id = "imageApp">
                    <div id = "headerApp">
                        <Button image = "question"
                                onClick = {this.goHelp}
                                alt = ""
                                title = ""
                                overWriteDefaultCss = {{height : "7vh", width : "7vh"}}/>
                        <Button image = "home"
                                onClick = {this.goHome}
                                alt = ""
                                title = ""
                                overWriteDefaultCss = {{height : "7vh", width : "7vh"}}/>
                        <Button image = "reset"
                                onClick = {this.reinitGameWithWarning}
                                alt = ""
                                title = ""
                                overWriteDefaultCss = {{height : "7vh", width : "7vh"}}/>
                    </div>

                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {return({language : state.reducerLanguage.language,
                                            difficulty : state.setDifficulty.difficulty,})}

export default connect(mapStateToProps)(GameInterface)


//
//
// <div style={styles.board}>
//     <ImageBackground source = {require("../img/woodDark.png")} style = {styles.image}>
//         {this.state.lineDisplayed.map((isDisp, id) => (
//             <LineBoard getActiveColor = {this.getActiveColor}
//                        isDisplayed = {isDisp}
//                        key = {id}
//                        id = {id}
//                        validate = {this.validate}
//                        updateUserGuess = {this.updateUserGuess}
//                        colorPegs = {this.colorPegs}
//                        colorCircles = {this.colorCircles}
//                        getActiveView = {this.props.getActiveView}
//                        checkUserGuess = {this.checkUserGuess}
//                        />
//         ))}
//     </ImageBackground>
// </div>
//
//
// <div style={styles.footer}>
//     <ChooseColor getActiveColor = {this.getActiveColor} setActiveColor = {this.setActiveColor}/>
// </div>
