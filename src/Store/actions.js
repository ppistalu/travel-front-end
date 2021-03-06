export const fetchRoutes = () => (dispatch,getState) => {
	fetch('https://travel-rts.herokuapp.com/home')
	.then((res) => res.json())
	.then(routes => dispatch(addRoutes(routes)))
}

const addRoutes = (routes) => ({
	type: 'add',
	routes
})

export const fetchSelectedRoute = (id) => (dispatch, getState) => {
	fetch(`https://travel-rts.herokuapp.com/routes/${id}`)
	.then((res) => res.json())
	.then(route => dispatch(setCurrentRoute(route)))
}

const setCurrentRoute = (currentRoute) => ({
	type: 'set',
	currentRoute
})

export const changeCenter = (lat,lng) => ({
	type:'changeCenter',
	lat,
	lng,

})

export const fetchCurrentRouteInfo = (id) => (dispatch, getState) => {
	fetch(`https://travel-rts.herokuapp.com/home/inforoute/${id}`)
	.then((res) => res.json())
	.then(route => dispatch(currentRouteInfo(route)))
}

const currentRouteInfo = (currentRouteInfo) => ({
	type: "currentRouteInfo",
	currentRouteInfo,
})

export const userCurrentPosition = (userCurrentPosition) => ({
	type: "userCurrentPosition",
	userCurrentPosition,
})