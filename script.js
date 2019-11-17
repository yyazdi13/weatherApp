var place;
$("#submit").on("click", runAjax);

function runAjax(){
    place = $("#search").val().trim();
    var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + place + "&units=imperial&appid=65c2d57d5385fc26b3814a24c68ff22b";
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(response){
        console.log(response);
        var icon = response.weather["0"].icon;
        $("#results").css("visibility", "visible");
        $("#name").text(response.name + ": " + response.weather["0"].description);
        $("#date").text(moment().format('dddd, MMMM Do'));
        $("#temp").text(response.main.temp + "°F");
        $("#humid").text(response.main.humidity + "% humidity");
        $("#wind").text("wind speed: " + response.wind.speed);
        $("#icon").attr("src", "http://openweathermap.org/img/wn/" + icon + "@2x.png");
        var x = response.coord.lat;
        var y = response.coord.lon;
        getUV(x,y);
        forecast(place);
        doSearch(place);
    });
}

function getUV(x,y){
    var queryUrl = "http://api.openweathermap.org/data/2.5/uvi?appid=65c2d57d5385fc26b3814a24c68ff22b&lat=" + x + "&lon=" + y;
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(response){
        $("#uv").text("uv index: " + response.value);
    });
}

function forecast(place){
    var queryUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + place + "&units=imperial&appid=65c2d57d5385fc26b3814a24c68ff22b";
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(response){
        var icon = response.list["2"].weather["0"].icon;
        var icon2 = response.list["10"].weather["0"].icon;
        var icon3 = response.list["18"].weather["0"].icon;
        var icon4 = response.list["26"].weather["0"].icon;
        var icon5 = response.list["34"].weather["0"].icon;
        console.log(icon);
        console.log(response);
        $("#forecast").css("visibility", "visible");
        $("h4").text("Five day forecast");
        $("#day1").text("Date: " + response.list["2"].dt_txt + " " + response.list["2"].main.temp + "°F " + " humidity: " + response.list["2"].main.humidity);
        $("#one").attr("src", "http://openweathermap.org/img/wn/" + icon + "@2x.png");
        $("#day2").text("Date: " + response.list["10"].dt_txt + " " + response.list["10"].main.temp + "°F " + " humidity: " + response.list["10"].main.humidity);
        $("#two").attr("src", "http://openweathermap.org/img/wn/" + icon2 + "@2x.png");
        $("#day3").text("Date: " + response.list["18"].dt_txt + " " + response.list["18"].main.temp + "°F " + " humidity: " + response.list["18"].main.humidity);
        $("#three").attr("src", "http://openweathermap.org/img/wn/" + icon3 + "@2x.png");
        $("#day4").text("Date: " + response.list["26"].dt_txt + " " + response.list["26"].main.temp + "°F " + " humidity: " + response.list["26"].main.humidity);
        $("#four").attr("src", "http://openweathermap.org/img/wn/" + icon4 + "@2x.png");
        $("#day5").text("Date: " + response.list["34"].dt_txt + " " + response.list["34"].main.temp + "°F " + " humidity: " + response.list["34"].main.humidity);
        $("#five").attr("src", "http://openweathermap.org/img/wn/" + icon5 + "@2x.png");
    });
}

function doSearch(place){
    var place = $("#search").val();
    var store = [];
   localStorage.setItem(store, JSON.stringify(place));
   var recent = JSON.parse(localStorage.getItem(store));
   console.log(recent);
   store.push(recent);
   for (var i = 0; i < store.length; i++){
       var b = $("<button>")
       b.text(store[i]);
       $("body").append(b);
    }
    b.on("click", function home(){
        var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + recent + "&units=imperial&appid=65c2d57d5385fc26b3814a24c68ff22b";
        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function(response){
            console.log(response);
            var icon = response.weather["0"].icon;
            $("#results").css("visibility", "visible");
            $("#name").text(response.name + ": " + response.weather["0"].description);
            $("#date").text(moment().format('dddd, MMMM Do'));
            $("#temp").text(response.main.temp + "°F");
            $("#humid").text(response.main.humidity + "% humidity");
            $("#wind").text("wind speed: " + response.wind.speed);
            $("#icon").attr("src", "http://openweathermap.org/img/wn/" + icon + "@2x.png");
            $("#forecast").css("visibility", "hidden");
            
        });
    });

};

