const {newcartLine,deleteCartlineById,updateCartlineById} =require("../handlers/cartLineHandler")
function cartLineRoutes(fastify, options, done) {
  fastify.post("/cart_line",newcartLine);
  fastify.delete("/cart_line/:cart_line_id",deleteCartlineById);
  fastify.patch("/cart_line/:cart_line_id",updateCartlineById);
  done()
}
module.exports = cartLineRoutes

