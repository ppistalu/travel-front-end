export const routes = (state={},action) => {
	switch(action.type){
		case('add'):
			let newState = {...state}
			action.routes.forEach(route => newState[route.id] = route )
			return newState;
		default: 
			return state;
	}
}

