let days = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];

let months = [
	"January",
	"February",
	"Match",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

let apiKey = "ca15ao538b1b1403fb9fb4b9aaa0tf25";
let units = "metric";
let cityDefault = "Barcelona";

function showCurrentDateTime() {
	let date = document.querySelector(".date");
	let day = document.querySelector(".day");
	let time = document.querySelector(".time");

	let now = new Date();

	date.innerHTML = `${months[now.getMonth()]}, ${now.getDate()}`;
	day.innerHTML = `${days[now.getDay()]}`;
	let minutes = now.getMinutes();
	time.innerHTML = `${now.getHours()}:${
		minutes < 10 ? `0${minutes}` : minutes
	}`;
}

function showDefaultCityTemperature() {
	let city = document.querySelector("#city");
	city.innerHTML = `${cityDefault}`;
	let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityDefault}&key=${apiKey}&units=${units}`;
	axios.get(apiUrl).then(function (response) {
		console.log(response);
		celciusTemp = response.data.temperature.current;
		let temperature = Math.round(celciusTemp);
		let desc = document.querySelector("#desc");
		let temp = document.querySelector("#temp");
		let precip = document.querySelector("#precipitation");
		let humid = document.querySelector("#humidity");
		let wind = document.querySelector("#wind");
		let icon = document.querySelector("#icon");
		temp.innerHTML = temperature;
		desc.innerHTML = response.data.condition.description;
		precip.innerHTML = response.data.temperature.pressure;
		humid.innerHTML = response.data.temperature.humidity;
		wind.innerHTML = Math.round(response.data.wind.speed);
		icon.setAttribute("src", response.data.condition.icon_url);
	});
}

function searchWeather() {
	let button = document.querySelector("#search");
	button.addEventListener("click", showWeather);
	button.addEventListener("keypress", showWeather);

	function showWeather(event) {
		event.preventDefault();
		let city = document.querySelector("#city");
		let search = document.querySelector("#exampleFormControlInput1");
		let value = search.value ? search.value : "Barcelona";
		city.innerHTML = `${value}`;
		let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${search.value}&key=${apiKey}&units=${units}`;
		axios.get(apiUrl).then(function (response) {
			celciusTemp = response.data.temperature.current;
			let temperature = Math.round(celciusTemp);
			console.log(response);
			let city = document.querySelector("#city");
			let cityVal = response.data.city;
			let temp = document.querySelector("#temp");
			let desc = document.querySelector("#desc");
			let precip = document.querySelector("#precipitation");
			let humid = document.querySelector("#humidity");
			let wind = document.querySelector("#wind");
			let icon = document.querySelector("#icon");
			temp.innerHTML = temperature;
			city.innerHTML = `${cityVal}`;
			desc.innerHTML = response.data.condition.description;
			precip.innerHTML = response.data.temperature.pressure;
			humid.innerHTML = response.data.temperature.humidity;
			wind.innerHTML = Math.round(response.data.wind.speed);
			icon.setAttribute("src", response.data.condition.icon_url);
		});
	}
}

function showFarenheit() {
	let far = document.querySelector("#far");
	let cel = document.querySelector("#cel");
	let temp = document.querySelector("#temp");
	far.addEventListener("click", function (event) {
		event.preventDefault();
		let farTemp = (celciusTemp * 9) / 5 + 32;
		temp.innerHTML = Math.round(farTemp);
		far.classList.add("active");
		cel.classList.remove("active");
	});
}

function showCelcius() {
	let far = document.querySelector("#far");
	let cel = document.querySelector("#cel");
	let temp = document.querySelector("#temp");
	cel.addEventListener("click", function (event) {
		event.preventDefault();
		temp.innerHTML = Math.round(celciusTemp);
		far.classList.remove("active");
		cel.classList.add("active");
	});
}

let celciusTemp = null;
showCurrentDateTime();
showDefaultCityTemperature();
searchWeather();
showFarenheit();
showCelcius();
