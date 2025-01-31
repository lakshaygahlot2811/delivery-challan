import { Op } from "sequelize";
import { dataNotFound, parameterNotFound, responseGenerator } from "../helper/function.helper.js";
import { materialDetail } from "../models/index.js";
import STATUSCODE from "../server/statusCode.js";

export class materialDetails {
    // Create or Add Material Details
    static addMaterialDetail = async (req, res, next) => {
        try {
            let materials = req.body;

            // Handle single material object by wrapping it in an array
            if (!Array.isArray(materials)) {
                materials = [materials];
            }

            if (materials.length === 0) {
                return responseGenerator(res, 'No materials provided', STATUSCODE.BADREQUEST);
            }

            // Check for existing materials
            const existingMaterials = await materialDetail.findAll({
                where: {
                    [Op.or]: materials.map((material) => ({
                        materialName: material.materialName,
                        hsnNumber: material.hsnNumber,
                    })),
                },
            });

            const existingMaterialKeys = existingMaterials.map((m) => ({
                materialName: m.materialName,
                hsnNumber: m.hsnNumber,
            }));

            // Filter out materials that already exist
            const newMaterials = materials.filter(
                (material) =>
                    !existingMaterialKeys.some(
                        (existing) =>
                            existing.materialName === material.materialName &&
                            existing.hsnNumber === material.hsnNumber
                    )
            );

            if (newMaterials.length === 0) {
                return responseGenerator(res, 'All materials already exist', STATUSCODE.BADREQUEST);
            }

            // Add new materials
            const addedMaterials = await materialDetail.bulkCreate(newMaterials);

            return responseGenerator(
                res,
                `${addedMaterials.length} material(s) added successfully`,
                STATUSCODE.OK,
                addedMaterials
            );
        } catch (error) {
            next(error);
        }
    };
    static getAllMaterial = async (req, res, next) => {
        try {
            const materialList = await materialDetail.findAll({
                order: [['createdAt', 'DESC']],
            });

            const response = {
                total: materialList.length,
                material_list: materialList,
            };

            return responseGenerator(res, 'All materials fetched successfully', STATUSCODE.OK, response);
        } catch (error) {
            next(error);
        }
    }


    static getAllMaterialDetails = async (req, res, next) => {
        try {
            const page = parseInt(req.query.page, 10) || 1;
            const size = parseInt(req.query.size, 10) || 10;
            const offset = (page - 1) * size;
            const { count, rows: materialList } = await materialDetail.findAndCountAll({
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
                material_list: materialList,
            };
            return responseGenerator(res, 'Materials fetched successfully', STATUSCODE.OK, response);
        } catch (error) {
            next(error);
        }
    };

    // Get Material Detail by ID
    static getMaterialDetailById = async (req, res, next) => {
        try {
            const material = await materialDetail.findByPk(req.query.id);
            if (!material) {
                return responseGenerator(res, 'Material not found', STATUSCODE.NOT_FOUND);
            }
            return responseGenerator(res, 'Material fetched successfully', STATUSCODE.OK, material);
        } catch (error) {
            next(error);
        }
    };

    // Update Material Detail
    static updateMaterialDetail = async (req, res, next) => {
        try {
            const [updated] = await materialDetail.update(req.body, {
                where: { id: req.query.id }
            });
            if (!updated) {
                return responseGenerator(res, 'Material not found or no changes made', STATUSCODE.NOT_FOUND);
            }
            const updatedMaterial = await materialDetail.findByPk(req.params.id);
            return responseGenerator(res, 'Material updated successfully', STATUSCODE.OK, updatedMaterial);
        } catch (error) {
            next(error);
        }
    };

    // Delete Material Detail
    static deleteMaterialDetail = async (req, res, next) => {
        try {
            const deleted = await materialDetail.destroy({
                where: { id: req.query.id }
            });
            if (!deleted) {
                return responseGenerator(res, 'Material not found', STATUSCODE.NOT_FOUND);
            }
            return responseGenerator(res, 'Material deleted successfully', STATUSCODE.OK);
        } catch (error) {
            next(error);
        }
    };
}

