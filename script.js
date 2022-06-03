const cidade = document.querySelector('.cidade');
const clima = document.querySelector('.clima');
const imagem = document.querySelector('.imagem');
const temperatura = document.querySelector('.temperatura');
const tempMaxMin = document.querySelector('.maxmin');
const diaAtual = document.querySelector('.data');

const myData = new Date();
let diaS = String(myData.getDay());
let dia = String(myData.getDate()).padStart(2, '0')
let mes = String(myData.getMonth() + 1);
let ano = String(myData.getFullYear());
let mesExt;
let diaExt;

switch (mes) {
    case '1':
        mes = 'Janeiro';
        break
    case '2':
        mes = 'Fevereiro';
        break
    case '3':
        mes = 'Março';
        break
    case '4':
        mes = 'Abril';
        break
    case '5':
        mes = 'Maio';
        break
    case '6':
        mes = 'Junho';
        break
    case '7':
        mes = 'Julho';
        break
    case '8':
        mes = 'Agosto';
        break
    case '9':
        mes = 'Setembro';
        break
    case '10':
        mes = 'Outubro';
        break
    case '11':
        mes = 'Novembro';
        break
    case '12':
        mes = 'Dezembro';
}
switch (diaS) {
    case '0':
        diaS = 'Domingo';
        break
    case '1':
        diaS = 'Segunda';
        break
    case '2':
        diaS = 'Terça';
        break
    case '3':
        diaS = 'Quarta';
        break
    case '4':
        diaS = 'Quinta';
        break
    case '5':
        diaS = 'Sexta';
        break
    case '6':
        diaS = 'Sabado';
}

diaAtual.innerHTML = `${diaS}, ${dia} de ${mes} de ${ano}`;

function success(pos) {
    let lat = pos.coords.latitude;
    let lon = pos.coords.longitude;
    function fetchApiData() {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=cae3358de5a67c62ef2de8901342f03d`)
            .then((response) => response.json())
            .then((data) => { getApi(data) })
    }
    fetchApiData();
}

let dados = [];

function getApi(data) {
    var hora = String(myData.getHours()).padStart(2, '0');
    var min = String(myData.getMinutes()).padStart(2, '0');

    cidade.innerHTML = `${data.name}, ${data.sys.country}`;
    clima.innerHTML = data.weather[0].description;
    imagem.innerHTML = `<img src="images/${data.weather[0].icon}.png">`;
    temperatura.innerHTML = (data.main.temp - 273.15).toFixed(0);
    tempMaxMin.innerHTML = `Max: ${(data.main.temp_max - 273.15).toFixed(0)}°C / Min: ${(data.main.temp_min - 273.15).toFixed(0)}°C`

    dados.push(data.name, clima.innerHTML, imagem.innerHTML, temperatura.innerHTML, hora, min);
}

function error(err) {
    alert(err + ' Por favor, ative sua localização.');
}
navigator.geolocation.getCurrentPosition(success, error);

function botaoSalvar() {
    localStorage.setItem("dadosSalvos", dados);
    passarDados();
}

let listaImagem = document.querySelector('.listaImagem');
let listaTemperatura = document.querySelector('.listaTemperatura');
let listaClima = document.querySelector('.listaClima');
let listaData = document.querySelector('.listaData');
let listaHora = document.querySelector('.listaHora');

function passarDados() {
    let dadosSalvados = localStorage.getItem("dadosSalvos") == null ? null : localStorage.getItem("dadosSalvos").split(',');

    if (dadosSalvados != null) {
    listaImagem.innerHTML = dadosSalvados[2];
    listaTemperatura.innerHTML = `${dadosSalvados[3]}°C`;
    listaClima.innerHTML = dadosSalvados[1];
    listaData.innerHTML = `${diaS}, ${dia} de ${mes} de ${ano}`
    listaHora.innerHTML = `${dadosSalvados[4]}h${dadosSalvados[5]}`;
    }
}

function excluir() {
    localStorage.removeItem("dadosSalvos");
    location.reload();
}