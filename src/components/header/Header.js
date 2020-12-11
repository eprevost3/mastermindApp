import React from 'react'
import './Header.css'
import Button from '../other/Button'
import {connect} from 'react-redux'
import translations from '../lang/translations'


const Header = ({language, dispatch}) => {
    function changeLang(){
        const action = {
            type : language
        }
        dispatch(action)
    }

    return(
        <div id="header">
            <Button id='home'
                    image = 'home'
                    alt = 'Flag'
                    title = {translations[language].titleHome}
                    onClick = {()=>{window.location.href = 'https://eprevost3.github.io/homepage/'}}/>

                <div id="title">
                    <p>{translations[language].welcome0}
                    <a href = "https://play.google.com/store/apps/details?id=com.pseuhhcorp.mastermind" target = "_blank" rel="noopener noreferrer">Play Store</a>
                    {translations[language].welcome1}</p>
                </div>

            <Button id='lang'
                    image = {translations[language].image}
                    alt = 'Flag'
                    title = {translations[language].titleFlag}
                    onClick = {changeLang}/>
        </div>
        )
    }

const mapStateToProps = (stateRedux) => {return({language : stateRedux.reducerLanguage.language})}

export default connect(mapStateToProps)(Header)
