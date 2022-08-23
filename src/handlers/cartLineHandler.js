const { createCartLine ,deleteCartline,updateCartline}=require("../controllers/cartLineController");
const {cart_line,update_cart_line,add_cart_line}=require("../schemas/cartSchema");

const newcartLine ={
    schema:cart_line,
    handler:createCartLine
};
const deleteCartlineById={
    schema:cart_line,
    handler:deleteCartline
};
const updateCartlineById={
    schema:update_cart_line,
    handler:updateCartline
}
module.exports = {newcartLine,deleteCartlineById,updateCartlineById};