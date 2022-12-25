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

let apiKey = "7290e5cc29e74c82f07ec1f53deb5cd3";
let units = "metric";
let cityDefault = "Barcelona";

let date = document.querySelector(".date");
let day = document.querySelector(".day");
let time = document.querySelector(".time");

let now = new Date();

date.innerHTML = `${months[now.getMonth()]}, ${now.getDate()}`;
day.innerHTML = `${days[now.getDay()]}`;
time.innerHTML = `${now.getHours()}:${now.getMinutes()}`;

let city = document.querySelector("#city");
city.innerHTML = `${cityDefault}`;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityDefault}&appid=${apiKey}&units=${units}`;
axios.get(apiUrl).then(function (response) {
	console.log(response);
	let temperature = Math.round(response.data.main.temp);
	let desc = document.querySelector("#desc");
	let temp = document.querySelector("#temp");
	let precip = document.querySelector("#precipitation");
	let humid = document.querySelector("#humidity");
	let wind = document.querySelector("#wind");
	temp.innerHTML = temperature;
	desc.innerHTML = response.data.weather[0].main;
	precip.innerHTML = response.rain ? response.rain["1h"] : 0;
	humid.innerHTML = response.data.main.humidity;
	wind.innerHTML = Math.round(response.data.wind.speed);
});

let button = document.querySelector("#search");
button.addEventListener("click", showWeather);
button.addEventListener("keypress", showWeather);
function showWeather(event) {
	event.preventDefault();
	let city = document.querySelector("#city");
	let search = document.querySelector("#exampleFormControlInput1");
	let value = search.value ? search.value : "Barcelona";
	city.innerHTML = `${value}`;
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${search.value}&appid=${apiKey}&units=${units}`;

	axios.get(apiUrl).then(function (response) {
		let temperature = Math.round(response.data.main.temp);
		console.log(response);
		let city = document.querySelector("#city");
		let cityVal = response.data.name;
		let temp = document.querySelector("#temp");
		let desc = document.querySelector("#desc");
		let precip = document.querySelector("#precipitation");
		let humid = document.querySelector("#humidity");
		let wind = document.querySelector("#wind");
		temp.innerHTML = temperature;
		city.innerHTML = `${cityVal}`;
		desc.innerHTML = response.data.weather[0].main;
		precip.innerHTML = response.data.rain ? response.data.rain["1h"] : 0;
		humid.innerHTML = response.data.main.humidity;
		wind.innerHTML = Math.round(response.data.wind.speed);
	});
}

// let cel = document.querySelector("#cel");
// let far = document.querySelector("#far");
// let temp = document.querySelector("#temp");
// far.addEventListener("click", function (event) {
//   event.preventDefault();
//   temp.innerHTML = 66;
// });
// cel.addEventListener("click", function (event) {
//   event.preventDefault();
//   temp.innerHTML = 19;
// });
