const {ObjectId} = require("mongodb");
module.exports = function(app,favouritesRepository) {
    app.get("/songs/favorites", function (req, res) {
        const filter = {user: req.session.user};
        favouritesRepository.getFavourites(filter, {})
            .then(
                songs => {
                    let totalPrice=songs.reduce((total, song) => total + song.price, 0);
                    let result={
                        songs:songs,
                        totalPrice:totalPrice
                    }

                    res.render("favourites.twig", result);
                }
            )
            .catch(error => res.status(500).send(error));
    });
    app.post("/songs/favorites/add", function (req, res) {
        const favourite = {
            songId: new ObjectId(req.body.id),
            date: new Date(),
            price: parseFloat(req.body.price),
            title: req.body.title,
            user: req.session.user
        };
        favouritesRepository.insertFavourite(favourite, function (result) {
            if (result.error) {
                res.status(500).send(result.error);
            } else {
                res.send("Favorito añadido correctamente");
            }
        });
    });
    app.get("/songs/favorites/delete/:id", function (req, res) {
        const filter = {songId: new ObjectId(req.params.id)};
        const options = {};
        favouritesRepository.deleteFavourite(filter, options)
            .then(() => res.send("Favorito eliminado correctamente"))
            .catch(error => res.status(500).send(error));
    });
};