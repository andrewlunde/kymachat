```
export DEBUG=sqlite

cds deploy db/common.cds --to sqlite:db/common.db
cds deploy db/data-model.cds --no-save --to sqlite:db/sub01.db
cds deploy srv/cat-service.cds --no-save --to sqlite:db/sub01.db
cds deploy db/data-model.cds --no-save --to sqlite:db/sub02.db
cds deploy srv/cat-service.cds --no-save --to sqlite:db/sub02.db


sqlite3 db/common.db

ATTACH DATABASE 'db/sub01.db' AS SUB;
update my_bookshop_Books set title = 'sub1' where SubID = '0xABCD';
DETACH DATABASE SUB;

ATTACH DATABASE 'db/sub02.db' AS SUB;
update my_bookshop_Books set title = 'sub2' where SubID = '0xABCD';
DETACH DATABASE SUB;

sqlite3 db/common.db

ATTACH DATABASE 'db/sub01.db' AS SUB;
select ID,title from my_bookshop_Books;
DETACH DATABASE SUB;

# Need this in ./cat-service.cds as normal "wrapped transaction"
BEGIN;
ATTACH DATABASE 'db/sub01.db' AS SUB;
COMMIT;
BEGIN;
select ID,title from my_bookshop_Books;
COMMIT;
BEGIN;
DETACH DATABASE SUB;
COMMIT;
```
