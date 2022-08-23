const {newcart,getcartByID} =require("../handlers/cartHandlers")
 


function cartRoutes(fastify, options, done) {
  fastify.post("/cart",newcart );;
  fastify.get("/cart/:cart_id",getcartByID);
  fastify.register(require("./cartLineRoute"),{prefix:"/cart/:cart_id"})
  done();
}
module.exports = cartRoutes;
