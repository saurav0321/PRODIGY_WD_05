const container = document.querySelector(".Container");
const search = document.querySelector(".SearchBox button");
const weatherBox = document.querySelector(".WeatherBox");
const weatherDetails = document.querySelector(".WeatherDetails");
const error404 = document.querySelector(".NotFound");
const CityHide = document.querySelector(".CityHide");

search.addEventListener("click", () => {
  const APIKey = "b0070dbef04cb59370352f127f703645";
  const city = document.querySelector(".SearchBox input").value;
  if (city == "") return;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {

      if(json.cod == '404'){
        CityHide.textContent = city;
        container.style.height = '450px';
        weatherBox.classList.remove('active');
        weatherDetails.classList.remove('active');
        error404.classList.add('active');
        return;
      }

      const image = document.querySelector(".WeatherBox img");
      const temperature = document.querySelector(".WeatherBox .Temperature");
      const description = document.querySelector(".WeatherBox .Description");
      const humidity = document.querySelector(".WeatherDetails .Humidity span");
      const wind = document.querySelector(".WeatherDetails .Wind span");

      if(CityHide.textContent == city){
        return;
      }
      else{
        CityHide.textContent = city;

        container.style.height = '555px';
        container.classList.add('active');
        weatherBox.classList.add('active');
        weatherDetails.classList.add('active');
        error404.classList.remove('active');

        setTimeout(() => {
          container.classList.remove('active');
        }, 2500);

        switch (json.weather[0].main) {
          case "Clear":
            image.src = "clear.png";
            break;
          case "Rain":
            image.src = "rain.png";
            break;
          case "Snow":
            image.src = "snow.png";
            break;
          case "Clouds":
            image.src = "cloud.png";
            break;
          case "Mist":
            image.src = "mist.png";
            break;
          case "Haze":
            image.src = "mist.png";
            break;
          default:
            image.src = "cloud.png";
        }
        temperature.innerHTML = `${parseInt(json.main.temp)}<span>&degC</span>`; 
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

        const InfoWeather = document.querySelector('.InfoWeather');
        const InfoHumidity = document.querySelector('.InfoHumidity');
        const InfoWind = document.querySelector('.InfoWind');

        const elCloneInfoWeather = InfoWeather.cloneNode(true);
        const elCloneInfoHumidity = InfoHumidity.cloneNode(true);
        const elCloneInfoWind = InfoWind.cloneNode(true);

        elCloneInfoWeather.id = 'CloneInfoWeather';
        elCloneInfoWeather.classList.add('ActiveClone');

        elCloneInfoHumidity.id = 'CloneInfoHumidity';
        elCloneInfoHumidity.classList.add('ActiveClone');

        elCloneInfoWind.id = 'CloneInfoWind';
        elCloneInfoWind.classList.add('ActiveClone');

        setTimeout(() => {
          InfoWeather.insertAdjacentElement("afterend", elCloneInfoWeather);
          InfoHumidity.insertAdjacentElement("afterend", elCloneInfoHumidity);
          InfoWind.insertAdjacentElement("afterend", elCloneInfoWind);
        }, 2200);

        const CloneInfoWeather = document.querySelectorAll('.InfoWeather.ActiveClone');
        const TotalCloneInfoWeather = CloneInfoWeather.length;
        const CloneInfoWeatherFirst = CloneInfoWeather[0];

        const CloneInfoHumidity = document.querySelectorAll('.InfoHumidity.ActiveClone');
        const CloneInfoHumidityFirst = CloneInfoHumidity[0];

        const CloneInfoWind = document.querySelectorAll('.InfoWind.ActiveClone');
        const CloneInfoWindFirst = CloneInfoWind[0];

        if(TotalCloneInfoWeather > 0){
          CloneInfoWeatherFirst.classList.remove('ActiveClone');
          CloneInfoHumidityFirst.classList.remove('ActiveClone');
          CloneInfoWindFirst.classList.remove('ActiveClone');

          setTimeout(() => {
            CloneInfoWeatherFirst.remove();
            CloneInfoHumidityFirst.remove();
            CloneInfoWindFirst.remove();
          }, 2200);
        }
      }
    });
});