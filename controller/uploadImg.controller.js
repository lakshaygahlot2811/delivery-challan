import { Op } from "sequelize";
import { dataNotFound, parameterNotFound, responseGenerator } from "../helper/function.helper.js";
import { image } from "../models/index.js";
import STATUSCODE from "../server/statusCode.js";


export class imageUpload {
    static uploadImage = async (req, res, next) => {
            try {
                const { imageName, path: imagePath } = req.file;

                const images = await image.create({ imageName, imagePath});
                return responseGenerator(res, 'Image uploaded successfully', STATUSCODE.OK);
            } catch (error) {
                next(error);
            }
        };

};