document.querySelector("#search").addEventListener('submit', async (event) => {
    event.preventDefault();

    const cityName = document.querySelector('#cityName').value;

    if(!cityName) {
        return showAlert ("Você precisa digitar uma cidade.")
    }

    const apiKey = "861df8875d9b16c8f98214ac4193d62f";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`;

    const results = await fetch(apiUrl);
    const json = await results.json();

    if (json.cod === 200) {
        showInfo({
            city: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            tempMax: json.main.temp_max,
            tempMin: json.main.temp_min,
            description: json.weather[0].description,
            tempIcon: json.weather[0].icon,
            windSpeed: json.wind.speed,
            umidity: json.main.humidity,
        });
    }else {
        showAlert("Não foi possível localizar...")
    }
});

function showInfo(json){
    showAlert(``);

    document.querySelector("#weather").classList.add('show');

    document.querySelector('#title').innerHTML = `${json.city}, ${json.country}`;
    document.querySelector('#temp_value').innerHTML = `${json.temp} ºC`;
    document.querySelector('#temp_description').innerHTML = `${json.description}`;
    document.querySelector('#temp_img').setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector('#temp_max').innerHTML = `${json.tempMax} ºC`;
    document.querySelector('#temp_min').innerHTML = `${json.tempMin} ºC`;
    document.querySelector('#umidity').innerHTML = `${json.umidity}%`;
    document.querySelector('#wind').innerHTML = `${json.windSpeed} km/h`;

}

function showAlert(msg) {
    document.querySelector('#alert').innerHTML = msg;
}