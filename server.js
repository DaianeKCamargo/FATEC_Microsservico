const express = require("express");
const app = express();

app.use(express.json());

let pontos = [];
let pontosAprovados = [];


app.post("/pontos-coleta", (req, res) => {

    const novoPonto = {
        id: pontos.length + 1,
        nome: req.body.nome,
        endereco: req.body.endereco,
        cidade: req.body.cidade,
        status: "pendente"
    };

    pontos.push(novoPonto);

    res.json({
        mensagem: "Cadastro enviado para aprovação",
        ponto: novoPonto
    });

});

app.get("/admin/pontos-pendentes", (req, res) => {
    const pendentes = pontos.filter(p => p.status === "pendente");
    res.json(pendentes);
});


app.put("/admin/aprovar/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const ponto = pontos.find(p => p.id === id);

    if (!ponto) {
        return res.status(404).json({ erro: "Ponto não encontrado" });
    }

    ponto.status = "aprovado";
    pontosAprovados.push(ponto);

    res.json({
        mensagem: "Ponto aprovado com sucesso",
        ponto
    });

});


app.get("/pontos-coleta", (req, res) => {
    res.json(pontosAprovados);
});


app.get("/pontos-coleta/proximos", (req, res) => {

    const cidade = req.query.cidade;

    const resultados = pontosAprovados.filter(
        p => p.cidade.toLowerCase() === cidade.toLowerCase()
    );

    res.json(resultados);

});


app.listen(5500, () => {
    console.log("Microserviço rodando na porta 5500");
});