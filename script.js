const apiKey = '4e2b87f811870d3de04bea91b9670146';
const defaultCity = 'Montevideo';

const uruguayCities = ["Montevideo", "Salto", "Paysandú", "Maldonado", "Rivera", "Tacuarembó", "Artigas", "Florida", "Durazno", "Canelones", "San José", "Lavalleja", "Soriano", "Rocha", "Treinta y Tres", "Colonia", "Flores", "Río Negro", "Cerro Largo"];

async function getWeatherData(city = defaultCity) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
  const data = await response.json();

  if (data.cod === 200) {
    document.getElementById('city').textContent = data.name;
    document.getElementById('country').textContent = data.sys.country;
    document.getElementById('temperature').textContent = Math.round(data.main.temp);

    const iconCode = data.weather[0].icon;
    document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
  } else {
    alert("Ciudad no encontrada, intenta nuevamente.");
  }
}

document.getElementById('city-input').addEventListener('keydown', function(event) {
  const suggestionsContainer = document.getElementById('suggestions');
  const firstSuggestion = suggestionsContainer.firstChild;

  if (event.key === 'Enter') {
    event.preventDefault();
    if (firstSuggestion) {
      // Autocompletar con la primera sugerencia disponible
      document.getElementById('city-input').value = firstSuggestion.textContent;
      suggestionsContainer.innerHTML = '';
      getWeatherData(firstSuggestion.textContent);
    } else {
      const city = event.target.value.trim();
      if (city) {
        getWeatherData(city);
      } else {
        getWeatherData(defaultCity);
      }
    }
  }
});

const clearBtn = document.getElementById('clear-btn');
clearBtn.addEventListener('click', () => {
  document.getElementById('city-input').value = '';
  document.getElementById('suggestions').innerHTML = '';
  clearBtn.style.display = 'none';
  getWeatherData(defaultCity);
});

document.getElementById('city-input').addEventListener('input', function () {
  const input = this.value.trim().toLowerCase();
  const suggestionsContainer = document.getElementById('suggestions');
  clearBtn.style.display = input ? 'block' : 'none';

  suggestionsContainer.innerHTML = '';
  if (input) {
    const suggestions = uruguayCities.filter(city => city.toLowerCase().includes(input));
    suggestions.forEach(city => {
      const suggestionItem = document.createElement('div');
      suggestionItem.textContent = city;
      suggestionItem.addEventListener('click', function () {
        document.getElementById('city-input').value = city;
        suggestionsContainer.innerHTML = '';
        clearBtn.style.display = 'block';
        getWeatherData(city);
      });
      suggestionsContainer.appendChild(suggestionItem);
    });
  }
});

// Mostrar clima de Montevideo por defecto al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  getWeatherData();
});









