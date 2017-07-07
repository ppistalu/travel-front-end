import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import store from './Store'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Home from './Routes/Home'
injectTapEventPlugin();

ReactDOM.render(<Provider store={store}>
		<MuiThemeProvider>
			<Router>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/route" component={App} />
				</Switch>
			</Router>
		</MuiThemeProvider>
	</Provider>,
	document.getElementById('root')
);
registerServiceWorker();




