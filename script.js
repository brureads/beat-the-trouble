

const perguntas = [
  {
    texto: "Alguém te provoca na rua. O que você faz?",
    opcoes: [
      "Começo uma briga!",
      "Vou embora como uma pessoa civilizada."
    ],
    correta: 1
  },
  {
    texto: "Seu colega diz que não fez o trabalho porque estava ocupado.",
    opcoes: [
      "Pergunto se ele estava ocupado respirando.",
      "Respiro fundo e resolvo a divisão de tarefas."
    ],
    correta: 1
  },
  {
    texto: "Um carro te fecha no trânsito.",
    opcoes: [
      "Inicio uma perseguição digna de Velozes e Furiosos.",
      "Respiro fundo e continuo dirigindo."
    ],
    correta: 1
  },
  {
    texto: "Seu crush visualiza sua mensagem e desaparece.",
    opcoes: [
      "Mando um TED Talk sobre responsabilidade afetiva.",
      "Vou viver minha vida porque tenho boletos."
    ],
    correta: 1
  },
  {
    texto: "Uma pessoa diz que HTML é linguagem de programação.",
    opcoes: [
      "Inicio uma palestra de quatro horas.",
      "Explico a diferença com educação."
    ],
    correta: 1
  },
  {
    texto: "Você está estudando e alguém pergunta se você já terminou.",
    opcoes: [
      "Respondo que terminei minha vontade de viver.",
      "Digo que ainda estou estudando."
    ],
    correta: 1
  },
  {
    texto: "Alguém fura a fila na sua frente.",
    opcoes: [
      "Começo um pronunciamento oficial à nação.",
      "Peço educadamente para respeitar a fila."
    ],
    correta: 1
  },
  {
    texto: "Seu código funciona, mas alguém diz que está feio.",
    opcoes: [
      "Pergunto se o código é candidato a modelo.",
      "Avalio se a crítica pode melhorar o projeto."
    ],
    correta: 1
  },
  {
    texto: "Seu professor anuncia um trabalho surpresa.",
    opcoes: [
      "Pergunto se a surpresa inclui minha transferência.",
      "Anoto o prazo e organizo minhas tarefas."
    ],
    correta: 1
  },
  {
    texto: "Alguém diz que você está exagerando.",
    opcoes: [
      "Preparo uma apresentação com 87 slides.",
      "Explico meu ponto de vista tranquilamente."
    ],
    correta: 1
  },
  {
    texto: "Seu computador trava antes de salvar o projeto.",
    opcoes: [
      "Considero abandonar a tecnologia e criar cabras.",
      "Verifico se existe recuperação automática."
    ],
    correta: 1
  },
  {
    texto: "Uma pessoa te manda 'precisamos conversar'.",
    opcoes: [
      "Escrevo meu testamento imediatamente.",
      "Pergunto sobre o assunto sem criar teorias."
    ],
    correta: 1
  },
  {
    texto: "Seu colega faz um git push direto na main.",
    opcoes: [
      "Solicito a abertura de um processo criminal.",
      "Explico o fluxo de branches e Pull Requests."
    ],
    correta: 1
  },
  {
    texto: "Alguém diz que você toma café demais.",
    opcoes: [
      "Digo que café é um direito constitucional.",
      "Agradeço a preocupação e sigo meu dia."
    ],
    correta: 1
  },
  {
    texto: "Uma pessoa tenta começar uma briga por absolutamente nada.",
    opcoes: [
      "Aceito porque hoje estou com tempo.",
      "Vou embora. Minha paz vale mais."
    ],
    correta: 1
  }
];


let nivel = 0;
let pontos = 0;

const pergunta = document.getElementById("pergunta");
const opcoes = document.getElementById("opcoes");
const resultado = document.getElementById("resultado");
const proximo = document.getElementById("proximo");
const iniciar = document.getElementById("iniciar");

const compartilhar = document.getElementById("compartilhar");


iniciar.addEventListener("click", () => {
  nivel = 0;
  pontos = 0;
  iniciar.classList.add("escondido");
  mostrarPergunta();

compartilhar.classList.add("escondido");

});


function mostrarPergunta() {
  const atual = perguntas[nivel];

  document.getElementById("nivel").textContent =
    `LEVEL ${String(nivel + 1).padStart(2, "0")}`;

document.getElementById("pontuacao").textContent =
  `★ ${pontos} PTS`;

document.getElementById("progresso").style.width =
  `${(nivel / perguntas.length) * 100}%`;


  pergunta.textContent = atual.texto;
  opcoes.innerHTML = "";
  resultado.textContent = "";
  proximo.classList.add("escondido");

  // Guarda cada alternativa com seu índice original
  const alternativas = atual.opcoes.map((texto, indice) => ({
    texto,
    indice
  }));

  // Embaralha as alternativas
  alternativas.sort(() => Math.random() - 0.5);

  alternativas.forEach(alternativa => {
    const botao = document.createElement("button");

    botao.textContent = alternativa.texto;

    botao.addEventListener("click", () => {
      verificarResposta(alternativa.indice);
    });

    opcoes.appendChild(botao);
  });
}


function verificarResposta(escolha) {
  const acertou = escolha === perguntas[nivel].correta;

  if (acertou) {
    pontos += 100;
    resultado.textContent = "★ PERFECT! +100 POINTS";
  } else {
    resultado.textContent = "GAME TIP: WALK AWAY!";
  }

document.getElementById("pontuacao").textContent =
  `★ ${pontos} PTS`;

document.getElementById("progresso").style.width =
  `${((nivel + 1) / perguntas.length) * 100}%`;

  opcoes.querySelectorAll("button").forEach(botao => {
    botao.disabled = true;
  });

  proximo.classList.remove("escondido");
}

proximo.addEventListener("click", () => {
  nivel++;

  if (nivel < perguntas.length) {
    mostrarPergunta();
  } else {
    finalizarJogo();
  }
});



function finalizarJogo() {
  const maximo = perguntas.length * 100;
  const porcentagem = (pontos / maximo) * 100;

  let titulo;
  let mensagem;

compartilhar.classList.remove("escondido");


  if (porcentagem === 100) {
    titulo = "MONGE DO AUTOCONTROLE";
    mensagem = "Você atingiu o nirvana. Nem o Wi-Fi caindo te abala.";
  } else if (porcentagem >= 80) {
    titulo = "DIVA DIPLOMÁTICA";
    mensagem = "Você evita confusão, mas julga em silêncio.";
  } else if (porcentagem >= 60) {
    titulo = "BARRACO EM POTENCIAL";
    mensagem = "Você tenta manter a paz, mas sua paciência tem validade.";
  } else if (porcentagem >= 40) {
    titulo = "PERIGO EM AMBIENTE PÚBLICO";
    mensagem = "Você transforma um bom dia em audiência judicial.";
  } else {
    titulo = "AMEAÇA À PAZ MUNDIAL";
    mensagem = "A ONU gostaria de agendar uma conversa com você.";
  }

  document.getElementById("nivel").textContent =
    "GAME OVER";

  pergunta.textContent = titulo;

  opcoes.innerHTML = `
    <div class="placar-final">
      <p>${mensagem}</p>
      <h2>${pontos} / ${maximo} PONTOS</h2>
    </div>
  `;

  resultado.textContent = "★ PERSONALITY ANALYSIS COMPLETE ★";

  proximo.classList.add("escondido");
  iniciar.textContent = "PLAY AGAIN";
  iniciar.classList.remove("escondido");
}


compartilhar.addEventListener("click", async () => {
  const canvas = document.createElement("canvas");
  canvas.width = 800;
  canvas.height = 1000;

  const ctx = canvas.getContext("2d");
  const largura = canvas.width;
  const altura = canvas.height;

  // Fundo em degradê
  const fundo = ctx.createLinearGradient(0, 0, 800, 1000);
  fundo.addColorStop(0, "#30152c");
  fundo.addColorStop(0.55, "#9c304c");
  fundo.addColorStop(1, "#100b1a");

  ctx.fillStyle = fundo;
  ctx.fillRect(0, 0, largura, altura);

  // Sol retrô
  const sol = ctx.createLinearGradient(0, 100, 0, 550);
  sol.addColorStop(0, "#ffc489");
  sol.addColorStop(0.55, "#ff656d");
  sol.addColorStop(1, "#a92c5b");

  ctx.fillStyle = sol;
  ctx.beginPath();
  ctx.arc(400, 330, 200, 0, Math.PI * 2);
  ctx.fill();

  // Cidade ao fundo
  ctx.fillStyle = "#130d1e";

  const predios = [
    [0, 430, 85, 140],
    [80, 370, 100, 200],
    [175, 460, 90, 110],
    [260, 340, 85, 230],
    [340, 420, 110, 150],
    [445, 360, 80, 210],
    [520, 440, 90, 130],
    [605, 390, 100, 180],
    [700, 330, 100, 240]
  ];

  predios.forEach(([x, y, w, h]) => {
    ctx.fillRect(x, y, w, h);
  });

  // Base escura para leitura
  const painel = ctx.createLinearGradient(0, 520, 0, 1000);
  painel.addColorStop(0, "#130d1e");
  painel.addColorStop(1, "#080811");

  ctx.fillStyle = painel;
  ctx.fillRect(0, 550, 800, 450);

  // Moldura neon
  ctx.strokeStyle = "#ff657c";
  ctx.lineWidth = 5;
  ctx.strokeRect(28, 28, 744, 944);

  ctx.textAlign = "center";

  // Título
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 54px Arial";
  ctx.fillText("BEAT THE", 400, 115);

  ctx.fillStyle = "#ff647e";
  ctx.font = "bold 82px Arial";
  ctx.fillText("TROUBLE", 400, 195);

  ctx.fillStyle = "#ffe0e8";
  ctx.font = "20px Courier New";
  ctx.fillText("WALK AWAY. STAY COOL.", 400, 240);

  // Informações do resultado
  const titulo = pergunta.textContent;
  const mensagem = document.querySelector(
    ".placar-final p"
  ).textContent;

  // Função para quebrar textos longos
  function escreverTexto(texto, y, maxWidth, lineHeight) {
    const palavras = texto.split(" ");
    const linhas = [];
    let linha = "";

    palavras.forEach(palavra => {
      const teste = linha ? linha + " " + palavra : palavra;

      if (ctx.measureText(teste).width > maxWidth && linha) {
        linhas.push(linha);
        linha = palavra;
      } else {
        linha = teste;
      }
    });

    if (linha) linhas.push(linha);

    linhas.forEach((conteudo, indice) => {
      ctx.fillText(
        conteudo,
        400,
        y + indice * lineHeight
      );
    });

    return y + linhas.length * lineHeight;
  }

  ctx.fillStyle = "#ffb2c6";
  ctx.font = "bold 21px Courier New";
  ctx.fillText("★ YOUR CHAOS LEVEL ★", 400, 600);

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 42px Arial";

  const fimTitulo = escreverTexto(
    titulo, 670, 670, 50
  );

  ctx.fillStyle = "#ffd4dc";
  ctx.font = "23px Courier New";

  const fimMensagem = escreverTexto(
    mensagem,
    fimTitulo + 30,
    670,
    32
  );

  // Placar
  const yPlacar = Math.max(855, fimMensagem + 35);

  ctx.fillStyle = "#ffd18a";
  ctx.font = "bold 50px Arial";
  ctx.fillText(
    `${pontos} / ${perguntas.length * 100}`,
    400,
    Math.min(yPlacar, 900)
  );

  ctx.fillStyle = "#eab1c5";
  ctx.font = "18px Courier New";
  ctx.fillText("OFFICIAL ARCADE RESULT", 400, 935);

  // Criar PNG
  const blob = await new Promise(resolve => {
    canvas.toBlob(resolve, "image/png");
  });

  if (!blob) return;

  const arquivo = new File(
    [blob],
    "beat-the-trouble.png",
    { type: "image/png" }
  );

  // Compartilhar no celular, quando disponível
  if (
    navigator.share &&
    navigator.canShare &&
    navigator.canShare({ files: [arquivo] })
  ) {
    try {
      await navigator.share({
        files: [arquivo],
        title: "Beat the Trouble"
      });
      return;
    } catch (erro) {
      if (erro.name === "AbortError") return;
    }
  }

  // Download no computador
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = arquivo.name;
  link.click();

  setTimeout(() => URL.revokeObjectURL(url), 1000);
});


