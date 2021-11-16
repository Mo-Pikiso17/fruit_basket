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

        assert.deepEqual([{fruit_name:'Apple'}], b);

    });

    
    it('should get the quantity of fruit basket', async function () {
        let b = await fruitDB.updateQ('Apple', 2, 2);

        assert.deepEqual([{quantity: 5, price: 2}], await fruitDB.getQ_Price());

    });


    it('should get the sum of the total price of a fruit basket', async function () {
    
        await fruitDB.updateQ('Apple', 2);
        assert.deepEqual({total_price: '2.00'}, await fruitDB.total_Price('Apple'));
    });


    it('should get the sum of the total price of the Orange fruit basket', async function () {
        await fruitDB.insertBasket('Orange', 2, 2.00);
        await fruitDB.insertBasket('Orange', 4, 2.00);

        assert.deepEqual({totals: 4.00}, await fruitDB.total_P());
    });


    it('should get the sum of the total quantity of the Apple and Bannana fruit baskets', async function () {
        let b = await fruitDB.findAll('Apple');

        await fruitDB.insertBasket('Banana', 5, 5.00);
        await fruitDB.insertBasket('Peach', 6, 5.00);

        assert.deepEqual([
            {
              price: '2.00',
              quantity: 3
            },
            {
              price: '5.00',
              quantity: 5
            },
            {
              price: '5.00',
              quantity: 6
            }
          ], await fruitDB.getQ_Price());

    });



    after(function () {
        pool.end();
    })

});

