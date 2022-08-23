const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");
function createCart(req, reply) {
    try {

      fs.readFile(
        path.join(__dirname, "../database") + "/cart.json",
        { encoding: "utf8" },
        (err, data) => {
          if (err) {
            console.log(err, "yhn se");
            return;
          }
          const content = data;
          // console.log(data);
          
          processFile(content);
        }
      );
      function processFile(content) {
        content = JSON.parse(content);
        const cart_id = uuidv4();
        const order_number = Math.floor(Math.random() * 1000);
        let cart_lines;
        if (req.body.cart_lines) {//if cart line is present in cart
          cart_lines = req.body.cart_lines;
      
         } //else {
        //   cart_lines = [];
        // }
        const user_id = req.body.user_id;
        let flag=true;
        let exisiting_obj;
        content.forEach(element => {
            if(element.user_id===user_id){
             flag=false;
             exisiting_obj=element
            }
        });
       if(flag){
        const obj = {
            cart_id,
            order_number,
            user_id,
            cart_lines,
          };
          content = [...content, obj];
          let data = JSON.stringify(content, null, 2);
          fs.writeFile(
            path.join(__dirname, "../database") + "/cart.json",
            data,
            (err) => {
              if (err) throw err;
              console.log("Data written to file");
            }
          );
          reply.code(201).send(obj);
       }else{
        reply.code(201).send(exisiting_obj)
       }
       
      }
    } catch (err) {
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
 