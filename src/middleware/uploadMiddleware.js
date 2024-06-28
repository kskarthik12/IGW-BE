// import express from 'express';
// import bodyParser from 'body-parser'
// const app = express();
// app.use(express.json({ limit: '50mb' })); 
// app.use(bodyParser.json({ limit: '50mb' }));
// app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


// app.use(express.json({ limit: '50mb' })); 



// // Middleware to handle base64 image upload
// const uploadMiddleware = (req, res, next) => {
//     try {
//         const { image } = req.body;
//         if (!image) {
//             return res.status(400).send('No image provided');
//         }

//         req.imageBufferString = image;
//         next();
//     } catch (error) {
//         res.status(500).send('Error decoding image');
//     }
// };

// export default uploadMiddleware;

