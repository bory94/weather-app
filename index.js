const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const cityInput = document.querySelector('.search-box input');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

const fetchWeather = () => {

    // Feel free to use mine :)
    const APIKey = '185dbcc57e27f9315a49d3f1c762ebd7';
    const city = cityInput.value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {

                container.style.height = '400px';

                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';

                error404.style.display = 'block';
                error404.classList.add('fadeIn');

                return;

            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'https://github.com/hosseinnabi-ir/Advanced-Weather-App-using-CSS-and-JavaScript/blob/Main/images/clear.png?raw=true';
                    break;

                case 'Rain':
                    image.src = 'https://github.com/hosseinnabi-ir/Advanced-Weather-App-using-CSS-and-JavaScript/blob/Main/images/rain.png?raw=true';
                    break;

                case 'Snow':
                    image.src = 'https://github.com/hosseinnabi-ir/Advanced-Weather-App-using-CSS-and-JavaScript/blob/Main/images/snow.png?raw=true';
                    break;

                case 'Clouds':
                    image.src = 'https://github.com/hosseinnabi-ir/Advanced-Weather-App-using-CSS-and-JavaScript/blob/Main/images/cloud.png?raw=true';
                    break;

                case 'Haze':
                    image.src = 'https://github.com/hosseinnabi-ir/Advanced-Weather-App-using-CSS-and-JavaScript/blob/Main/images/mist.png?raw=true';
                    break;

                default:
                    image.src = '';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');

            container.style.height = '590px';

        });
}

search.addEventListener('click', fetchWeather);
cityInput.addEventListener('keyup', e => {
  if(e.code === 'Enter') fetchWeather()
})
