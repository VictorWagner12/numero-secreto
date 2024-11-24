let listaNumerosSorteados = [];
let numeroAleatorio = gerarNumeroAleatorio(); // variável número aleatório
let tentativas = 1; // variável do número de tentativas
let numeroLimite = 10;

function exibirTextoNaTela(tag, texto) {
  let campo = document.querySelector(tag);
  if (campo) { // Verifica se o campo foi encontrado
    campo.innerHTML = texto; 
  }
}

function exibirMensagemInicial() {
  const titulo = 'Jogo do número secreto'; // Texto que aparece no título
  const mensagem = 'Digite um número de 1 a 10'; // Texto que aparece na descrição
  
  exibirTextoNaTela('h1', titulo); // Exibe o título
  exibirTextoNaTela('.texto__paragrafo', mensagem); // Exibe a mensagem dentro do p com a classe .texto__paragrafo

  // Chama o responsiveVoice para falar os textos
  responsiveVoice.speak(titulo, 'Brazilian Portuguese Female', {rate: 1.3});
  responsiveVoice.speak(mensagem, 'Brazilian Portuguese Female', {rate: 1.3});
}

// Executa a função de exibir mensagem inicial assim que o conteúdo da página for carregado
window.onload = function() {
  exibirMensagemInicial(); // Chama a função para exibir a mensagem inicial
};

function verificarChute() { // função para verificar se o chute foi igual ao número gerado aleatoriamente
  let chute = parseInt(document.querySelector('.container__input').value); // Garantindo que o valor do chute seja um número inteiro
  
  if (isNaN(chute) || chute < 1 || chute > 10) { // Validando o chute
    exibirTextoNaTela('.texto__paragrafo', 'Por favor, insira um número válido entre 1 e 10.');
    return;
  }
  
  if (numeroAleatorio === chute) {
    exibirTextoNaTela('h1', 'Acertou!');
    let palavraTentativas = tentativas > 1 ? 'tentativas!' : 'tentativa!';
    let mensagemTentativas = `${tentativas} ${palavraTentativas}`;
    exibirTextoNaTela('.texto__paragrafo', `Você descobriu o número secreto com ${mensagemTentativas}`);
    document.getElementById('reiniciar').removeAttribute('disabled'); // habilita o botão "novo jogo"
  } else {
    if (chute > numeroAleatorio) {
      exibirTextoNaTela('.texto__paragrafo', 'O número secreto é menor!');
    } else {
      exibirTextoNaTela('.texto__paragrafo', 'O número secreto é maior!');
    }
    tentativas++; // contagem de tentativas
    limparCampo(); // limpar campo quando o número for errado
  }
}

function limparCampo() { // função para limpar campo quando o número não for correto
  document.querySelector('.container__input').value = ''; // limpar o campo de input
}

function gerarNumeroAleatorio() { // função para gerar número aleatório de 1 a 10
  let numeroEscolhido = Math.floor(Math.random() * numeroLimite) + 1; // gera um número aleatório entre 1 e 10
  
  let quantidadeDeElementos = listaNumerosSorteados.length; // verifica quantos números já foram sorteados
  
  if (quantidadeDeElementos === numeroLimite) {
    listaNumerosSorteados = []; // se o limite de números sorteados for atingido, reinicia a lista
  }

  if (listaNumerosSorteados.includes(numeroEscolhido)) { // descarta números já sorteados
    return gerarNumeroAleatorio();
  } else {
    listaNumerosSorteados.push(numeroEscolhido); // adiciona o número sorteado à lista
    console.log(listaNumerosSorteados);
    return numeroEscolhido;
  }
}

function reiniciarJogo() { // função para reiniciar o jogo
  numeroAleatorio = gerarNumeroAleatorio();
  limparCampo();
  tentativas = 1;
  exibirMensagemInicial();  
  document.getElementById('reiniciar').setAttribute('disabled', true);
}
