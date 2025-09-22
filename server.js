import express from "express";
import dotenv from "dotenv";
import modsDeJogoRoute from "./src/routes/modsDeJogosRoute.js";

const app = express();
app.use(express.json());

dotenv.config();
const serverPort = process.env.PORT || 4005;

app.get("/", (req,res)=> {
    res.send("servidor funcionando")
});

app.use("/mods", modsDeJogoRoute);


app.listen(serverPort, () => {
    console.log(`servidor rodando em http://localhost:${serverPort}`);
});