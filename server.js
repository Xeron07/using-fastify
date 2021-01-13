const app=require("fastify")({logger:true});
const pg = require('fastify-pg');
//db options
const options={
    connectionString: 'postgres://root:root@localhost:5432/postgres'
};

app.register(pg, options);



app.get("/",(req,res)=>{
    res.send("Hello World");
});

app.register(require("./routes/users"));


const startServer=async()=>{
   try{
       await app.listen(5000);
   }catch(err){
       app.log.error(err);
       process.exit(1);
   }
}

startServer();