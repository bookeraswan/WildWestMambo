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