import cors from "cors";
import express from "express";
import { serve, setup } from "swagger-ui-express";
import swaggerConfig from "../config/swaggerConfig.js";
import routes from "./routes.js";
const app = express();
// Libera requisições de qualquer origem (Web e Mobile)
app.use(cors());
app.use(express.json());
app.use(routes);

app.use("/docs", serve, setup(swaggerConfig));

export default app;
