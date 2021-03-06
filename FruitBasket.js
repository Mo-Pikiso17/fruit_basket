module.exports = function FruitB(pool) {


    async function insertBasket(fruit, qty, pr) {

        var fruits = await pool.query("SELECT * FROM fruit_basket WHERE fruit_name = $1", [fruit]);

        if (fruits.rows.length == 0) {

            return await pool.query("INSERT INTO fruit_basket (fruit_name,quantity,price) VALUES($1, $2, $3)", [fruit, qty, pr]);
        } 

    }

    async function updateQ(fruit, qty) {
        var updateFruit = await pool.query("UPDATE fruit_basket SET quantity =  quantity + $1 WHERE fruit_name = $2", [qty,fruit]);
        return updateFruit.rows;
}

    async function findAll() {
        
        var data = await pool.query("SELECT fruit_name FROM fruit_basket");
        return data.rows
    }

    async function getQ_Price() {
        
        var data = await pool.query("SELECT quantity, price FROM fruit_basket");
        
        return data.rows
    }

    

    async function total_Price(fruit) {

        var fruits = await pool.query("SELECT sum(price) AS total_Price from fruit_basket WHERE fruit_name = $1", [fruit]);
        return fruits.rows[0];

    }

    async function total_P() {

        var fruits = await pool.query("SELECT sum(price) AS totals from fruit_basket");
        return fruits.rows[0];

    }

    async function sum_Quantity() {

        var fruits = await pool.query("SELECT sum(quantity) AS total from fruit_basket");
        return fruits.rows[0];

    }


    return {
        insertBasket,
        findAll,
        getQ_Price,
        updateQ,
        total_Price,
        total_P,
        sum_Quantity
    }
}