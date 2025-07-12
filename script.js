const API_KEY = `3265874a2c77ae4a04bb96236a642d2f`;

const form = document.querySelector("form");
const search = document.querySelector("#search");
const weather = document.querySelector("#weather");

// Fetch weather data
const getWeather = async (city) => {
    weather.innerHTML = `<h5>Loading...</h5>`;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        showWeather(data);
    } catch (error) {
        weather.innerHTML = `<h6>Error fetching data</h6>`;
        console.error("Fetch error:", error);
    }
};

// Display weather data
const showWeather = (data) => {
    if (data.cod === "404") {
        weather.innerHTML = `<h2>City Not Found</h2>`;
        return;
    }

    weather.innerHTML = `
        <div>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather icon">
        </div>
        <div>
            <h2>${data.main.temp} ℃</h2>
            <h4>${data.weather[0].main}</h4>
        </div>
    `;
};

// Handle form submit
form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form refresh
    const city = search.value.trim();
    if (city !== "") {
        getWeather(city);
    }
});
