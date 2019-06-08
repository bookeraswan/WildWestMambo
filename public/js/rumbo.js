var S = e => document.querySelector(e);
var C = e => document.createElement(e);

document.onreadystatechange = function() {
    if(document.readyState == "interactive"){
        main();
    }
}

function main(){
    Ajax({
        method: "GET",
        url: "/json/competidores.json"
    })
    .then(renderCompetidores)
    .then(r => {
        S("svg").style.opacity = 0;
    });
    setInterval(countDown, 500)
}

function renderCompetidores(people){
    people.forEach(person => {
        var pDiv = C("div"),
            imgDiv = C("div"),
            img  = C("img"),
            name = C("p");
        pDiv.classList.add("person");
        imgDiv.classList.add("img-con");
        img.src = person.image;
        img.alt = `Profile image for ${person.name}`;
        name.textContent = person.name;
        imgDiv.append(img);
        pDiv.append(imgDiv);
        pDiv.append(name);
        S(".competitors").append(pDiv);
    });
}

function countDown(){
    var trip = {
        day: 8,
        hour: 22,
        minute: 55,
        second: 0
    }
    var date = new Date();
    var day = Number(date.toDateString().substring(8, 10));
    var month = date.toDateString().substring(4, 7);
    var hour = Number(date.toTimeString().substr(0, 2));
    var minute = Number(date.toTimeString().substr(3, 2));
    var second = Number(date.toTimeString().substr(6, 2));
    var daysLeft = trip.day - day
    var hoursLeft = trip.hour - hour
    var minutesLeft = trip.minute - minute
    var secondsLeft =  trip.second - second
    if(month == "Jun"){
        daysLeft = daysLeft + 30
    }
    if(secondsLeft < 0){
        minutesLeft--
        secondsLeft = 60 + secondsLeft
    }
    if(minutesLeft < 0){
        hoursLeft--
        minutesLeft = 60 + minutesLeft
    }
    if(hoursLeft < 0){
        daysLeft--
        hoursLeft = 24 + hoursLeft
    }

    if(daysLeft < 0){
        daysLeft = "00"
        hoursLeft = "00"
        minutesLeft = "00"
        secondsLeft =  "00"
        S("#countdown").style.color = "#f00"
    }
    S("#days").textContent = `${daysLeft}d`
    S("#hours").textContent = `${hoursLeft}h`
    S("#minutes").textContent = `${minutesLeft}m`
    S("#seconds").textContent = `${secondsLeft}s`
}

function countDownColors(days, hours, minutes, seconds){

}

function Ajax(obj){
    var XHR = new XMLHttpRequest();
    var promise = new Promise(function(resolve, reject){
        XHR.onreadystatechange = function(){
            if(XHR.readyState == 4){
                if(XHR.status == 200){
                    var resp = JSON.parse(XHR.responseText);
                    resolve(resp);
                }else{
                    reject("Something went wrong");
                }
            }
        }
    });

    XHR.open(obj.method, obj.url);
    XHR.send(obj.body);
    return promise;
}

/*
var daysLeft = trip.day - day
        if(month == "Jun"){
            daysLeft = daysLeft + 30
        }
        var hoursLeft = trip.hour - hour
        var minutesLeft = trip.minute - minute
        var secondsLeft =  trip.second - second
        if(minutesLeft < 0){
            hoursLeft--
            minutesLeft = minutesLeft*-1
        }
*/