import './App.css';
import Header from "./components/header/Header"
import { Provider } from 'react-redux'
import MastermindApp from "./components/mastermind/MastermindApp"
import Store from './components/mastermind/store/store'

function App() {
    return (
        <Provider store = {Store}>
            <div className = "App">
                <Header/>

                <div id = "phone">
                    <MastermindApp/>
                </div>

                <div id = "footer">
                    <a id = "refBackground" href="https://pixabay.com/users/prettysleepy1-2855492/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1497890" target = "_blank" rel="noopener noreferrer">Image</a>
                </div>
            </div>
        </Provider>
    )
}
export default App;
