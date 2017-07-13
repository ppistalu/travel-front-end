export const currentPosition = (state={},action) => {
	console.log('in da reducer');
	console.log(action)
	switch(action.type){
		case('userCurrentPosition'):
			let newState = {...action.userCurrentPosition}
			return newState;
		default: 
			return state;
	}
}