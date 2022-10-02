document.querySelector('.search-area').addEventListener('submit', async (event) => {
    event.preventDefault();

    let input = document.querySelector('#searchInput').value;

    if (input !== '') {
        clearInfo();
        showWarning('Aguardando...');

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=82ce0daa1af8a955d24e3d648006295e&units=metric&lang=pt_br`;
        let results = await fetch(url);
        let json = await results.json();

        console.log(json);
        if (json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempMin: json.main.temp_min,
                tempMax: json.main.temp_max,
                tempIcon: json.weather[0].icon,
                tempDesc: json.weather[0].description,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg,
                pressure: json.main.pressure,
                humidity: json.main.humidity,
                cloud: json.clouds.all
            });
        } else {
            clearInfo();
            showWarning('Não encontramos essa Localização')
        }
    }
});

function showInfo(json) {
    showWarning('');
    document.querySelector('.aviso').style.display = 'none';

    let currentDate = fixDate();
    document.querySelector('.current-date').innerHTML = currentDate;

    document.querySelector('.localization').innerHTML = `${json.name} - ${json.country}`;
    document.querySelector('.temperature').innerHTML = `${json.temp}<sup>°C</sup>`;
    document.querySelector('.weather-symbol').setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector('.weather-desc').innerHTML = json.tempDesc;
    document.querySelector('.weatherMminMax').innerHTML = `Min. ${json.tempMin}°C - Max. ${json.tempMax}°C`;

    document.querySelector('.cloudy').innerHTML = `${json.cloud}%`;

    document.querySelector('.pressure').innerHTML = `${json.pressure}mb`;

    document.querySelector('.humidity').innerHTML = `${json.humidity}%`;

    document.querySelector('.wind-pointer').style.transform = `rotate(${json.windAngle - 90}deg)`;
    document.querySelector('.wind-speed').innerHTML = `${json.windSpeed}km/h`;

    document.querySelector('.result-area').style.display = 'flex';
}

function showWarning(msg) {

    document.querySelector('.aviso span').innerHTML = msg;
    document.querySelector('.aviso').style.display = 'block';
}

function clearInfo() {
    showWarning('');
    document.querySelector('.result-area').style.display = 'none';
}

function fixDate() {
    let currentDate = new Date();
    let currentDay = currentDate.getDate();
    let currentMonth = currentDate.getMonth() + 1;
    let currentYear = currentDate.getFullYear();

    if (currentDay < 10) {
        currentDay = `0${currentDay}`;
    }

    if (currentMonth < 10) {
        currentMonth = `0${currentMonth}`;
    }

    let date = `${currentDay}/${currentMonth}/${currentYear}`;

    return date;
}