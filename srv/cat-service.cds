using my.bookshop as my from '../db/data-model';

service CatalogService {
    //@readonly entity Books as projection on my.Books;
    entity Authors as projection on my.Authors;
    entity Books as projection on my.Books;
    entity Customers as projection on my.Customers;
    entity Config as projection on my.Config;
}
