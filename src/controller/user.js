// Import connection and Auth modules
import pool from "../models/image.js";
import Auth from "../utils/auth.js";
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const signUp = async (req, res) => {
    try {
       
        const [rows] = await pool.query('SELECT * FROM image.user WHERE email = ?', [req.body.email]);

       
        if (rows.length > 0) {
            return res.status(400).send({
                message: `User with email ${req.body.email} already exists`
            });
        }

        
        req.body.password = await Auth.hashPassword(req.body.password);

        
        await pool.query('INSERT INTO image.user (email, password, username) VALUES (?, ?, ?)', [
            req.body.email,
            req.body.password,
            req.body.username
        ]);

        
        res.status(201).send({
            message: "User Sign Up Successful"
        });

    } catch (error) {
        
        console.error("Error in signUp:", error);
        res.status(500).send({
            message: error.message || "Internal Server Error"
        });
    }
};

const login = async(req,res)=>{
    try {
        const [rows] = await pool.query('SELECT * FROM image.user WHERE email = ?', [req.body.email]);
        if (rows.length > 0)
        {
            const user = rows[0];
            if(await Auth.hashCompare(req.body.password,user.password))
            {
                let token = await Auth.createToken({
                    name:user.username,
                    email:user.email,
                    id:user.userId,
                    role:user.role,
                })

                res.status(200).send({
                    message:"Login Successfull",
                    user:{
                    name:user.username,
                    email:user.email,
                    id:user.userId,
                    role:user.role
                    },
                    token
                })
            }
            else
            {
                res.status(400).send({
                    message:"Incorect Password"
                })
            }
        }
        else
        {
            res.status(400).send({
                message:`User with ${req.body.email} does not exists`
            })
        }
    } catch (error) {
        res.status(500).send({
            message:error.message || "Internal Server Error"
        })
    }
}

const searchImage = async (req, res) => {
    try {
        const tag = `%${req.query.tag}%`;

        const [rows] = await pool.query('SELECT * FROM image.animal_class_updated WHERE label LIKE ? OR design_code LIKE ? OR serial_number LIKE ? OR text LIKE ?', [tag,tag,tag,tag]);

        if (rows.length > 0) {
            
            const results = [];

           
            for (const user of rows) {
                const imagePath = path.join('src/assets/images', `${user.serial_number}.jpg`);
            
                const createdAt = new Date(user.createdAt).toISOString().split('T')[0];
                // Add result to the results array
                results.push({
                    ...user,
                    imagePath: imagePath,
                    createdAt:createdAt
                });
            }

            
            res.status(200).send({
                message: "Data Fetch Successful",
                data: results
            });
        } else {
            res.status(404).send({
                message: `No data found for tag '${req.query.tag}'`
            });
        }
    } catch (error) {
        console.error("Error in searchImage:", error);
        res.status(500).send({
            message: error.message || "Internal Server Error"
        });
    }
};

const imageUpload = async (req, res) => {

        try {
           
    

            if (!req.file) {
                return res.status(400).send({
                    message: "No file uploaded"
                });
            }
            console.log('Image uploaded and metadata saved successfully')
            // File uploaded successfully, now save metadata to the database
            const { serial_number, design_code, text, label } = req.body;
            

            
            await pool.query(
                'INSERT INTO image.animal_class_updated (serial_number, design_code, text, label) VALUES (?, ?, ?, ?)',
                [serial_number, design_code, text, label ]
            );

            res.status(201).send({
                
                message: "Image uploaded and metadata saved successfully",
                data: {
                    serial_number,
                    design_code,
                    text,
                    label,
                     
                }
            });
        } catch (error) {
            console.error("Error in upload:", error);
            res.status(500).send({
                message: error.message || "Internal Server Error"
            });
        }
    }

   

export default {
    signUp,
    login,
    searchImage,
    imageUpload,
    
};
