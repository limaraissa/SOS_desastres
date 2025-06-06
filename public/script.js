const mensagensDiv = document.getElementById('mensagens');

function adicionarMensagem(texto, classe) {
    const div = document.createElement('div');
    div.className = classe;
    div.textContent = texto;
    mensagensDiv.appendChild(div);
    mensagensDiv.scrollTop = mensagensDiv.scrollHeight;
}

async function enviar() {
    const input = document.getElementById('input');
    const texto = input.value.trim();
    if (!texto) return;

    adicionarMensagem('Você: ' + texto, 'user');
    input.value = '';

    adicionarMensagem('Digitando...', 'bot');

    try {
        const response = await fetch('/perguntar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pergunta: texto })
        });

        const data = await response.json();

        const digitando = document.querySelector('.bot:last-child');
        if (digitando && digitando.textContent === 'Digitando...') {
            digitando.remove();
        }

        adicionarMensagem('Bot: ' + data.resposta, 'bot');
    } catch (error) {
        console.error(error);
        adicionarMensagem('Erro ao obter resposta.', 'bot');
    }
}

document.getElementById('input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        enviar();
    }
});
