import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {RuleModalProvider} from "./utils/providers/RuleModalProvider";
import {DiscordProvider} from "./context/Discord";

const root = ReactDOM.createRoot(document.querySelector('body'));
root.render(
    <DiscordProvider>
        <BrowserRouter>
            <RuleModalProvider>
                <App/>
            </RuleModalProvider>
        </BrowserRouter>
    </DiscordProvider>
);

reportWebVitals();
