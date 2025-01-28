import express from "express";
import cors from "cors";
import path from "path";

import STATUSCODE from './statusCode.js';
import STRINGCONST from './stringConstant.js';
import router from '../routes/index.js';
import database from '../database/init.sql.js';
// import {UploadFile} from '../helper/multer.helper.js';

const {materialDetail,partyDetail,deliveryChallan,pdf,uploadImg} = router;

export const initExpress = ()=>{
    const app = express();

    app.set('view engine', 'ejs');

    app.use(express.json());
    app.use(cors({ origin: "*" }));
    const __dirname = path.resolve();
    app.use("/uploads", express.static(path.join(__dirname, "uploads")));
    app.post('/testing-uploading-file', async (req, res, next) => {
        try {
            const result = await UploadFile(req, 'testing');
            res.status(201).json({ result });
        } catch (error) {
            next(error);
        }
    })

    app.get("/SJ0001", async (req, res, next) => {
        res.json({
            service: "Delivery chalan",
            status: "running"
        });
    });
    app.use("/SJ0001/api/v1/material", materialDetail);
    app.use("/SJ0001/api/v1/party", partyDetail);
    app.use("/SJ0001/api/v1/challan", deliveryChallan);
    app.use("/SJ0001/api/v1/pdf", pdf);
    app.use("/SJ0001/api/v1/img", uploadImg);

    
    app.use((error, req, res, next) => {
        console.log(error);
        console.error('API :- ', req.url);
        const message = error.message;
        let statusCode = error.statusCode || STATUSCODE.SERVER_ERROR;
        if (error.name === 'TokenExpiredError') {
            statusCode = STATUSCODE.UNAUTHORIZED;
        }
        return res.status(statusCode).json({ message, statusCode, status: false });
    });

    app.listen(process.env.PORT, async () => {
        console.info(STRINGCONST.CONNECTED);
    });
    database.sync({ alter: true })
        .then(async () => {
            console.info(STRINGCONST.DATABASE_CONNECTION_MESSAGE);
            // await insertUserData();
        })
        .catch(err => console.error(err));

};