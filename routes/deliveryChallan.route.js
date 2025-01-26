import express from 'express';
import {deliveryChallans}  from '../controller/deliveryChallan.controller.js';

const router = express.Router();

router.post('/add-delivery-chalan', deliveryChallans.addDeliveryChalan);
router.get('/get-delivery-chalan', deliveryChallans.getAllDeliveryChalans);
router.get('/get-delivery-chalan', deliveryChallans.getDeliveryChalanById);
router.put('/update-delivery-chalan', deliveryChallans.updateDeliveryChalan);
router.delete('/delet-delivery-chalan', deliveryChallans.deleteDeliveryChalan);

export default router;
