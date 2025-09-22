import dados from "../models/dados.js";
import express from "express"
const { mods } = dados;



const getAllMods = (req, res) => {

    const app = express();
    app.use(express.json());
    
    res.status(200).json({
        total: mods.length,
        mods: mods
    })

    app.get("/mods/jogo/:jogo", (req, res) => {
    let jogo = req.params.jogo;
    jogo = jogo.toLowerCase();

    console.log(jogo);
    

    const jogosFiltrados = mods.filter(p => p.jogo.toLowerCase().includes(jogo))

    if(jogosFiltrados) {
        res.status(200).json(jogosFiltrados);
    } else {
        res.status(404).json({
            mensagem: "Jogo não encontrado!"
        })
    }
});
    
}


const getById = (req, res) => {
    let id = parseInt(req.params.id);

    const mod = mods.find(c => c.id === id);

    if (mod) {
        res.status(200).json({
            success: true,
            mod: mod
        })
    }

    res.status(400).json({
        success: false,
        message: "mod não encontrado"
    })
}

const createMod = (req, res) => {
    const { nomeMod, jogo, autor, versao, downloads, categoria, compatibilidade } = req.body;

    if (!nomeMod) {
        return res.status(400).json({
            success: false,
            message: "O campo 'nomeMod' é obrigatório para criar uma mod!"
        });
    }

    if (!jogo) {
        return res.status(400).json({
            success: false,
            message: "O campo 'jogo' é obrigatório!"
        });
    }

    if (!autor) {
        return res.status(400).json({
            success: false,
            message: `O campo 'autor' é obrigatório!`
        });
    }

    if (!downloads) {
        return res.status(400).json({
            success: false,
            message: "O campo 'downloads' é obrigatório para criar uma mod!"
        });
    }

    if (!versao) {
        return res.status(400).json({
            success: false,
            message: `O campo 'versao' é obrigatório!`
        });
    }

    if (!compatibilidade) {
        return res.status(400).json({
            success: false,
            message: "O campo 'compatibilidade' é obrigatório para criar uma mod!"
        });
    }



    const novoMod = {
        id: mods.length + 1,
        nomeMod,
        jogo,
        autor: autor.toLowerCase(),
        versao: versao.toLowerCase(),
        downloads,
        dataLancamento: new Date(),
        categoria,
        compatibilidade
    }

    mods.push(novoMod);
    res.status(201).json({
        success: true,
        message: "Mod criado com sucesso!",
        mod: novoMod
    })
}

const deleteMod = (req, res) => {
    let id = parseInt(req.params.id);
    const modParaRemover = mods.find(c => c.id === id);

    if (!modParaRemover) {
        return res.status(404).json({
            success: false,
            message: 'Este mod nao existe'
        })
    }
    const modsFiltrados = mods.filter(mod => mod.id !== id);
    mods.splice(0, mods.length, ...modsFiltrados);
    res.status(200).json({
        success: true,
        message: 'Mod deletado com sucesso!',
        modRemovido: modParaRemover
    })
}

const updateMods = (req, res) => {
    const id = parseInt(req.params.id);

    const {  jogo, versao, downloads, categoria, compatibilidade, dataUpdate } = req.body;


    if (isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: "O id deve ser um número válido"
        })
    }

    const modExiste = mods.find(mod => mod.id === id);

    if (!modExiste) {
        return res.status(400).json({
            success: false,
            message: "A mod não existe."
        })
    }

    if(downloads) {
        if (downloads <= 0) {
            return res.status(400).json({
                success: false,
                message: "O campo 'downloads' deve ser maior que 0!"
            });
        }
    }

    if(jogo){
        if (!jogo.includes(jogo.toLowerCase())) {
            return res.status(400).json({
                success: false,
                message: `O campo 'jogo' deve ser preenchido!!`
            });
        }
    }
    if(compatibilidade){
        if (!compatibilidade.includes(compatibilidade.toLowerCase())) {
            return res.status(400).json({
                success: false,
                message: `O campo 'compatibilidade' deve ser preenchido!!`
            });
        }
    }

    if(categoria){
        if (!categoria.includes(categoria.toLowerCase())) {
            return res.status(400).json({
                success: false,
                message: `O campo 'categoria' deve ser preenchido!`
            });
        } 
    }

    const modsAtualizados = mods.map(mod => {
        return mod.id === id
            ? {
                ...mod,
                ...(jogo      && { jogo }),
                ...(downloads    && { downloads }),
                ...(jogo  && { jogo }),
                ...(categoria      && { categoria }),
                ...(compatibilidade      && { compatibilidade }),
                ...(dataUpdate && new Date(dataUpdate) >= new Date() && { dataUpdate })
            }
            : mod;
    });
    
    mods.splice(0, mods.length, ...modsAtualizados);

    const modNovo = mods.find(mod => mod.id === id);

    res.status(200).json({
        success: true,
        message: "Dados atualizados com sucesso",
        mod: modNovo
    })

}

export { getAllMods, getById, createMod, deleteMod, updateMods };