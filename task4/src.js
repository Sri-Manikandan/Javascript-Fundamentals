const apiKey = "75127acfaf671bef0b4ac55b000484e7";

async function getWeather(){
    const input = document.getElementById("cityInput").value;
    const resultDiv = document.getElementById("weatherResult");

    if(!input){
        resultDiv.innerHTML = "Please enter a city name";
        return;
    }

    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}&units=metric`);
        if(!response.ok){
            throw new Error("City not found");
        }

        const data = await response.json();
        const temp = data.main.temp;
        const humidity = data.main.humidity;
        const condition = data.weather[0].description;

        resultDiv.innerHTML = `
            <p><strong>Temperature:</strong> ${temp}°C</p>
            <p><strong>Humidity:</strong> ${humidity}%</p>
            <p><strong>Condition:</strong> ${condition}</p>
        `;
    }catch(error){
        resultDiv.innerHTML = "Error: "+ error.message;
    }

}