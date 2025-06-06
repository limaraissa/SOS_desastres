import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.post('/perguntar', (req, res) => {
    const pergunta = req.body.pergunta.toLowerCase();
    let resposta = 'Desculpe, não entendi sua pergunta.';

    if (pergunta.includes('enchente')){
        resposta = 'Em caso de enchente, evite áreas alagadas e busque locais altos e seguros.';
    } else if (pergunta.includes('deslizamento')) {
        resposta = 'Se notar rachaduras nas paredes ou no solo, saia imediatamente e acione a Defesa Civil (199).';
    } else if (pergunta.includes('terremoto')) {
        resposta = 'Durante um terremoto, proteja-se sob móveis resistentes e afaste-se de janelas.';
    } else if (pergunta.includes('incêndio')) {
        resposta = 'Em caso de incêndio, evacue imediatamente e chame os bombeiros (193).';
    } else {
        resposta = 'Siga sempre as orientações da Defesa Civil e dos órgãos oficiais.';
    }

    res.json({ resposta });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
