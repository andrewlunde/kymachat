const cds = require('@sap/cds');
const util = require('util');

// https://cap.cloud.sap/docs/node.js/services

/**
 * Implementation for Catalog Service service defined in ./cat-service.cds
 */
module.exports = cds.service.impl(async function() {
 
    // this.on('READ', 'Books', async (req, next) => {
    //     console.log("ATTACH before-spawn");
    //     cds.spawn({}, async () => {
    //         // ATTACH statement seems to have no effect in this context.
    //         // await cds.db.run('ATTACH DATABASE \'db/sub01.db\' AS SUB');
    //         const tx = cds.tx(req);
    //         await tx.run('ATTACH DATABASE \'db/sub01.db\' AS SUB');
    //         const schema = await cds.db.run('SELECT * FROM sqlite_master');
    //         console.log("SCHEMA: " + util.inspect(schema,false,3));
    //         console.log("ATTACH after-spawn");
    //         return next();
    //     });
    // });


    // this.before ('*','Books', async (req) => {
    //     // console.log("req: " + util.inspect(req,false,2));
    //     console.log("before Books: ");

    //     const db = await cds.connect.to('db');
    //     await db.tx();
    //     await db.run('ATTACH DATABASE \'db/sub01.db\' AS SUB');
    //     await db.commit();

    //     console.log("ATTACH");

    // });

    // this.on ('READ','Books', async (req,next) => {
	//     // Need to alter the query to add a WHERE SubID == 0x1234 clause
    //   // console.log("req: " + util.inspect(req,false,1));
    //   console.log("on READ Books: ");
	//     const books = await next();
	//     if ( 1 == 1) {
	// 	    //return cds.tx(req).run(SELECT.from(Books));
    //   		console.log("res: " + util.inspect(books,false,3));
	// 	    // return books;
	// 	    return [ { SubID: '0x1234', ID: 1, title: 'Wuthering Heights', stock: 99, code: 0 },
	// 		  { SubID: '0x1234', ID: 2, title: 'Jane Eyre', stock: 499, code: 0 } ];
	//     } else {
	// 	   return next();
	//     }
    // });

    this.before('READ', 'Books', req => {
        req.query.where("TenantID = '6af31eb5-7905-42da-b1d4-c6646b6e9437'");
    });

    // this.before('CREATE', 'Books', req => {
    //     req.query.where("SubID = '0x1234'");
    // });

    this.after('READ', 'Books', booksData => {
        const books = Array.isArray(booksData) ? booksData : [booksData];
        books.forEach(book => {
            if (book.stock >= 100) {
                book.code = 1;
            } else {
                book.code = 2;
            }
        });
      	console.log("after READ Books: ");
    });

});

