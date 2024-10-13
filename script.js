const apiKey = '4e2b87f811870d3de04bea91b9670146'
const city = 'Montevideo';  // Cambia el nombre de la ciudad si deseas consultar otra

async function getWeatherData() {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    
    // Obtener los elementos del DOM
    const cityElement = document.getElementById('city');
    const countryElement = document.getElementById('country');
    const temperatureElement = document.getElementById('temperature');
    const weatherIcon = document.getElementById('weather-icon');

    // Asignar los valores a los elementos
    cityElement.textContent = data.name;
    countryElement.textContent = data.sys.country;
    temperatureElement.textContent = Math.round(data.main.temp);

    // Icono del clima
    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

getWeatherData();
