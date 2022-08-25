const {newcart,getcartByID} =require("../handlers/cartHandlers")
 const db= require("../configs/db")


function cartRoutes(fastify, options, done) {
  fastify.get("/seed",(req,reply)=>{
    
    db.schema.hasTable("cart").then(function(exists) {
        if (!exists) {
          db.schema
            .createTable("cart", function(table) {
              
              table.uuid("cart_id").primary();
              table.string("order_number");
              table.string('user_id');
              table.specificType('cart_lines', 'jsonb[]');
              //For PostgreSQL, due to incompatibility between native array and json types, when setting an array (or a value that could be an array) as the value of a json or jsonb column, you should use JSON.stringify() to convert your value to a string prior to passing it to the query builder, e.g.
              //knex.table('users')
              // .where({id: 1})
              // .update({json_data: JSON.stringify(mightBeAnArray)});


            })
            .then(function() {
              const recordsLength = Array.from(Array(100).keys());
              const order_number=Math.ceil(Math.random()* 100000);
              const user_id =req.body.user_id;
              const records = recordsLength.map(rec => ({
                order_number,
                cart_lines:[],
                user_id
              }));
              db("cart")
                .insert(records)
                .then(() => {
                  reply.send("Seeded data");
                });
            });
        } else {
          reply.send("Table exists - Seeded data");
        }
      });
});
  fastify.post("/cart",newcart );;
  fastify.get("/cart/:cart_id",getcartByID);
  fastify.register(require("./cartLineRoute"),{prefix:"/cart/:cart_id"})
  done();
}
module.exports = cartRoutes;
