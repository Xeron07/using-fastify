module.exports=async function(app,opt,done){

    const { connect,QueryBuilder, transaction } = app.pg;

  

    app.get("/user",async(req,res)=>{
       const rt= await QueryBuilder
                        .of(app.pg)
                        .select(['*'])
                        .from('users')
                        .getMany();
       console.log(rt); 
       res.send(rt);
    });


    app.get("/user/:id/:name-:email",async(request,res)=>{
        const {name,email,id}=request.params;

        const rs=await QueryBuilder
                        .of(app.pg)
                        .update("users")
                        .set({name:`'${name}'`,email:`'${email}'`})
                        .where('id = :id', {id})
                        .execute();
        console.log(rs);

        res.send("User added");

    });


    app.get("/user/:name/:email",async(request,res)=>{
        const {name,email}=request.params;

        const rs=await QueryBuilder
                        .of(app.pg)
                        .insert()
                        .into("users")
                        .columns(['name','email'])
                        .values([[`'${name}'`,`'${email}'`]])
                        .execute();
        console.log(rs);

        res.send("User added");

    });



    done();

}