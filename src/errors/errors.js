export function notFoundError(entity) {
	return {
		type: "NotFoundError",
		message: `"${entity}" no banco!`
	};
}

export function conflictError(element) {
	return {
	  type: "ConflictError",
	  message: `${element ? element : "It"}`
	}
}

  export function badRequest(element) {
	return {
	  type: "BadRequestType",
	  message: `${element ? element : "It"}`
	}
}

export function internalServerError(element) {
	return {
	  type: "InternalServerError",
	  message: `${element ? element : "It"}`
	}
}

export function unprocessableEntity(element) {
	return {
	  type: "UnprocessableEntity",
	  message: `${element ? element : "It"}`
	}
}



