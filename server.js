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

 app.get("/mods/jogo/:jogo", (req, res) => {
    let jogo = req.params.jogo;
    jogo = jogo.toLowerCase();

    const jogosFiltrados = mods.filter(m => m.jogo.toLowerCase().includes(jogo))

    if(jogosFiltrados) {
        res.status(200).json(jogosFiltrados);
    } else {
        res.status(404).json({
            mensagem: "Jogo não encontrado!"
        })
    }
});

app.listen(serverPort, () => {
    console.log(`servidor rodando em http://localhost:${serverPort}`);
});