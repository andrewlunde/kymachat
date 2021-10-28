// https://youtu.be/WTOOse-Flj8?t=1728
// https://github.wdf.sap.corp/pages/cap/node.js/transactions#cds-spawn

const cds = require('@sap/cds');
const util = require('util');


global.__base = __dirname + "/"
console.log(global.__base)
console.log(`CDS Custom Boostrap from /srv/server.js`)

// https://cap.cloud.sap/docs/node.js/cds-serve#cds-server

// cds.on('bootstrap', async () => {
//     if (cds.env.requires.db.dialect == "sqlite") {
//         const db = await cds.connect.to('db');
//         // await db.tx();
//         // https://www.sqlite.org/pragma.html#pragma_synchronous
//         // Example in the node-sqlite3 driver tests
//         // https://github.com/mapbox/node-sqlite3/blob/master/test/backup.test.js#L258
//         // await db.run("PRAGMA synchronous = 2");
// //       await db._execute.sql("PRAGMA synchronous = FULL");
//         // await db.commit();

//         // const locsqlite = require('sqlite3').verbose();
//         // const dbloc = new locsqlite.Database(cds.env.requires.db.credentials.database);

//         // var cdsdb = db;
//         // var dbh1 = cdsdb.dbcs;
//         // var dbh3 = "";
//         // dbh1.forEach(function (value, key) {
//         //     dbh3 = value;
//         // });
//         // //await dbh3.exec("PRAGMA synchronous = FULL");
//         // await dbloc.exec("PRAGMA synchronous = FULL");
//     }
// })

// module.exports = cds.server; //> delegate to default server.js

// module.exports = async srv => {
 
//     const db = await cds.connect.to('db')
   
//     const _orBegin = db.begin
//     const _orCommit = db.commit
   
//     db.begin = async function() {
//       const tx = this.context ? this : this.tx()
//       tx.dbc = await tx.acquire(tx.context)
//       return tx
//     }
//     db.commit = async function() {
//         this.release(this.dbc)

//     }

//     // await db.send('PRAGMA synchronous = full')

//     db.begin = _orBegin
//     db.commit = _orCommit        
     
// }
  

// cds.on('bootstrap', async () => {
//     console.log("ON BOOTSTRAP");
// });

cds.on('bootstrap', app => {
    // A one-time event, emitted immediately after the express.js app has been created and before any middleware or CDS services are added to it.
    console.log("ON BOOTSTRAP");
    // console.log("app: " + util.inspect(app,false,1));

    const cors = require('cors');
    app.use(cors());
    app.use((req, res, next) => {
        console.log("REQ: " + util.inspect(req.url,false,1));
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    });
    
    app.get("/trustee", function (req, res) {

        var responseStr = "";
        responseStr += "<!DOCTYPE HTML><html><head><title>ThetaTrustee</title></head><body><h1>theta-trustee</h1><br />";
        responseStr += "<a href=\"/trustee/links\">The NodeJS Links page.</a><br />";
        responseStr += "<br />";
        responseStr += "<a href=\"/\">Return to home page.</a><br />";
        responseStr += "</body></html>";
        res.status(200).send(responseStr);
    });
    
    app.get("/trustee/links", function (req, res) {

        var responseStr = "";
        responseStr += "<!DOCTYPE HTML><html><head><title>ThetaTrustee</title></head><body><h1>theta-trustee</h1><br />";
        responseStr += "<a href=\"/trustee\">Back to Trustee page.</a><br />";
        responseStr += "<br />";
    
        responseStr += "<br />";
    
        responseStr += "<a href=\"/\">Return to home page.</a><br />";
        responseStr += "</body></html>";
        res.status(200).send(responseStr);
    });
    
    // //CDS REST Handler
    // let restURL = "/rest/"

    // cds.serve('CatalogService')
    //     .from(global.__base + "/gen/csn.json")
    //     .to("rest")
    //     .at(restURL + 'catalog')
    //     .in(app)
    //     .catch((err) => {
    //         console.error("ERR: " + util.inspect(err,false,1));
    //         //app.logger.error(err);
    //     });

});

cds.once('bootstrap', async (app) => {
    // A one-time event, emitted immediately after the express.js app has been created and before any middleware or CDS services are added to it.
    console.log("ONCE BOOTSTRAP");
    // console.log("app: " + util.inspect(app,false,1));
});

cds.on('loaded', async (csn) => {
    // Emitted whenever a CDS model got loaded using cds.load()
    console.log("ON LOADED");
    // console.log("csn: " + util.inspect(csn,false,1));
});

cds.on('serving', async (service) => {
    // Emitted for each service constructed by cds.serve.
    console.log("ON SERVING");
    // console.log("service: " + util.inspect(service,false,1));
});

cds.on('connect', async (service) => {
    // Emitted for each service constructed through cds.connect.
    console.log("ON CONNECT");
    // console.log("service: " + util.inspect(service,false,1));
});

cds.on('subscribe', async (service, event) => {
    // Emitted whenever a handler is registered for a declared event with [srv.on].
    console.log("ON SUBSCRIBE");
    // console.log("service: " + util.inspect(service,false,1));
    // console.log("event: " + util.inspect(event,false,1));
});

cds.once('served', async (services) => {
    // A one-time event, emitted when all services have been bootstrapped and added to the express.js app.
    console.log("ONCE SERVED");
    // console.log("services: " + util.inspect(services,false,1));

    // Do any association fixup here when keys are cuid or not loaded from CSV files.
    let books = await SELECT`ID,TenantID,title,author_ID,genre`.from`Books`;
    // console.log("books: " + util.inspect(books, false, 1));
    let authors = await SELECT`ID,TenantID,name,genre`.from`Authors`;
    console.log("authors: " + util.inspect(authors, false, 1));

    books.forEach( async function (book) {
        console.log("book: " + util.inspect(book, false, 1));
        if (!book.author_ID) {
            console.log("author_ID: is null");
            authors.forEach( async function (author) {
                // Not ideal, but pick the last author that matches the book genre
                if (book.TenantID == author.TenantID) {
                    if (book.genre == author.genre) {
                        // console.log("match: " + author.ID);
                        let ures = await UPDATE.entity`Books`.set`author_ID = ${author.ID}` .where`ID = ${book.ID}`;
                        // console.log("ures: " + util.inspect(ures, false, 1));
                        // try {
                        //     let ubook = await SELECT.from(Books, book.ID).forUpdate();
                        //     //> ubook is locked for other transactions
                        //     await UPDATE(Books, book.ID).with({
                        //         author_ID: author.ID
                        //      });
                        //  } catch (e) {
                        //     //> failed to acquire the lock, likely because of timeout
                        //     console.error("error: " + util.inspect(e, false, 1));
                        //  }
                    }
                }
            });
        } else {
            console.log("author_ID: is set");
        }
    });
});

cds.once('listening', async (server,url) => {
    console.log("ONCE LISTENING");
    // console.log("server: " + util.inspect(server,false,1));
    // console.log("url: " + util.inspect(url,false,1));

//     const db = await cds.connect.to('db');
   
//     const _orBegin = db.begin;
//     const _orCommit = db.commit;
   
//     db.begin = async function() {
//         const tx = this.context ? this : this.tx();
//         tx.dbc = await tx.acquire(tx.context);
//         return tx;
//     }

//     db.commit = async function() {
//         this.release(this.dbc);
//     }

//     console.log("PRAGMA");

//     const pragresult = await db.send("PRAGMA synchronous = 2");

//     console.log("RESUME: " + pragresult);
    
//     db.begin = _orBegin;
//     db.commit = _orCommit;

});


// cds.on('*', req => {
//     console.log("ATTACH");
//     // cds.spawn(async () => {
//     //     await cds.db.run('ATTACH DATABASE "db/sub02.db" AS SUB');
//     // });
// });


module.exports = cds.server; //> delegate to default server.js

