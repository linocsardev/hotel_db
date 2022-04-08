
const jwt = require('jsonwebtoken')
const config = require ("../configs/config")
const userMdl = require('../models/User')
const verifyToken = async (req, res, next) => {

    try {
        const token = req.headers["x-access-token"];
    
        if(!token) return res.status(403).json({mesagge: "No token provided"})
        const decoded = jwt.verify(token, config.SECRET);
        req.userId = decoded.iduser
        const user = await userMdl.data(req.userId)
        if(!user) return res.status(404).json({message: 'User not found'})
        next()
        
    } catch (error) {
        res.json({
            state: 'failure',
            message: "no autorizado"
        })
    }
}
const isUser = async (req, res, next) => {
    let user = await userMdl.data(req.userId);
    let userRole = user[0].role_idrole
    if(userRole === 2){
        next();
        return;
    }
    return res.status(403).json({message: "Require User role"}); 
}
const isAdmin = async (req, res , next) => {
    let user = await userMdl.data(req.userId);
    let userRole = user[0].role_idrole
    if(userRole === 1){
        next();
        return;
    }
    return res.status(403).json({message: "Require Admin role"}); 
}
module.exports = {
    verifyToken,
    isAdmin,
    isUser
};