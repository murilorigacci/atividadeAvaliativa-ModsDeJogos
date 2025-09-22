import dados from "../models/dados.js";
const { mods } = dados;



const getAllMods = (req, res) => {


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
    res.status(200).json({
        total: mods.length,
        mods: mods
    })


    app.get("/mods/categoria/:categoria", (req, res) => {
    let categoria = req.params.categoria;
    categoria = categoria.toLowerCase();

    const categoriasFiltradas = mods.filter(m => m.categoria.toLowerCase().includes(categoria))

    if(categoriasFiltradas) {
        res.status(200).json(categoriasFiltradas);
    } else {
        res.status(404).json({
            mensagem: "Categoria não encontrada!"
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



export { getAllMods, getById, createMod, deleteMod };