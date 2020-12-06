import './App.css';
import Header from "./components/header/Header"
import MastermindApp from "./components/mastermind/MastermindApp"
import imgPhone from "./img/samsung_phone.png"

function App() {
    return (
        <div className = "App">
            <Header/>

            <div id = "phone">
                <MastermindApp/>
            </div>

            <div id = "footer"/>
        </div>
        )
}
//Image by <a href="fhfttps://pixabay.com/users/prettysleepy1-2855492/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1497890">prettysleepy1</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1497890">Pixabay</a>
export default App;
