import { Op } from "sequelize";
import { dataNotFound, parameterNotFound, responseGenerator } from "../helper/function.helper.js";
import { partyDetail } from "../models/index.js";
import STATUSCODE from "../server/statusCode.js";

export class partyDetails {
     static addPartyDetail = async (req, res, next) => {
        try {
            const { partyName, gstNumber } = req.body;

            const existingParty = await partyDetail.findOne({
                where: { partyName, gstNumber },
            });
            if (existingParty) {
                return responseGenerator(res, 'Party with this name and GST number already exists', STATUSCODE.BADREQUEST);
            }
            const party = await partyDetail.create(req.body);
            return responseGenerator(res, 'Party Detail added successfully', STATUSCODE.OK, party);
        } catch (error) {
            next(error);
        }
    };

    static getPartyDetails = async (req, res, next) => {
        try {
            const { page = 1, limit = 10 } = req.query;
            const parsedPage = parseInt(page, 10);
            const parsedLimit = parseInt(limit, 10);
            const offset = (parsedPage - 1) * parsedLimit;
            const { count, rows: parties } = await partyDetail.findAndCountAll({
                limit: parsedLimit,
                offset,
            });
            const response = {pageinfo: {total: count, 
                pages: Math.ceil(count / parsedLimit), 
                currentPage: parsedPage,},
                parties};
            return responseGenerator(res, 'Party Details fetched successfully', STATUSCODE.OK, response);
            
        } catch (error) {
            next(error);
        }
    };

    static getAllParty = async (req, res, next) => {
        try {
            const partyList = await partyDetail.findAll({
                order: [['createdAt', 'DESC']],
            });

            const response = {
                total: partyList.length,
                party_list: partyList,
            };

            return responseGenerator(res, 'All materials fetched successfully', STATUSCODE.OK, response);
        } catch (error) {
            next(error);
        }
    }

    static addOrUpdatePartyById = async (req, res, next) => {
        try {
            const { id } = req.query;
    
            let party = await partyDetail.findByPk(id);
    
            if (party) {
                await party.update(req.body);
                return responseGenerator(res, 'Party updated successfully', STATUSCODE.OK, party);
            } else {
                return responseGenerator(res, 'Party not found', STATUSCODE.NOT_FOUND);
            }
        } catch (error) {
            next(error);
        }};

    static updatePartyDetail = async (req, res, next) => {
        try {
            const { id } = req.query;
            const party = await partyDetail.findByPk(id);
            if (!party) {
                return responseGenerator(res, 'Party not found', STATUSCODE.NOT_FOUND);
            }

            await party.update(req.body);
            return responseGenerator(res, 'Party Detail updated successfully', STATUSCODE.OK, party);
        } catch (error) {
            next(error);
        }
    };

    static deletePartyDetail = async (req, res, next) => {
        try {
            const { id } = req.query;
            const party = await partyDetail.findByPk(id);
            if (!party) {
                return responseGenerator(res, 'Party not found', STATUSCODE.NOT_FOUND);
            }
            await party.destroy();
            return responseGenerator(res, 'Party Detail deleted successfully', STATUSCODE.OK);
        } catch (error) {
            next(error);
        }
    };

};