async function callApi() {
  const $money = document.getElementById('money'),
    apiKey = 'd85950c7ecee7aeace6f433ecac61fe45161030ebad10e5c705d97ab90ab356d',
    urlApi = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=${$money.value}&api_key=${apiKey}`;

  const consumeApi = await fetch(urlApi),
    data = await consumeApi.json();

  return data.Data;
}

function select(nameCrypto) {
  const { Name, FullName } = nameCrypto;
  const $cryptoMoney = document.getElementById('crypto-money');

  return nameCrypto.map(() => {
    $cryptoMoney.innerHTML = `
    <option value="${Name}" >${FullName}</option>
    `;
  });
}

console.log(select());

function infoCrypto() {
  const $container = document.querySelector('container__information');
  $container.innerHTML = `
    <h2 class="information__title"><span class="information__crypto information__crypto-${nameCrypto}">${nameCrypto}</span></h2>
    <p class="information__price" >Precio: <span class="information__crypto information__crypto-${nameCrypto}">${price}</span></p>
    <p class="information__priceHigh">Precio más alto del día: <span class="information__crypto information__crypto-${nameCrypto}">${priceHigh}</span></p>
    <p class="information__priceLow">Precio más bajo del día: <span class="information__crypto information__crypto-${nameCrypto}">${priceLow}</span></p>
    <p class="information__increase">Variación últimas 24 horas: <span class="information__crypto information__crypto-${nameCrypto}">${changeHour}%</span></p>
    <p class="information__update">Última actualización: <span class="information__crypto information__crypto-${nameCrypto}" >${update}</span></p>
  `;
}

document.getElementById('btn__quote').addEventListener('click', (e) => {
  e.preventDefault();
  infoCrypto();
});
