'use strict';

const assert = require('assert');
const FruitB = require('../FruitBasket');
const pg = require("pg");
const Pool = pg.Pool;


let useSSL = false;

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:moddy123@localhost:5432/fruitbase';

const pool = new Pool({
    connectionString,
    ssl: useSSL

});

// DATABASE TEST
describe('The basic database for fruit basket', function () {

    // let fruitDB = FriutB(pool);


    beforeEach(async function () {
        // clean the tables before each test run
        await pool.query("delete from fruit_basket");
        // await pool.query("delete from categories;");
        await pool.query("INSERT INTO fruit_basket(fruit_name, quantity, price)VALUES($1, $2, $3)", ['Apple', 3, 2]);
    });


    it('should get the fruit basket', async function () {

        let fruitDB = FruitB(pool['Apple']);

        assert.deepEqual([{fruit_name:'Apple'}], await fruitDB.findAll());

    });

    

    // it('should return a greeting using the database', async function () {

    //     await fruitDB.pushName("Ndalo", "Hello");

    //     var data = "Hello, Ndalo"
        

    //     let categories = await fruitDB.getValueFromDb()
    //     var msg = categories.rows[0].language + ", " + categories.rows[0].name

    //     assert.equal(data, msg);
    // });



    after(function () {
        pool.end();
    })

});

