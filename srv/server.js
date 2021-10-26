// https://youtu.be/WTOOse-Flj8?t=1728
// https://github.wdf.sap.corp/pages/cap/node.js/transactions#cds-spawn

const cds = require('@sap/cds');

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
  

cds.on('bootstrap', async () => {
    console.log("ON BOOTSTRAP");
});

cds.once('bootstrap', async () => {
    console.log("ONCE BOOTSTRAP");
});

cds.on('loaded', async () => {
    console.log("ON LOADED");
});

cds.on('serving', async () => {
    console.log("ON SERVING");
});

cds.on('connect', async () => {
    console.log("ON CONNECT");
});

cds.on('subscribe', async () => {
    // console.log("ON SUBSCRIBE");
});

cds.once('served', async () => {
    console.log("ONCE SERVED");
});

// cds.once('listening', async () => {
//     console.log("ONCE LISTENING");

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

// });


// cds.on('*', req => {
//     console.log("ATTACH");
//     // cds.spawn(async () => {
//     //     await cds.db.run('ATTACH DATABASE "db/sub02.db" AS SUB');
//     // });
// });


module.exports = cds.server; //> delegate to default server.js

