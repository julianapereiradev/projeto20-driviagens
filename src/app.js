import express from "express";
import "express-async-errors";
import errorHandler from "./middlewares/errorsMiddleware.js";
import cors from "cors";
import router from "./routers/indexRouter.js";
import dotenv from "dotenv"
dotenv.config()

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
app.use(errorHandler);


//PORT:
const port = process.env.PORT || 5000
app.listen(port, () => {
	console.log(`Servidor rodando na porta ${port}`)
})