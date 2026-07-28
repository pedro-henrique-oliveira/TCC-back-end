import express  from 'express';
import cors from 'cors';
import routes from "./routes";
import swaggerConfig from '../config/swaggerConfig';
import { serve, setup } from 'swagger-ui-express';

// Inicializa o express
const app = express();

// Define regras do Servidor
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cors());

// Configura as rotas no servidor
app.use(routes);

app.use(
  "/docs",
  serve,
  setup(swaggerConfig),
);

export default app;