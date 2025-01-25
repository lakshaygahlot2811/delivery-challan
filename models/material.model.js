import { DataTypes, Model } from "sequelize";
import database from "../database/init.sql.js";
import ModelName from "../database/model_name.sql.js";

class materialDetails extends Model{}

materialDetails.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    materialName:{
        type: DataTypes.STRING,
        allowNull: true
    },
    hsnNumber: {
        type: DataTypes.STRING,
        allowNull: true
    }
},{
    modelName: ModelName.materialDetails,
    paranoid: true,
    sequelize: database,
    tableName: ModelName.materialDetails,
    collate: "utf8mb4_bin",
});

export default materialDetails;