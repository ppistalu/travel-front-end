import {routes} from './Reducers/routes';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';


const reducer = combineReducers({
	routes,
})

const store = createStore(reducer,
	applyMiddleware(thunk)
	);

export default store;