export const fetchRoutes = () => (dispatch,getState) => {
	let newState = {};
	//fetch('http://localhost:8080/home')
	fetch('https://travel-rts.herokuapp.com/home')
	.then((res) => res.json())
	.then(routes => dispatch(addRoutes(routes)))
}

const addRoutes = (routes) => ({
	type: 'add',
	routes
})