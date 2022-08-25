const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");
const db = require("../configs/db")
function createCart(req, reply) {
    try {
          const obj={
            cart_id:uuidv4(),
            order_number:Math.ceil(Math.random() * 100000),
            user_id:req.body.user_id,
            cart_lines:[]
          };
          db
          .insert(obj)
            .into("cart")
            .returning("*")
            .then(rows => {
                reply.send(rows[0])
            //   return rows[0];
            });
          // reply.code(201).send(obj);
       }
       
      
     catch (err) {
      reply.send(err);
    }
  };
  function getCartDetails(req, reply) {
    try {
      let { cart_id } = req.params;
  
      //will find that cart using cart_id;
  
      fs.readFile(
        path.join(__dirname, "../database") + "/cart.json",
        "utf-8",
        (err, data) => {
          if (err) throw new Error(err);
          else {
            data = JSON.parse(data);
  
            let requiredCart = data.filter((item) => {
              return item.cart_id == cart_id;
            });
  
            if (requiredCart.length == 0) return replyer(400, "Cart not found");
  
            requiredCart = requiredCart[0];
  
            //console.log(requiredCart);
  
            let total_quantity = 0;
            let cent_amount = 0;
  
            let total_items = requiredCart.cart_lines.length;
  
            requiredCart.cart_lines.forEach((item) => {
              //calculating the total cent_amount and total quantity;
              total_quantity += item.quantity.quantity_number;
              cent_amount +=
                item.unit_price.cent_amount * item.quantity.quantity_number;
            });
  
            let response = {
              cart_id: requiredCart.cart_id,
              order_number: requiredCart.order_number,
              total_quantity: total_quantity,
              total_items: total_items,
              cart_lines: requiredCart.cart_lines,
              totals: [
                {
                  type: "GRAND_TOTAL",
                  price: {
                    cent_amount: cent_amount,
                    currency: "INR",
                    fraction: 100,
                  },
                },
              ],
            };
  
            processFile(200, response);
          }
        }
      );
  
      function processFile(code, message) {
        return reply.code(code).send(message);
      }
    } catch (err) {
      return reply.code(400).send(err);
    }
  }
  module.exports = {createCart,getCartDetails};
 