export const changeCenter = (state={},action) => {
	switch(action.type){
		case('changeCenter'):
			let newState = {...state}
			newState['lat'] = action.lat;
			newState['lng'] = action.lng;
			return newState;
		default: 
			return state;
	}
}