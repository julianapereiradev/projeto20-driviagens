export function notFoundError(entity) {
	return {
		type: "NotFoundError",
		message: `"${entity}" no banco!`
	};
}

export function conflictError(element) {
	return {
	  type: "ConflictError",
	  message: `${element ? element : "It"} já existe!`
	}
  }