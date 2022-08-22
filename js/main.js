//defino variables
const $container = document.querySelector('.container__information'),
  $btnQuote = document.getElementById('btn__quote'),
  $money = document.getElementById('money'),
  $cryptoMoney = document.getElementById('crypto-money'),
  apiKey = 'd85950c7ecee7aeace6f433ecac61fe45161030ebad10e5c705d97ab90ab356d';

// creo una función la cual va a llamar a la api
async function callApi() {
  //creo un método de verificación
  try {
    // creo una variable la cual va a ser modificado esta va a contener la url
    let urlApi = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=${$money.value}&api_key=${apiKey}`;

    // creo un método fetch asíncrono para la api
    const consumeApi = await fetch(urlApi),
      dataApi = await consumeApi.json();

    // creo nuevas variables las cuales va a tener la ruta del json que voy a extraer
    const price = dataApi.Data[$cryptoMoney.value].DISPLAY[$money.value].PRICE,
      priceHigh =
        dataApi.Data[$cryptoMoney.value].DISPLAY[$money.value].HIGHDAY,
      priceLow = dataApi.Data[$cryptoMoney.value].DISPLAY[$money.value].LOWDAY,
      changeHour =
        dataApi.Data[$cryptoMoney.value].DISPLAY[$money.value].CHANGEPCT24HOUR,
      update =
        dataApi.Data[$cryptoMoney.value].DISPLAY[$money.value].LASTUPDATE,
      nameCrypto = dataApi.Data[$cryptoMoney.value].CoinInfo.FullName;

    $container.innerHTML = `
    <h2 class="information__title"><span class="information__crypto information__crypto-${nameCrypto}">${nameCrypto}</span></h2>
      <p class="information__price" >Precio: <span class="information__crypto information__crypto-${nameCrypto}">${price}</span></p>
      <p class="information__priceHigh">Precio más alto del día: <span class="information__crypto information__crypto-${nameCrypto}">${priceHigh}</span></p>
      <p class="information__priceLow">Precio más bajo del día: <span class="information__crypto information__crypto-${nameCrypto}">${priceLow}</span></p>
      <p class="information__increase">Variación últimas 24 horas: <span class="information__crypto information__crypto-${nameCrypto}">${changeHour}%</span></p>
      <p class="information__update">Última actualización: <span class="information__crypto information__crypto-${nameCrypto}" >${update}</span></p>
      `;

    // el catch me va a enviar un aviso si la api falla en su respuesta
  } catch (error) {
    // creo una nueva variable la cual va a tener el aviso
    const $warnApi = document.createElement('div');

    $warnApi.classList = 'warn';
    $warnApi.innerHTML = `
    <p class="warn__information">Lo sentimos la pagina no esta disponible en este momento </p>
    <p class="warn__information">Por favor inténtalo más tarde </p>
    `;
  }
}

// esta función va a traer la información al dar click al btn nombrado

$btnQuote.addEventListener('click', (e) => {
  e.preventDefault();
  if ($money.value === '' || $cryptoMoney.value === '') {
    $container.innerHTML = `
    <p class="information__warn">Por favor seleccione una moneda</p>
    `;
  }
  callApi();
});
