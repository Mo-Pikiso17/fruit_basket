module.exports = function FruitB(pool) {

    async function findAll(fruit) {
        
        var data = await pool.query("SELECT * FROM fruit_basket WHERE fruit_name = $1", [fruit]);
        
        console.log(data)

        return data.rows
    }


    async function updateQ(fruit, qty, pr) {

        var fruits = await pool.query("SELECT * FROM fruit_basket WHERE fruit_name = $1", [fruit]);

        if (fruits.rows.length == 0) {

            return await pool.query("INSERT INTO fruit_basket (fruit_name,quantity,price) VALUES($1, $2, $3)", [fruit, qty, pr]);

        } else {
            return await pool.query("UPDATE fruit_basket SET quantity =  quantity + qty WHERE name = $1", [fruit]);

        }

    }

    async function total_Price() {

        var fruits = await pool.query("SELECT sum(price) from fruit_basket WHERE fruit_name = 'apple'");

        return fruits;

    }

    async function sum_Quantity() {

        var fruits = await pool.query("SELECT sum(quantity) from fruit_basket");

        return fruits;

    }




    return {
        findAll,
        updateQ,
        total_Price,
        sum_Quantity
    }
}