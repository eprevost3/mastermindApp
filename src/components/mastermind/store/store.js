import {createStore, combineReducers} from 'redux'
import reducerLanguage from './reducer/reducerLanguage'
import setDifficulty from './reducer/setDifficulty'

export default createStore(combineReducers({reducerLanguage, setDifficulty}))
