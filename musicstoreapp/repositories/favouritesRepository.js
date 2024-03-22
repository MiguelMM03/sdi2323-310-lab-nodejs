module.exports = {
    mongoClient: null,
    app: null,
    database: "musicStore",
    collectionName: "favourites",
    init: function (app, dbClient) {
        this.dbClient = dbClient;
        this.app = app;
    },
    getFavourites: async function (filter, options) {
        try {
            await this.dbClient.connect();
            const database = this.dbClient.db(this.database);
            const favouritesCollection = database.collection(this.collectionName);
            const favourites = await favouritesCollection.find(filter, options).toArray();
            return favourites;
        } catch (error) {
            throw (error);
        }
    },
    insertFavourite: function (favourite, callbackFunction) {
        this.dbClient.connect()
            .then(() => {
                const database = this.dbClient.db(this.database);
                const favouritesCollection = database.collection(this.collectionName);
                favouritesCollection.insertOne(favourite)
                    .then(result => callbackFunction({songId: result.insertedId}))
                    .then(() => this.dbClient.close())
                    .catch(err => callbackFunction({error: err.message}));
            })
            .catch(err => callbackFunction({error: err.message}))
    },
    deleteFavourite: async function (filter, options) {
        try {
            await this.dbClient.connect();
            const database = this.dbClient.db(this.database);
            const favouritesCollection = database.collection(this.collectionName);
            const result = await favouritesCollection.deleteOne(filter, options);
            return result;
        } catch (error) {
            throw (error);
        }
    }
};