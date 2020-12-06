import React from 'react'
import './Header.css'
import Button from '../other/Button'
//import {connect} from 'react-redux'
import translations from '../lang/translations'


const Header = ({lang, dispatch}) => {
    function changeLang(){
        const action = {
            type : lang
        }
        dispatch(action)
    }
    var lang = 'fr'
    return(
        <div id="header">
            <Button id='home' image = 'home' alt = 'Flag' title = {translations[lang].titleHome} onClick = {()=>{window.location.href = 'https://eprevost3.github.io/homepage/'}}/>
            <div id="title">{translations[lang].welcome}</div>
            <Button id='lang' image = {translations[lang].image} alt = 'Flag' title = {translations[lang].titleFlag} onClick = {changeLang}/>
        </div>
        )
    }

//const mapStateToProps = (stateRedux) => {return({lang : stateRedux.lang})}

//export default connect(mapStateToProps)(Header)
export default Header
