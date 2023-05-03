var horas, minutos, segundos, cronometro;

function atualizaCronometro() {
  segundos++;
  if (segundos == 60) {
    segundos = 0;
    minutos++;
    if (minutos == 60) {
      minutos = 0;
      horas++;
    }
  }
  var tempo = (horas < 10 ? "0" + horas : horas) + ":" +
              (minutos < 10 ? "0" + minutos : minutos) + ":" +
              (segundos < 10 ? "0" + segundos : segundos);
  document.getElementById("cronometro").innerHTML = tempo;
}

function iniciarCronometro() {
  var promise = new Promise(function(resolve, reject) {
    try {
      if (!cronometro) {
        cronometro = setInterval(atualizaCronometro, 1000);
        document.getElementById("btnIniciar").disabled = true;
        resolve("Cronômetro iniciado.");
      } else {
        reject(new Error("O cronômetro já está em execução."));
      }
    } catch (error) {
      reject(new Error("Erro ao iniciar o cronômetro: " + error.message));
    }
})};

function pararCronometro() {
  var promise = new Promise(function(resolve, reject) {
    try {
      if (cronometro) {
        clearInterval(cronometro);
        cronometro = null;
        document.getElementById("btnIniciar").disabled = false;
        resolve("Cronômetro parado.");
      } else {
        reject(new Error("O cronômetro não está em execução."));
      }
    } catch (error) {
      reject(new Error("Erro ao parar o cronômetro: " + error.message));
    }
})};

function reiniciarCronometro() {
  var promise = new Promise(function(resolve, reject) {
    try {
      clearInterval(cronometro);
      cronometro = null;
      horas = 0;
      minutos = 0;
      segundos = -1;
      atualizaCronometro();
      document.getElementById("btnIniciar").disabled = false;
      resolve("Cronômetro reiniciado.");
    } catch (error) {
      reject(new Error("Erro ao reiniciar o cronômetro: " + error.message));
    }
})};

// Declaração das variáveis utilizando Hoisting
horas = 0;
minutos = 0;
segundos = 0;

document.getElementById("btnIniciar").addEventListener("click", iniciarCronometro);
document.getElementById("btnParar").addEventListener("click", pararCronometro);
document.getElementById("btnReiniciar").addEventListener("click", reiniciarCronometro);