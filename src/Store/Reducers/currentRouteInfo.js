export const currentRouteInfo = (state={},action) => {
	switch(action.type){
		case('currentRouteInfo'):
			let newState = {...state}
			newState['currentRouteInfo'] = action.currentRouteInfo;
			return newState;
		default: 
			return state;
	}
}