const display = document.getElementById('display');
const historico = document.getElementById('historico');
let erro = false; // Flag para indicar erro
let resultadoMostrado = false; // Flag para indicar se o resultado foi mostrado

const exibirNumero = (numero) => {
    if (erro) {
        clearDisplay();
        erro = false;
    }
    if (resultadoMostrado) {
        if (isNaN(numero)) {
            // Se for um operador, continue a operação
            display.value += numero;
            resultadoMostrado = false;
        }
    } else {
        display.value += numero;
    }
};

const clearDisplay = () => {
    display.value = "";
    erro = false;
    resultadoMostrado = false; // Resetar o estado de resultado mostrado
};

const pontoDecimal = () => {
    if (erro) {
        clearDisplay();
        erro = false;
    }
    if (resultadoMostrado) {
        display.value = "0."; // Reinicia a entrada de número após resultado
        resultadoMostrado = false;
    } else if (!display.value.includes('.')) {
        display.value += '.';
    }
};

const limparUltimoDigito = () => {
    if (erro || resultadoMostrado) {
        clearDisplay();
        erro = false;
        resultadoMostrado = false;
    } else {
        display.value = display.value.slice(0, -1);
    }
};

const fazerConta = () => {
    try {
        let resultado = math.evaluate(display.value);
        historico.innerHTML += `<div>${display.value} = ${resultado}</div><hr>`;
        display.value = resultado;
        resultadoMostrado = true;
    } catch (error) {
        display.value = "Erro";
        erro = true;
    }
};

const clearHistorico = () => {
    historico.innerHTML = ""; // Limpa o conteúdo do histórico
};

// Função para lidar com a entrada do teclado
const handleKeyPress = (event) => {
    const key = event.key;
    if (!isNaN(key) || ['+', '-', '*', '/', '.'].includes(key)) {
        exibirNumero(key);
    } else if (key === 'Enter') {
        fazerConta();
    } else if (key === 'Backspace') {
        limparUltimoDigito();
    } else if (key === 'Escape') {
        clearDisplay();
    }
};

// Adiciona o event listener para capturar as entradas do teclado
document.addEventListener('keydown', handleKeyPress);
