import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {TeamsPage, RatesPage, AuthorizationPage, Blocks} from "./App";


import {Card} from "react-bootstrap";

import Authorization from "./Pages/Authorization";
import Section_Teams_International from "./Pages/Section_Teams_International";


function Render_Footer(props) {
    const Page = props.Page;
    if (Page == 'Rates') {
        return <RatesPage />;
    }
    return <TeamsPage />;
}





const Root_Rates = ReactDOM.createRoot(document.getElementById('Rates_container'));
Root_Rates.render(<RatesPage/>);

// const Root_Authoriztions = ReactDOM.createRoot(document.getElementById('authorization'));
// Root_Authoriztions.render(<Authorization/>);

const Root_Authoriztions = ReactDOM.createRoot(document.getElementById('authorization'));
Root_Authoriztions.render(<AuthorizationPage/>);

// const Root_Authoriztions_Form = ReactDOM.createRoot(document.getElementById('authorization'));
// Root_Authoriztions.render(<FormAuth/>);

// const Root_Section = ReactDOM.createRoot(document.getElementById('Section_Teams_International'));
// Root_Section.render(<Section_Teams_International/>);

const Root_Input = ReactDOM.createRoot(document.getElementById('InputField_container'));
Root_Input.render( <Render_Footer Page = 'Teams'/>);

const Root_time = ReactDOM.createRoot(document.getElementById('time_container'));
function tick() {
    const time_element = new Date().toLocaleTimeString();
    Root_time.render(time_element);
}
setInterval(tick, 500);


const Root_Blocks = ReactDOM.createRoot(document.getElementById('Blocks_container'));
Root_Blocks.render( <Blocks/>);





const Root = ReactDOM.createRoot (document.getElementById('root'));
Root.render(<App/>);





if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
        navigator.serviceWorker
            .register("/serviceWorker.js")
            .then(res => console.log("service worker registered"))
            .catch(err => console.log("service worker not registered", err))
    })
}



reportWebVitals();




