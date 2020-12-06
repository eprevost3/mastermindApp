const defaultState = {language : 'fr'}

const reducerLanguage = (state = defaultState, action) => {
    let nextState

    switch (action.type) {
        case 'fr':
            nextState = {language : 'us'}
            return(nextState || state)

        case 'us':
            nextState = {language : 'fr'}
            return(nextState || state)

        default:
            return state
    }

}

export default reducerLanguage
