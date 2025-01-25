import { DataTypes, Model } from "sequelize";
import database from "../database/init.sql.js";
import ModelName from "../database/model_name.sql.js";
// import sequelize from '../database/database.js';

class partyDetails extends Model{}

partyDetails.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    partyName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    gstNumber: {
        type: DataTypes.STRING,
        allowNull: true
    },
    partyContactNumber: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    city: {
        type: DataTypes.STRING,
        allowNull: true
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true
    }
},{
    modelName: ModelName.partyDetails,
    paranoid: true,
    sequelize: database,
    tableName: ModelName.partyDetails,
    collate: "utf8mb4_bin",
});

export default partyDetails;