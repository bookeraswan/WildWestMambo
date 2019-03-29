var S = select => document.querySelector(select);
var C = elm => document.createElement(elm);

var activityTypes = document.querySelectorAll("#event-nav li");
var loader = S("svg");

activityTypes.forEach(acti => {
    acti.onclick = function(){
        activityTypes.forEach(e => e.classList.remove("active"));
        this.classList.add("active");
        let type = acti.textContent.toLowerCase();
        while (S("#activities").lastChild && S("#activities").lastChild !== loader) {
            S("#activities").lastChild.remove();
        }
        loader.style.opacity = 1;
        Ajax({
            method: "GET",
            url: `/json/${type}.json`
        })
        .then(function(res){
            loader.style.opacity = 0;
            return res;
        })
        .then(renderActivities);
    }
});

document.onreadystatechange = function(){
    if (document.readyState == 'interactive') {
        activityTypes[2].click();
    }
}

function renderActivities(acts){
    acts.forEach(function(act){
        let event = C("div"),
            imgCon = C("div"),
            img = C("img"),
            name = C("h2"),
            date = C("p"),
            dateEm = C("em"),
            desc = C("p");
        event.classList.add("event");
        imgCon.classList.add("event-img-con");
        img.src = act.image;
        img.alt = `Imagen para promocion de ${act.name}`;
        name.textContent = act.name;
        dateEm.textContent = act.date;
        desc.textContent = act.desc;
        imgCon.append(img);
        event.append(imgCon);
        event.append(name);
        date.append(dateEm);
        event.append(date);
        event.append(desc);
        if(act.lg){
            event.classList.add("act-lg");
        }
        S("#activities").append(event);
    });
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