import { Op } from "sequelize";
import { dataNotFound, parameterNotFound, responseGenerator } from "../helper/function.helper.js";
import { deliveryChalan } from "../models/index.js";
import STATUSCODE from "../server/statusCode.js";
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
            const page = parseInt(req.query.page, 10) || 1;
        const size = parseInt(req.query.limit, 10) || 10; // Renamed 'limit' to 'size' for consistency
        const offset = (page - 1) * size;

        const { count, rows: deliveryChalans } = await deliveryChalan.findAndCountAll({
            offset,
            limit: size,
            order: [['createdAt', 'DESC']],
        });

        const response = {
            pageinfo: {
                total: count,
                totalPages: Math.ceil(count / size),
                currentPage: page,
            },
            delivery_chalans: deliveryChalans, // Updated key to match consistent naming
        };

        return responseGenerator(res, 'Delivery Chalans fetched successfully', STATUSCODE.OK, response);
        } catch (error) {
            next(error);
        }
    };

    // Get Single Delivery Chalan by ID
    static getDeliveryChalanById = async (req, res, next) => {
        try {
            const { id } = req.query;

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
            const { id } = req.query;
            const chalan = await deliveryChalan.findByPk(id);

            if (!chalan) {
                return responseGenerator(res, 'Delivery Chalan not found', STATUSCODE.NOT_FOUND);
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
            const { id } = req.query;

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


