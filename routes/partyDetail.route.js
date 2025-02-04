import express from "express";
import {partyDetails}  from "../controller/partyDetail.controller.js";

const router = express.Router();

router.post('/add-party',partyDetails.addPartyDetail)
router.get('/get-party',partyDetails.getPartyDetails)
router.get('/get-all-party',partyDetails.getAllParty)
router.get('/get-party',partyDetails.addOrUpdatePartyById)
router.put('/update-party',partyDetails.updatePartyDetail)
router.delete('/delete-party',partyDetails.deletePartyDetail)

export default router;