import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mascotasRoutes from "./routes/mascotas.js";
import dbClient from "./config/dbClient.js";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors()); 
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/mascotas", mascotasRoutes);

const PORT = process.env.PORT || 3000;

dbClient.conectarBD().then(() => {
    app.listen(PORT, () => console.log(`Servidor activo en puerto ${PORT}`));
});
