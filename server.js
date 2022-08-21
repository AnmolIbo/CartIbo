const fastify = require('fastify')({logger:false});
const PORT =process.env.PORT || 5000;
fastify.register(require("./src/routes/cart.routes"))
const start =async ()=>{
    try{
        await fastify.listen(PORT,()=>{console.log("listening on port "+PORT)})
    }catch(error){
        fastify.log(error);
        process.exit(1)
    }
    }
    start();