import express from "express";
import { materialDetails}  from "../controller/materialDetail.controller.js";

const router = express.Router();

router.post('/add-material',materialDetails.addMaterialDetail)
router.get('/get-material',materialDetails.getAllMaterialDetails)
router.get('/get-material',materialDetails.getMaterialDetailById)
router.put('/update-material',materialDetails.updateMaterialDetail)
router.delete('/delete-material',materialDetails.deleteMaterialDetail)

export default router;