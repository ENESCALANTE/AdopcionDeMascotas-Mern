import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

class DBClient {
    constructor() {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI no está definido en .env");
        }
        this.client = new MongoClient(process.env.MONGO_URI);
        this.db = null;
    }

    async conectarBD() {
        try {
            await this.client.connect();
            this.db = this.client.db(process.env.DB_NAME || 'test');
            console.log("Base de datos conectada ✅");
        } catch (e) {
            console.error("Error al conectar a la DB:", e);
        }
    }
}

export default new DBClient();

