const errorHandler=(err,req,res,next)=>{
    console.log("err",err.stack);
    let statusCode=500;
    let message="something went wrong on the server";
    if(err.status){
        statusCode=err.status
    }
    if(err.message){
        message=err.message
    }
    res.status(statusCode).json({
        status:"error",
        message:message,
    })
}

module.exports=errorHandler;