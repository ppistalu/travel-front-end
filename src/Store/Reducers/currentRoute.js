export const currentRoute = (state={},action) => {
	switch(action.type){
		case('set'):
			let newState = {...state}
			action.currentRoute.forEach(route => newState[route.id] = route )
			return newState;
			console.log(newState);
		default: 
			return state;
	}
}