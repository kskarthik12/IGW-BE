import express from 'express'
import UserController from '../controller/user.js'
import Validate from '../middleware/Validate.js';
const router =express.Router();

router.post( '/signup',UserController.signUp)
router.post('/login',UserController.login)
router.get('/image',Validate,UserController.searchImage)
router.post('/image-upload',Validate,UserController.imageUpload)

export default router
