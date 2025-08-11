const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const textoResultado = document.querySelector(".texto-resultado");
const telaInicial = document.querySelector(".tela-inicial");
const telaQuiz = document.querySelector(".tela-quiz");
const inputNome = document.querySelector("#nomeJogador");
const botaoIniciar = document.querySelector("#botaoIniciar");
const tituloQuiz = document.querySelector("#tituloQuiz");

let nomeJogador = "";
let atual = 0;
let historiaFinal = "";
let escolhas = { popular: 0, artistico: 0, autentico: 0 };

const perguntas = [
    {
        enunciado: "🎵 Qual será o gênero principal da sua primeira música?",
        alternativas: [
            { texto: "Pop moderno com batidas eletrônicas.", tipo: "popular" },
            { texto: "MPB com letras profundas.", tipo: "artistico" },
            { texto: "Trap com letras polêmicas.", tipo: "autentico" }
        ]
    },
    {
        enunciado: "📜 Qual será o tema da letra?",
        alternativas: [
            { texto: "Amor jovem e momentos felizes.", tipo: "popular" },
            { texto: "Superação e autoestima.", tipo: "artistico" },
            { texto: "Críticas sociais e reflexões.", tipo: "autentico" }
        ]
    },
    {
        enunciado: "🎧 Quem será seu parceiro musical?",
        alternativas: [
            { texto: "Produtor famoso.", tipo: "popular" },
            { texto: "Amigo talentoso, mas desconhecido.", tipo: "artistico" },
            { texto: "Você mesmo! Produção independente.", tipo: "autentico" }
        ]
    },
    {
        enunciado: "🎥 Como será o clipe?",
        alternativas: [
            { texto: "Efeitos visuais e coreografia.", tipo: "popular" },
            { texto: "História emocional e simples.", tipo: "artistico" },
            { texto: "Gravado nas ruas da cidade.", tipo: "autentico" }
        ]
    },
    {
        enunciado: "🚀 Como será o lançamento?",
        alternativas: [
            { texto: "Campanha viral com influenciadores.", tipo: "popular" },
            { texto: "Lançamento discreto no streaming.", tipo: "artistico" },
            { texto: "Live com amigos e compartilhamento.", tipo: "autentico" }
        ]
    },
    {
        enunciado: "🏆 Onde você quer se apresentar primeiro?",
        alternativas: [
            { texto: "Grande festival internacional.", tipo: "popular" },
            { texto: "Teatro local com público selecionado.", tipo: "artistico" },
            { texto: "Evento comunitário gratuito.", tipo: "autentico" }
        ]
    }
];

botaoIniciar.addEventListener("click", () => {
    nomeJogador = inputNome.value.trim();
    if (nomeJogador === "") {
        alert("Digite seu nome para começar!");
        return;
    }
    telaInicial.style.display = "none";
    telaQuiz.style.display = "block";
    tituloQuiz.textContent = `🎶 ${nomeJogador}, decida o futuro da sua música 🎤`;
    mostraPergunta();
});

function mostraPergunta() {
    if (atual >= perguntas.length) {
        mostraResultado();
        return;
    }
    const perguntaAtual = perguntas[atual];
    caixaPerguntas.textContent = perguntaAtual.enunciado;
    caixaAlternativas.innerHTML = "";
    textoResultado.textContent = "";
    perguntaAtual.alternativas.forEach(alternativa => {
        const botao = document.createElement("button");
        botao.textContent = alternativa.texto;
        botao.addEventListener("click", () => respostaSelecionada(alternativa));
        caixaAlternativas.appendChild(botao);
    });
}

function respostaSelecionada(alternativa) {
    escolhas[alternativa.tipo]++;
    historiaFinal += `${nomeJogador} escolheu: ${alternativa.texto}. `;
    atual++;
    mostraPergunta();
}

function mostraResultado() {
    caixaPerguntas.textContent = "Resultado Final da Sua Carreira Musical";
    caixaAlternativas.innerHTML = "";

    let final = "";
    if (escolhas.popular > escolhas.artistico && escolhas.popular > escolhas.autentico) {
        final = `🎉 ${nomeJogador}, sua música se tornou um fenômeno pop! Milhões de views e fãs pelo mundo todo.`;
    } else if (escolhas.artistico > escolhas.popular && escolhas.artistico > escolhas.autentico) {
        final = `🎨 ${nomeJogador}, você conquistou respeito e prestígio como artista, com letras profundas e shows intimistas.`;
    } else {
        final = `🔥 ${nomeJogador}, você se tornou um símbolo de autenticidade, conectando-se com as pessoas de forma única.`;
    }

    textoResultado.textContent = historiaFinal + " " + final;

    // Criar botão Tentar Novamente
    const botaoReiniciar = document.createElement("button");
    botaoReiniciar.textContent = "Tentar Novamente";
    botaoReiniciar.style.marginTop = "20px";
    botaoReiniciar.addEventListener("click", reiniciarQuiz);

    caixaAlternativas.appendChild(botaoReiniciar);
}

function reiniciarQuiz() {
    atual = 0;
    historiaFinal = "";
    escolhas = { popular: 0, artistico: 0, autentico: 0 };
    textoResultado.textContent = "";
    caixaAlternativas.innerHTML = "";
    telaQuiz.style.display = "none";
    telaInicial.style.display = "block";
    inputNome.value = "";
}
