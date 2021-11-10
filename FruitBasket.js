module.exports = function FruitB(pool) {

    async function findAll() {
        
        var data = await pool.query("SELECT fruit_name FROM fruit_basket");
        
        return data.rows
    }

    async function getQ_Price() {
        
        var data = await pool.query("SELECT quantity, price FROM fruit_basket");
        
        return data.rows
    }

    async function getPrice() {
        
        var data = await pool.query("SELECT price FROM fruit_basket");
        
        return data.rows
    }




    async function updateQ(fruit, qty, pr) {

        var fruits = await pool.query("SELECT * FROM fruit_basket WHERE fruit_name = $1", [fruit]);

        if (fruits.rows.length == 0) {

            return await pool.query("INSERT INTO fruit_basket (fruit_name,quantity,price) VALUES($1, $2, $3)", [fruit, qty, pr]);

        } else {
            return await pool.query("UPDATE fruit_basket SET quantity =  quantity + $1 WHERE fruit_name = $2", [qty,fruit]);

        }

    }

    async function total_Price(fruit) {

        var fruits = await pool.query("SELECT sum(price) AS total_Price from fruit_basket WHERE fruit_name = $1", [fruit]);
        return fruits.rows[0];

    }

    async function sum_Quantity() {

        var fruits = await pool.query("SELECT sum(quantity) AS total from fruit_basket");
        return fruits.rows[0];

    }




    return {
        findAll,
        getPrice,
        getQ_Price,
        updateQ,
        total_Price,
        sum_Quantity
    }
}