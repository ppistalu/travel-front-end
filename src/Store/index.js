import {routes} from './Reducers/routes';
import {currentRouteInfo} from './Reducers/currentRouteInfo';
import {currentRoute} from './Reducers/currentRoute';
import {changeCenter} from './Reducers/mapCenter';
import {currentPosition} from './Reducers/currentPosition'
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';


const reducer = combineReducers({
	routes,
	currentRoute,
	changeCenter,
	currentRouteInfo,
	currentPosition,
})

const store = createStore(reducer,
	applyMiddleware(thunk)
	);

export default store;