const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

function createCartLine(req, reply) {
  try {
    let cart_line_id = uuidv4();
    let cart_id = req.params.cart_id;
    let quantity = req.body.quantity;
    let item = req.body.item;
    let unit_price = req.body.unit_price;
    let offer_id = req.body.item.offer_id;
    let quantity_number = req.body.quantity.quantity_number;

    let obj = {
      cart_line_id,
      quantity,
      item,
      unit_price,
    };
    fs.readFile(
      path.join(__dirname, "../database") + "/cart.json",
      { encoding: "utf8" },
      (err, data) => {
        if (err) {
          console.log(err, "yhn se");
          return;
        }
        const content = data;

        processFile(content);
      }
    );
    function processFile(content) {
      content = JSON.parse(content);
      content.forEach((el) => {
        if (el.cart_id === cart_id) {
          if (el.cart_lines) {
            // el.cart.cart_lines.forEach((el)=>{
            //   if(offer_id===el.item.offer_id) {
            //     el.quantity.quantity_number=el.quantity.quantity_number+1;
            //   }else{
                
            //   }
            // })
            el.cart_lines = [...el.cart_lines, obj];
          } else {
            el.cart_lines = [];
            el.cart_lines = [...el.cart_lines, obj];
          }
        }
      });
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
    }
  } catch (err) {
    console.log(err);

    return reply.code(400).send(err);
  }
}

function deleteCartline(req, reply) {
  try{
    let cart_id=req.params.cart_id;
    let cart_line_id=req.params.cart_line_id;
    fs.readFile(
      path.join(__dirname, "../database") + "/cart.json",
      { encoding: "utf8" },
      (err, data) => {
        if (err) {
          console.log(err, "yhn se");
          return;
        }
        const content = data;

        processFile(content);
      }
    );
    function processFile(content) {
      content = JSON.parse(content);
      let index;
      content.forEach((el,i)=>{
        if(el.cart_id===cart_id){
          index=i;
        }
      })
    const newcontent =  content[index].cart_lines.filter((el)=>{
        if(el.cart_line_id!==cart_line_id){
          return el;
        }
      });
      content[index].cart_lines=newcontent;
      
      let data = JSON.stringify(content, null, 2);
      fs.writeFile(
        path.join(__dirname, "../database") + "/cart.json",
        data,
        (err) => {
          if (err) throw err;
          console.log("Data written to file");
        }
      );
      reply.code(201).send(newcontent);
    }
  }catch(err){
    console.log(err);

    return reply.code(400).send(err);
  }
}

const updateCartline = function (req,reply){
  try{
    let cart_id=req.params.cart_id;
    let cart_line_id=req.params.cart_line_id;
    fs.readFile(
      path.join(__dirname, "../database") + "/cart.json",
      { encoding: "utf8" },
      (err, data) => {
        if (err) {
          console.log(err, "yhn se");
          return;
        }
        const content = data;

        processFile(content);
      }
    );
    function processFile(content) {
      content = JSON.parse(content);
      let index;
      content.forEach((el,i)=>{
        if(el.cart_id===cart_id){
          index=i;
        }
      });
      let index2;
     content[index].cart_lines.forEach((el,i)=>{
        if(el.cart_line_id===cart_line_id){
          index2=i
        }
      });
     
      content[index].cart_lines[index2].quantity.quantity_number=req.body.quantity.quantity_number
      // content[index].cart_lines=newcontent;
      
      let data = JSON.stringify(content, null, 2);
      fs.writeFile(
        path.join(__dirname, "../database") + "/cart.json",
        data,
        (err) => {
          if (err) throw err;
          console.log("Data written to file");
        }
      );
      reply.code(201).send(content[index].cart_lines[index2]);
    }
  }catch(err){
    console.log(err);

    return reply.code(400).send(err);
  }
 }
module.exports = { createCartLine ,deleteCartline,updateCartline};
