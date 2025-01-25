import express from "express";
import { materialDetails}  from "../controller/materialDetail.controller.js";

const router = express.Router();

router.post('/add-material',materialDetails.addMaterialDetail)
router.get('/get-material',materialDetails.getAllMaterialDetails)
router.get('/get-material-by-id/:id',materialDetails.getMaterialDetailById)
router.put('/update-material/:id',materialDetails.updateMaterialDetail)
router.delete('/delete-material/:id',materialDetails.deleteMaterialDetail)

export default router;