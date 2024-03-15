module.exports = function(app) {
    app.get("/authors", function(req, res) {
        let authors=[{
            "name": "author1",
            "group": "grupo1",
            "role": "rol1"
        }, {
            "name": "author2",
            "group": "grupo2",
            "role": "rol2"
        }, {
            "name": "author3",
            "group": "grupo3",
            "role": "rol3"
        }];
        let response={
            authors:authors
        };
        res.render("authors/authors.twig",response);
    });
    app.get('/authors/add', function (req, res) {
        res.render("authors/add.twig");
    });
    app.post('/authors/add', function (req,res){
        let nullParameter="no enviado en la petición"
        let response="Autor agregado: "+(req.body.name||"name "+nullParameter)+"<br>"
            + " grupo: "+(req.body.group||"group "+nullParameter)+"<br>"
            + " rol: "+(req.body.role||"role "+nullParameter)
        res.send(response)
    });
    app.get('/authors**', function (req,res){
        res.redirect('/authors')
    });

};