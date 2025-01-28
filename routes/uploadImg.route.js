import express from "express";
import {upload} from "../helper/multer.helper.js"
import {imageUpload}  from "../controller/uploadImg.controller.js";

const router = express.Router();


router.post('/upload-img',upload.single('image'),imageUpload.uploadImage)



export default router;