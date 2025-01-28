import { DataTypes, Model } from "sequelize";
import database from "../database/init.sql.js";
import ModelName from "../database/model_name.sql.js";
import challanItem from "./challanItem.model.js";
class deliveryChalans extends Model{}

deliveryChalans.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    challanNo:{
        type: DataTypes.STRING,
        allowNull: true
    },
    challanDate: {
        type: DataTypes.DATE,
        allowNull: true
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
        allowNull: false,
    },
    totalAmount: {
        type: DataTypes.FLOAT,
        allowNull: true,
        },
    totalQty: {
        type: DataTypes.FLOAT,
        allowNull: true,
        },
    totalAmountInWord: {
        type: DataTypes.STRING,
        allowNull: true,
        },
   },{
    modelName: ModelName.deliveryChalans,
    paranoid: true,
    sequelize: database,
    tableName: ModelName.deliveryChalans,
    collate: "utf8mb4_bin",
});

export default deliveryChalans;

