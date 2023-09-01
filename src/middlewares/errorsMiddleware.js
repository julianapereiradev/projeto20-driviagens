import httpStatus from "http-status";

export default function errorHandler(error, req, res, next) {
  console.log(error);

  if (error.type === "ConflictError") {
    return res.status(httpStatus.CONFLICT).send(error.message);
  }

  if (error.type === "NotFoundError") {
    return res.status(httpStatus.NOT_FOUND).send(error.message);
  }

  if (error.type === "BadRequestType") {
    return res.status(httpStatus.BAD_REQUEST).send(error.message);
  }

  if (error.type === "InternalServerError") {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }

  if (error.type === "UnprocessableEntity") {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(error.message);
  }

  return res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Desculpe, algo deu errado");
}