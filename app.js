var express = require("express");
var app = express();

var clases = [
    {
        title: "Chachacha",
        desc: "(guajira)",
        starts: "Lunes 8 Abril",
        time: "6:00pm-7:00pm",
        mof: "instructora:",
        instructor: "Norma Rivera"
    },
    {
        title: "Pachanga",
        starts: "Lunes 8 Abril",
        time: "7:00pm-8:00pm",
        mof: "instructora:",
        instructor: "Norma Rivera"
    },
    {
        title: "Timming",
        desc: "(Musicalidad)",
        starts: "Lunes 8 Abril",
        time: "8:00pm-9:00pm",
        mof: "instructora:",
        instructor: "Norma Rivera"
    },
    {
        title: "Salsa Basica 1",
        starts: "Miercoles 10 de Abril",
        time: "6:00pm-7:30pm",
        mof: "instructora:",
        instructor: "Yolanda Soto"
    },
    {
        title: "Salsa Basica Intermedia",
        desc: "(incluye salsa libre y parejas, chachacha guajira basica y bachata basica)",
        starts: "Miercoles 10 de Abril",
        time: "7:30pm-9:00pm",
        mof: "instructora:",
        instructor: "Yolanda Soto"
    }
];

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", function(req, res) {
    res.render("home", {phoneNumber: "787-951-6794"});
});

app.get("/clases", function(req, res) {
    res.render("clases", {clases: clases});
});

app.get("/actividades", function(req, res) {
    res.render("actividades");
});

app.get("/rumbo_a_colombia", function(req, res) {
    res.render("rumbo");
});

app.get("*", function (req, res) {
    res.redirect("/");
});

app.listen(process.env.PORT, process.env.IP, () => console.log("Wild West Mambo Server has started"));