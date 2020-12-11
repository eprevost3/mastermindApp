        // key : difficulty level. 0 is easy, 1 medium, 2 hard
const defaultState = {difficulty : 1}


const setDifficulty = (state = defaultState, action) => {
    let newDifficulty, diff, newState
    switch (action.type) {
        case "left":
            diff = action.value

            // if  we have reached the mininimum level and the user is pressing
            // left again then we go to the most difficult level
            if (diff > 0){newDifficulty = diff - 1}
            else{newDifficulty = 2}

            newState = {difficulty : newDifficulty}

            return(newState || state)

        case "right":
            diff = action.value

            if (diff < 2){newDifficulty = diff + 1}
            else{newDifficulty = 0}

            newState = {difficulty : newDifficulty}

            return(newState || state)

        default : return(state)
    }
}

export default setDifficulty
