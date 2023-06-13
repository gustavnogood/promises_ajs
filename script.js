// Funktion för att hämta en slumpmässig bakgrundsbild från Unsplash
function getBackgroundImage() {
    const accessKey = 'sYlzUnile8Aqcwq6qBKlGfOsOBBcGun54KQXsG--38k';
    const apiUrl = `https://api.unsplash.com/photos/random?client_id=${accessKey}`;
  
    axios.get(apiUrl)
      .then(response => {
        const backgroundImage = response.data.urls.regular;
        const creator = response.data.user.name;
        
        document.querySelector('.border').style.backgroundImage = `url(${backgroundImage})`;
        document.getElementById('creator').textContent = `Photo by ${creator}`;
      })
      .catch(error => {
        console.error('Error fetching background image:', error);
        // Visa en default-bild om bakgrundsbilden inte hämtas
        document.getElementById('background').style.backgroundImage = "https://preview.redd.it/5unn16axx1v81.jpg?auto=webp&s=7a49ac2def6b301ee91637fb6062b1ba4d0b77ac";
      });
  }
  
  // Funktion för att hämta aktuell väderdata baserat på användarens geografiska position
  function getCurrentWeather() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const apiKey = '398e190702c84e8ea9b201711232405';
        const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}`;
  
        axios.get(apiUrl)
          .then(response => {
            const location = response.data.location.name;
            const temperature = response.data.current.temp_c;
            const weatherCondition = response.data.current.condition.text;
  
            document.getElementById('weather').textContent = `Weather in ${location}: ${temperature}°C, ${weatherCondition}`;
          })
          .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById('weather').textContent = 'Unable to fetch weather data';
          });
      });
    } else {
      document.getElementById('weather').textContent = 'Geolocation is not supported by your browser';
    }
  }
  
  // Funktion för att visa aktuell tid och datum
  function showCurrentTime() {
    const currentTime = new Date();
    const formattedTime = currentTime.toLocaleTimeString();
    const formattedDate = currentTime.toLocaleDateString();
  
    document.getElementById('time').textContent = `Current time: ${formattedTime}, ${formattedDate}`;

  }

  function getCatFact() {
    const proxyUrl = 'https://api.allorigins.win/raw?url=';
    const apiUrl = 'https://catfact.ninja/fact';

    axios.get(proxyUrl + apiUrl)
      .then(response => {
        const catFact = response.data.fact;
        document.getElementById('catFact').textContent = `Cat Fact: ${catFact}`;
      })
      .catch(error => {
        console.error('Error fetching cat fact:', error);
        document.getElementById('catFact').textContent = 'Unable to fetch cat fact';
      });
}

function getRandomCocktail() {
  const apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

  axios.get(apiUrl)
    .then(response => {
      const cocktail = response.data.drinks[0];
      const cocktailName = cocktail.strDrink;
      const cocktailInstructions = cocktail.strInstructions;
      const cocktailImageUrl = cocktail.strDrinkThumb;

      const cocktailImageElement = document.getElementById('cocktailImage');
      cocktailImageElement.src = cocktailImageUrl;

     
      cocktailImageElement.onload = function() {
       
        const imageWidth = this.width;
        document.getElementById('cocktailInstructions').style.width = `${imageWidth}px`;
      }

      document.getElementById('cocktailName').textContent = cocktailName;
      document.getElementById('cocktailInstructions').textContent = cocktailInstructions;
    })
    .catch(error => {
      console.error('Error fetching cocktail:', error);
      document.getElementById('cocktail').textContent = 'Unable to fetch cocktail';
    });
}

  
  window.onload = function() {
getBackgroundImage();
getCurrentWeather();
showCurrentTime();
getCatFact();
getRandomCocktail();}