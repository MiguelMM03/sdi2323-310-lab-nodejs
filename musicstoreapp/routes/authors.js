const {response} = require("express");
let authors = [{
    "name": "author1",
    "group": "grupo1",
    "role": "cantante"
}, {
    "name": "author2",
    "group": "grupo2",
    "role": "cantante"
}, {
    "name": "author3",
    "group": "grupo3",
    "role": "trompetista"
},{
    "name": "J.K. Rowling",
    "group": "British",
    "role": "cantante"
},{
    "name": "John Grisham",
    "group": "American",
    "role": "trompetista"
},{
    "name": "Toni Morrison",
    "group": "African American",
    "role": "saxofonista"
},{
    "name": "Donna Tartt",
    "group": "American",
    "role": "pianista"
}
];
module.exports = function(app) {
    app.get("/authors", function (req, res) {

        let response = {
            authors: authors
        };
        res.render("authors/authors.twig", response);
    });
    app.get('/authors/add', function (req, res) {
        let roles = [
            { "name": "cantante"},
            { "name": "trompetista"},
            { "name": "violinista"},
            { "name": "saxofonista"},
            { "name": "pianista"}
        ];
        let response={
            roles:roles
        };
        res.render("authors/add.twig", response);
    });
    app.post('/authors/add', function (req, res) {
        let nullParameter = "no enviado en la petición"
        let response = "Autor agregado: " + (req.body.name || "name " + nullParameter) + "<br>"
            + " grupo: " + (req.body.group || "group " + nullParameter) + "<br>"
            + " rol: " + (req.body.role || "role " + nullParameter)
        res.send(response)
    });
    app.get('/authors/filter/:role', function (req, res) {
        let role=req.params.role;
        let result=authors.filter(a=>a.role===role)
        let response={
            authors:result
        }

        res.render("authors/authors.twig", response);
    });

    app.get('/authors**', function (req, res) {
        res.redirect('/authors')
    });

};