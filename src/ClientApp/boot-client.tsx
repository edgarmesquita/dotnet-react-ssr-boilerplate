import "@babel/polyfill";
import "custom-event-polyfill";

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import configureStore from './configureStore';
import { ApplicationState }  from './store';
import * as RoutesModule from './routes';
let routes = RoutesModule.routes;

import "./css/styles.css";
import 'react-toastify/dist/ReactToastify.css';
import Globals from "./Globals";
import { isNode } from './utils';
import { IPublicSession } from "./models/IPublicSession";
import { IPrivateSession } from "./models/IPrivateSession";

import './i18n';

if (!isNode()) {
    Globals.reset();
    Globals.init({
        culture: window.document.documentElement.lang,
        public: window["publicSession"] as IPublicSession,
        private: {} as IPrivateSession,
        model: window["model"]
    });
}

document.addEventListener('DOMContentLoaded', () => {
    var preloader = document.getElementById("preloader");
    preloader.classList.add("hidden");
});

// Create browser history to use in the Redux store
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href')!;
const history = createBrowserHistory({ basename: baseUrl });

// Get the application-wide store instance, prepopulating with state from the server where available.
const initialState = (window as any).initialReduxState as ApplicationState;
const store = configureStore(history, initialState);

function renderApp() {
    // This code starts up the React app when it runs in a browser. It sets up the routing configuration
    // and injects the app into a DOM element.
    ReactDOM.hydrate(
        <AppContainer>
            <Provider store={ store }>
                <ConnectedRouter history={ history } children={ routes } />
            </Provider>
        </AppContainer>,
        document.getElementById('react-app')
    );
}

renderApp();

// Allow Hot Module Replacement
if (module.hot) {
    module.hot.accept('./routes', () => {
        routes = require<typeof RoutesModule>('./routes').routes;
        renderApp();
    });
}
