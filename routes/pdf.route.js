import express from "express";
import {renderDeliveryChallan}  from "../controller/pdf.controller.js";

const router = express.Router();


router.get('/delivery-challan',renderDeliveryChallan.renderChallan)
router.get('/delivery-challan-pdf',renderDeliveryChallan.generatePdf)


export default router;