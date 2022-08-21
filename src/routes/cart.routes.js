const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

// let readStream = fs.createReadStream(
//     path.join(__dirname, "../database") + "/user.json",
//     "utf8"
//   );
console.log(path);
function cartRoutes(fastify, options, done) {
  fastify.post("/cart/:user_id", function (req, reply) {
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
          console.log(data);
          processFile(content);
        }
      );
      function processFile(content) {
        content = JSON.parse(content);
        const cart_id = uuidv4();
        const order_number = Math.ceil(Math.random()) * 1000;
        let cart_lines;
        if (req.body) {
          cart_lines = [req.body];
        } else {
          cart_lines = [];
        }
        const user_id = req.params.user_id;
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
          reply.send(obj);
       }else{
        reply.send(exisiting_obj)
       }
       
      }
    } catch (err) {
      reply.send(err);
    }
  });
  done();
}
module.exports = cartRoutes;
