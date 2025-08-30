import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

async function migrateMascotas() {
    const uri = `mongodb+srv://${process.env.USER_DB}:${process.env.PASS_DB}@${process.env.SERVER_DB}/?retryWrites=true&w=majority`;
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("Conectado a MongoDB ✅");

        const dbOrigen = client.db("mascotas");   // Base de datos origen
        const dbDestino = client.db(process.env.DB_NAME || "adopcion"); // Base destino

        const colOrigen = dbOrigen.collection("mascotas");
        const colDestino = dbDestino.collection("mascotas");

        const docs = await colOrigen.find({}).toArray();

        if (docs.length === 0) {
            console.log("No hay documentos para migrar");
            return;
        }

        const result = await colDestino.insertMany(docs);
        console.log(`Se migraron ${result.insertedCount} mascotas a la base ${dbDestino.databaseName}`);
        
    } catch (e) {
        console.error("Error durante la migración:", e);
    } finally {
        await client.close();
        console.log("Conexión cerrada 🔒");
    }
}

migrateMascotas();
