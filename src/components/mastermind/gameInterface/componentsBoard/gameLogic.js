class GameLogic{
    constructor(props){
        this.colors = ["red", "blue", "green", "purple", "black"]
        this.hiddenPattern = []

        this.setHiddenPattern()
    }

    // setting the pattern to discover
    setHiddenPattern = () => {
        var nbColors = this.colors.length
        var hiddenPattern = []

        for(var k = 0; k < 4; k++){
            var idx = Math.floor(Math.random() * nbColors)

            // choosing randomly a color
            hiddenPattern.push(this.colors[idx])
        }
        this.hiddenPattern = hiddenPattern
    }


    // check if the prediction made by the user is right or not
    checkUserGuess = (userGuess) => {
        let colorToFind, colorUser
        var misplacedColor = [], unfoundColor = []

        // array assessing the quality of the user guess
        var result = []

        for(var idx = 0; idx < 4; idx ++){
            colorToFind = this.hiddenPattern[idx]
            colorUser = userGuess[idx]

            // compare user color to the hidden color chosen
            if (colorToFind === colorUser){
                // 2 means right color at the right place
                result.push(2)
            }else{
                misplacedColor.push(colorUser)
                unfoundColor.push(colorToFind)
            }
        }

        // now let's check if some colors were guessed correctly but wrongly placed
        for (var k = 0; k < misplacedColor.length; k++){
            var colorFound = unfoundColor.findIndex((elt) => (elt === misplacedColor[k]))

            // the color guess is right, just misplaced
            if (colorFound !== -1){
                // 1 means color correctly guess but at wrong location
                result.push(1)

                // let's update the array of colors to find: because say there is
                // one red pawn to guess but user entered 4 red pawns, we don't want
                // to validate all 4
                unfoundColor[colorFound] = undefined
            }else{}
        }

        return(result)
    }

    // check if the player won
    checkIfWin = (arr) => {
        // if all elements of the array are equal to two then we won
        var filt = arr.filter((elt) => elt === 2)

        let win
        if (filt.length === 4){win = true}
        else(win = false)

        return(win)
    }

}

export default GameLogic
