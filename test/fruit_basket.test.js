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
describe('The basic database for fruit_basket', function () {

    let fruitDB = FruitB(pool);


    beforeEach(async function () {
        // clean the tables before each test run
        await pool.query("DELETE FROM fruit_basket;");
        // await pool.query("delete from categories;");
        await pool.query("INSERT INTO fruit_basket(fruit_name, quantity, price)VALUES($1, $2, $3)", ['Apple', 3, 2]);
    });


    it('should get the fruit basket', async function () {
        let b = await fruitDB.findAll('Apple');
        // let fruitDB = FruitB(pool, ['Apple']);

        assert.deepEqual([{fruit_name:'Apple'}], b);

    });

    
    it('should get the quantity of fruit basket', async function () {
        let b = await fruitDB.updateQ('Apple', 2, 2);
        // let fruitDB = FruitB(pool, ['Apple']);

        assert.deepEqual([{quantity: 5, price: 2}], await fruitDB.getQ_Price());

    });


    it('should get the sum of the total price of a fruit basket', async function () {
        await fruitDB.updateQ('Orange', 2, 2.00);
        await fruitDB.updateQ('Pear', 2, 5.00);

        // let fruitDB = FruitB(pool, ['Apple']);

        assert.deepEqual({total_price: '2.00'}, await fruitDB.total_Price('Orange'));
        assert.deepEqual({total_price: '5.00'}, await fruitDB.total_Price('Pear'));


    });

    it('should get the sum of the total price of the Orange fruit basket', async function () {
        await fruitDB.updateQ('Orange', 2, 2.00);
        await fruitDB.updateQ('Orange', 4, 2.00);



        assert.deepEqual({totals: 4.00}, await fruitDB.total_P());
    });


    it('should get the sum of the total quantity of the fruit baskets', async function () {
        let b = await fruitDB.findAll('Apple');

        await fruitDB.updateQ('Orange', 2, 2.00);
        await fruitDB.updateQ('Pear', 2, 5.00);
        await fruitDB.updateQ('Banana', 5, 5.00);
        await fruitDB.updateQ('Banana', 6, 5.00);
        await fruitDB.updateQ('Strawberry', 2, 5.00);

        assert.deepEqual({total: '20'}, await fruitDB.sum_Quantity());
                // assert.deepEqual({total_price: '5.00'}, await fruitDB.total_Price('Pear'));
    });

    it('should get the sum of the total quantity of the Apple and Bannana fruit baskets', async function () {
        let b = await fruitDB.findAll('Apple');

        await fruitDB.updateQ('Banana', 5, 5.00);
        await fruitDB.updateQ('Banana', 6, 5.00);

        assert.deepEqual({total: '14'}, await fruitDB.sum_Quantity());
    });



    after(function () {
        pool.end();
    })

});

