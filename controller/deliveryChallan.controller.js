import deliveryChalan from "../models/index.js";
import responseGenerator from "../utils/responseGenerator.js";
import STATUSCODE from "../utils/statusCode.js";

export class deliveryChallans {
    static addDeliveryChalan = async (req, res, next) => {
        try {
            const currentDate = new Date();
            const latestChallan = await deliveryChalan.findOne({
                order: [['createdAt', 'DESC']],
            });

            const nextChallanNo = latestChallan
                ? `SJ-${parseInt(latestChallan.challanNo.split('-')[1]) + 1}`
                : 'SJ-0001';

            const chalanData = {
                ...req.body,
                challanNo: nextChallanNo,
                challanDate: currentDate,
            };

            const chalan = await deliveryChalan.create(chalanData);

            return responseGenerator(res, 'Delivery Challan added successfully', STATUSCODE.OK, chalan);
        } catch (error) {
            next(error);
        }
    };

    // Get All Delivery Chalans with Pagination
    static getAllDeliveryChalans = async (req, res, next) => {
        try {
            const { page = 1, limit = 10 } = req.query;
            const offset = (page - 1) * limit;

            const { rows: chalans, count: totalItems } = await deliveryChalan.findAndCountAll({
                offset: parseInt(offset),
                limit: parseInt(limit),
                order: [['createdAt', 'DESC']],
            });

            return responseGenerator(res, 'Delivery Chalans fetched successfully', STATUSCODE.OK, {
                totalItems,
                totalPages: Math.ceil(totalItems / limit),
                currentPage: parseInt(page),
                chalans,
            });
        } catch (error) {
            next(error);
        }
    };

    // Get Single Delivery Chalan by ID
    static getDeliveryChalanById = async (req, res, next) => {
        try {
            const { id } = req.params;

            const chalan = await deliveryChalan.findByPk(id);

            if (!chalan) {
                return responseGenerator(res, 'Delivery Chalan not found', STATUSCODE.NOTFOUND);
            }

            return responseGenerator(res, 'Delivery Chalan fetched successfully', STATUSCODE.OK, chalan);
        } catch (error) {
            next(error);
        }
    };

    // Update Delivery Chalan by ID
    static updateDeliveryChalan = async (req, res, next) => {
        try {
            const { id } = req.params;

            const chalan = await deliveryChalan.findByPk(id);

            if (!chalan) {
                return responseGenerator(res, 'Delivery Chalan not found', STATUSCODE.NOTFOUND);
            }

            await chalan.update(req.body);

            return responseGenerator(res, 'Delivery Chalan updated successfully', STATUSCODE.OK, chalan);
        } catch (error) {
            next(error);
        }
    };

    // Delete Delivery Chalan by ID
    static deleteDeliveryChalan = async (req, res, next) => {
        try {
            const { id } = req.params;

            const chalan = await deliveryChalan.findByPk(id);

            if (!chalan) {
                return responseGenerator(res, 'Delivery Chalan not found', STATUSCODE.NOTFOUND);
            }

            await chalan.destroy();

            return responseGenerator(res, 'Delivery Chalan deleted successfully', STATUSCODE.OK);
        } catch (error) {
            next(error);
        }
    };
}


