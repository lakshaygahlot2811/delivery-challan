import express from "express";
import {partyDetails}  from "../controller/partyDetail.controller.js";

const router = express.Router();

router.post('/add-party',partyDetails.addPartyDetail)
router.get('/get-party',partyDetails.getPartyDetails)
router.get('/get-party-by-id',partyDetails.addOrUpdatePartyById)
router.put('/update-party/:id',partyDetails.updatePartyDetail)
router.delete('/delete-party/:id',partyDetails.deletePartyDetail)

export default router;