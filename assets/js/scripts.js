const data = [
    {
      min: 0,
      max: 18.49,
      classificacao: "Menor que 18,5",
      info: "Magreza",
      obesidade: "0",
    },
    {
      min: 18.5,
      max: 24.99,
      classificacao: "Entre 18,5 e 24,9",
      info: "Normal",
      obesidade: "0",
    },
    {
      min: 25,
      max: 29.99,
      classificacao: "Entre 25,0 e 29,9",
      info: "Sobrepeso",
      obesidade: "I",
    },
    {
      min: 30,
      max: 39.99,
      classificacao: "Entre 30,0 e 39,9",
      info: "Obesidade",
      obesidade: "II",
    },
    {
      min: 40,
      max: 99,
      classificacao: "Maior que 40,0",
      info: "Obesidade grave",
      obesidade: "III",
    },
  ];


const imcTable = document.querySelector("#imc-table");

const alturaInput = document.querySelector("#altura");
const pesoInput = document.querySelector("#peso");
const calcBtn = document.querySelector("#calc-btn");

const calcContainer = document.querySelector("#calc-container");
const resultContainer = document.querySelector("#result-container");

const imcNumber = document.querySelector("#imc-number span");
const imcInfo = document.querySelector("#imc-info span");

const backBtn = document.querySelector("#back-btn");

//criando a tabela

function createTable(data) {
    data.forEach((item) => {
      const div = document.createElement("div");
      div.classList.add("table-data");
  
      const classificacao = document.createElement("p1");
      classificacao.innerText = item.classificacao;
  
      const info = document.createElement("p1");
      info.innerText = item.info;
  
      const obesidade = document.createElement("p1");
      obesidade.innerText = item.obesidade;
  
      div.appendChild(classificacao);
      div.appendChild(info);
      div.appendChild(obesidade);
  
      imcTable.appendChild(div);
    });
  }


//valida o que o usuario digita na lable

function validDigits(text, maxLength, isPeso = false) {
    let updatedText = text.replace(/[^0-9]/g, ""); // Permite apenas números
  
    if (updatedText.length > maxLength) {
      updatedText = updatedText.slice(0, maxLength); // Limita o comprimento
    }
  
    if (isPeso) {
      // Formatação progressiva do peso
      if (updatedText.length === 3) {
        updatedText = updatedText[0] + "," + updatedText.slice(1); // Exibe "0,00"
      } else if (updatedText.length === 4) {
        updatedText = updatedText.slice(0, 2) + "," + updatedText.slice(2); // Exibe "00,00"
      } else if (updatedText.length === 5) {
        updatedText = updatedText.slice(0, 3) + "," + updatedText.slice(3); // Exibe "000,00"
      }
    } else {
      // Formatação automática da altura para "0,00" se o usuário digitar "000"
      if (updatedText.length === 3) {
        updatedText = updatedText[0] + "," + updatedText.slice(1);
      }
    }
  
    return updatedText;
  }
  
  // Altura
  alturaInput.addEventListener("input", (e) => {
    e.target.value = validDigits(e.target.value, 3); // Altura permite 3 dígitos
  });
  
  // Peso
  pesoInput.addEventListener("input", (e) => {
    e.target.value = validDigits(e.target.value, 5, true); // Peso permite até 5 dígitos e 1 vírgula
  });


//botao de calcular

function calcImc(altura, peso) {
    const imc = (peso / (altura * altura)).toFixed(2);
    return imc;
  }


calcBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const altura = +alturaInput.value.replace(",", ".");
    const peso = +pesoInput.value.replace(",", ".");
  
    console.log(altura, peso);
  
    if (!altura|| !peso) return;
  
    const imc = calcImc(altura, peso);
    let info;
    
    data.forEach((item) => {
      if (imc >= item.min && imc <= item.max) {
        info = item.info;
      }

    });
    
    if (!info) return;

    imcNumber.innerText = imc;
    imcInfo.innerText = info;
  
    switch (info) {
      case "Magreza":
        imcNumber.classList.add("low");
        imcInfo.classList.add("low");
        break;
      case "Normal":
        imcNumber.classList.add("good");
        imcInfo.classList.add("good");
        break;
      case "Sobrepeso":
        imcNumber.classList.add("low");
        imcInfo.classList.add("low");
        break;
      case "Obesidade":
        imcNumber.classList.add("medium");
        imcInfo.classList.add("medium");
        break;
      case "Obesidade grave":
        imcNumber.classList.add("high");
        imcInfo.classList.add("high");
        break;
    }
  
    showOrHideResults();
    
});


//troca as paginas de calculo e resultado

function showOrHideResults() {
    calcContainer.classList.toggle("hide");
    resultContainer.classList.toggle("hide");
    
  }


//Configuração do botao de voltar

backBtn.addEventListener("click", () => {
    alturaInput.value = "";
    pesoInput.value = "";
    imcNumber.className = "";
    imcInfo.className = "";
    showOrHideResults();

})




  createTable(data);
  