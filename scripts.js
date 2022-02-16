/* document.getElementById("momCar")
    ^This will return the car element.

    if var car is the element
    car.style will return inline style elements.
*/

/*
    Once a pixel value is obtained, all that is required
    is changing that value with JS.

    Also, the fail condition can be based on the car's current
    position.
*/
position = 0;
var jsonData = "";

function failFunction() {
    var position = 0;
    var a = document.getElementById("momCar");
    var b = document.getElementById("buttonPanel");
    var z = document.getElementById("FIRE");
    var r = document.getElementById("reset");
    const music = new Audio("SMASH.wav");
    a.style["top"] = "425px";
    a.style["left"] = "253px";
    if (a.style.display === "inline") {
        a.style.display = "none";
        b.style.display = "none";
        z.style.display = "block";
        r.style.display = "inline";

        music.play();
        music.loop = false;
    } else {
        a.style.display="inline";
        b.style.display="inline";
        z.style.display = "none";
        r.style.display = "none";
    };
};

function driveFunction(id) {
    var question = document.getElementById("question");
    var car = document.getElementById("momCar");
    if (id=="straight" && position == 0) {
        position = 1;
        car.style["top"] = "250px";
        car.style["left"] = "253px";
    } else if (id=="left" && position == 1) {
        position = 2;
        car.style["top"] = "225px";
        car.style["left"] = "90px";
        car.style["transform"] = "rotate(270deg)";
    } else if (id=="right" && position == 2) {
        position = 3;
        car.style["top"] = "125px";
        car.style["left"] = "90px";
        car.style["transform"] = "rotate(0deg)";
    } else if (id=="right" && position == 3) {
        position = 0;
        car.style["top"] = "125px";
        car.style["left"] = "460px";
        $.when(fetchWeather()).done(function() {
            question.textContent = weatherCheck(jsonData);
        })
    } else {
        failFunction();
    };
};

function fetchWeather() {
    $.ajax({
        url: "https://api.open-meteo.com/v1/forecast?latitude=40.4167&longitude=-3.7033&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=Europe%2FLondon",
        method: "GET",
        async: false,
        data: { },
        success:function(data) {
            jsonData = eval(data);
        }
    });
}

function weatherCheck(json) {
    try {
        if (json.current_weather.weathercode === 3) {
            return "Yes, the rain DOES fall on the plain!";
        } else {
            return "No.";
        };
    } catch(err) {
        console.log(err);
        return "Ask again later!";        
    }
};