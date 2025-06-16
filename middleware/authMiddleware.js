import jwt from 'jsonwebtoken'

export const verifyToken = (req,res,next)=>{
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({
            message: 'No token provided'
        })
    }

    const token = authHeader.split(' ')[1];

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.userId;
        next();
    } catch(error){
        console.log(error);
        return res.status(401).json({
            message: 'Invalid Token'
        })
    }

}