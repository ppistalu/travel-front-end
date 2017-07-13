export const currentPosition = (state={},action) => {
	switch(action.type){
		case('userCurrentPosition'):
			let newState = {...action.userCurrentPosition};
			return newState;
		default: 
			return state;
	}
}