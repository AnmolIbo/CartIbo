const {createCart,getCartDetails}=require("../controllers/cartController");
const {cartSchema,get_cart_detail}=require("../schemas/cartSchema");
const newcart ={
    schema:cartSchema,
    handler:createCart
};
const getcartByID = {
    schema:get_cart_detail,
    handler:getCartDetails
}
module.exports = {newcart,getcartByID};