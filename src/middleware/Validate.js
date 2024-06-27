import Auth from '../utils/auth.js';
import pool from '../models/image.js';

const Validate = async (req, res, next) => {
    try {
        
        let token = req?.headers?.authorization?.split(" ")[1];

        if (token) {
            let payload = await Auth.decodeToken(token);
         
            let [userData] = await pool.query('SELECT * FROM image.user WHERE userId = ?', [payload.id]);
           
            
            if (Math.round(+new Date() / 1000) < payload.exp  && userData[0].role === payload.role) 
                next();
             else 
                res.status(401).send({ message: "Token Expired or Unauthorized" });
            
        } else {
            res.status(402).send({
                message: "Token Not Found"
            });
        }
        
    } catch (error) {
        console.error("Token validation error:", error);
        res.status(500).send({
            message: "Internal Server Error",
            error: error.message
        });
    }
}

export default Validate;
