const data = [
  {
    min: 0,
    max: 18.4,
    classification: 'Menor que 18,5',
    info: 'Abaixo do peso',
    obesity: '0',
  },

  {
    min: 18.5,
    max: 24.9,
    classification: 'Entre 18,5 e 24,9',
    info: 'Peso adequado',
    obesity: '0',
  },

  {
    min: 25,
    max: 29.9,
    classification: 'Entre 25,0 e 29,9',
    info: 'Sobrepeso',
    obesity: '0',
  },

  {
    min: 30,
    max: 34.9,
    classification: 'Entre 30 e 34,9',
    info: 'Obesidade grau I',
    obesity: 'I',
  },

  {
    min: 35,
    max: 39.9,
    classification: 'Entre 35 e 39,9',
    info: 'Obesidade grau II',
    obesity: 'II',
  },

  {
    min: 40,
    max: 99,
    classification: 'Maior que 40',
    info: 'Obesidade grau III',
    obesity: 'III',
  },
]


// Seleção de elementos
const imcTable = document.querySelector('#imc-table');

const nameInput = document.querySelector('#name');
const heightInput = document.querySelector('#height');
const weightInput = document.querySelector('#weight');
const calcBtn = document.querySelector('#calc-btn');
const clearBtn = document.querySelector('#clear-btn');

const calcContainer = document.querySelector('#calc-container');
const resultContainer = document.querySelector('#result-container');

const imcNumber = document.querySelector('#imc-number span');
const imcInfo = document.querySelector('#imc-info span');

const backBtn = document.querySelector('#back-btn');

// Funções
// preenchendo as linhas da tabela de IMC 
function createTable(data) {
  data.forEach((item) => { // executa a função em cada elemento do array chamando cada um dos itens de item.
    
    const div = document.createElement('div');
    div.classList.add('table-data');

// Colocando o texto do primeiro paragrafo, igual ao texto da classificação atual
    const classification = document.createElement('p');
    classification.innerText = item.classification;
    const info = document.createElement('p');
    info.innerText = item.info;
    const obesity = document.createElement('p');
    obesity.innerText = item.obesity;

    div.appendChild(classification);
    div.appendChild(info);
    div.appendChild(obesity);

    imcTable.appendChild(div);
  });
}

// Limpando os valores digitados nos inputs
function cleanInputs() {
  nameInput.value = '';
  heightInput.value = '';
  weightInput.value = '';
  imcNumber.classList = '';
  imcInfo.classList = '';
}

// Declarando os valores permitidos a serem digitados.
function validDigits(text) {
  return text.replace(/[^0-9,]/g, '')
}

// Calculando o valor so IMC
function calcImc(weight, height) {
  const imc = (weight / Math.pow(height, 2)).toFixed(2);
  return imc;
}

// Alterando a classe hide entre os containers de input e resultado, para apresentar um ou outro na tela
function showOrHideResults() {
  calcContainer.classList.toggle('hide');
  resultContainer.classList.toggle('hide');
}

// Inicialização
createTable(data);



// Eventos
clearBtn.addEventListener('click', (event) => {
  event.preventDefault(); // Evitando que por padrão, ao clicar no botão limpar a página seja recarregada.
  cleanInputs();
});

// Evitando que o usuário digite letras nos campos de números
[heightInput, weightInput].forEach((element) => {
  element.addEventListener('input', (event) => {
    const updateValue = validDigits(event.target.value);
    event.target.value = updateValue;
  });
});

calcBtn.addEventListener('click', (event) => {
  event.preventDefault(); // Evitando que por padrão, ao clicar no botão a página seja recarregada.

  const name = nameInput.value;
  const weight = +weightInput.value.replace(',', '.');// Transformando virgula em ponto
  const height = +heightInput.value.replace(',', '.');// Transformando virgula em ponto

  if (!weight || !height || !name) { // Se não receber nenhum valor
    alert('Preencha todos os campos!');
  }

  const imc = calcImc(weight, height);
  
  let info;

  data.forEach((item) => { // Percorrendo o array data, verificando onde os valores inseridos se enquadram
    if (imc >= item.min && imc <= item.max) {
      info = item.info;
  }
});

  if (!info) { // Se não encontrar os valores, retorna valores incorretos
    alert('Valores incorretos!');
  };

  imcNumber.innerText = imc;// Preenchendo o valor calculado, dentro da tag span
  imcInfo.innerText = info;// Preenchendo a informação de obesidade correspondente dentro da tag span

  switch (info) {
    case 'Abaixo do peso':
      imcNumber.classList.add('low');
      imcInfo.classList.add('low');
      break;
    case 'Peso adequado':
      imcNumber.classList.add('good');
      imcInfo.classList.add('good');
      break;
    case 'Sobrepeso':
      imcNumber.classList.add('low');
      imcInfo.classList.add('low');
      break;
    case 'Obesidade grau I':
      imcNumber.classList.add('medium');
      imcInfo.classList.add('medium');
      break;
    case 'Obesidade grau II':
      imcNumber.classList.add('high');
      imcInfo.classList.add('high');
      break;
    case 'Obesidade grau III':
      imcNumber.classList.add('high');
      imcInfo.classList.add('high');
      break;
  }

  showOrHideResults();
});

// Criando o evento do botão voltar
backBtn.addEventListener('click', () => {
  cleanInputs();
  showOrHideResults();
});
