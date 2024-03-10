import { ts, publicKey, hashVal } from './dadosApi.js';

let inputPersonag = document.getElementById('inputPersonagens');
let btnBusc = document.getElementById('btnBuscar');
let mostrarCont = document.getElementById('mostrarContainer');
let personagensList = document.getElementById('personagensList');

let date = new Date();
console.log(date.getTime());

const [timestamp, apiKey, hashValue] = [ts, publicKey, hashVal];

btnBusc.addEventListener('click', async () => {
    console.log('Botão clicado');
    if (inputPersonag.value.trim().length === 0) {
        alert('A entrada não pode ficar em branco!');
        return;
    }

    mostrarCont.innerHTML = '';
    const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}&name=${inputPersonag.value}`;

    const response = await fetch(url);
    const jsonData = await response.json();

    if (jsonData.data['results'].length === 0) {
        alert('Personagem não encontrado!');
        return;
    }

    jsonData.data['results'].forEach((element) => {
        mostrarCont.innerHTML += `
        <div id='card-container'>
            <div id='container-imgPersonagem'>
                <img src='${element.thumbnail['path'] + '.' + element.thumbnail['extension']}'/>
            </div>
            <div id='txtPersonagem'>
                <div id='nomePersonagem'>${element.name}</div>
                <div id='descricaoPersonagem'><p>${element.description}</p></div>
            </div>
        </div>`;
    });
});
