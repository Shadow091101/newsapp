const jwt=require('jsonwebtoken');
const JWT_SECRET = 'betterplaybloodbourne345'

const fetchUser=(req,res,next)=>{
    //Get the user from the jwt token and add id to req object
    const token=req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Please authenticate using a valid token"})
    }
    try {        
        const data =jwt.verify(token,JWT_SECRET)
        req.user=data.user
        next();//this means that after this function is executed then the next function after this middleware would run
    } catch (error) {
        res.status(401).send({error:"Some Internal error occured"})
    }
}
module.exports=fetchUser,JWT_SECRET;