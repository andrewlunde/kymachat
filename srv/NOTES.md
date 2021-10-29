cds build #Generates gen/srv
mkdir -p gen/srv/db #Creates folder for SQLite db
cds deploy --to sqlite:gen/srv/db/prov.db
cd gen/srv
npm i --production
npm start

