import express, { static } from "express";
import { readFile } from 'fs';
const app = express();

function readJSON(file, callback){
    readFile(__dirname + `/json/${file}.json`, (err, data) => {
        if (err) throw err;
        var parsedData = JSON.parse(data);
        callback(parsedData)
    });
}

app.set("view engine", "ejs");
app.use(static("public"));


app.get("/", function(req, res) {
    res.render("home", {phoneNumber: "787-951-6794"});
});

app.get("/clases", function(req, res) {
    readJSON("classes", clases => {
        res.render("clases", {clases: clases});
    })
});

app.get("/actividades", (req, res) => 
    res.render("actividades")
);

app.get("/api/actividades/:file", (req, res) =>{
    readJSON(req.params.file, data => res.json(data))
})

app.get("/rumbo_a_colombia", (req, res) =>
    res.render("rumbo")
);

app.get("*", (req, res) =>
    res.redirect("/")
);

app.listen(process.env.PORT, process.env.IP, () => console.log("Wild West Mambo Server has started"));