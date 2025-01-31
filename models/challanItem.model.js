import { DataTypes, Model } from "sequelize";
import database from "../database/init.sql.js";
import ModelName from "../database/model_name.sql.js";
import deliveryChalans from "./deliveryChallan.model.js";
class challanItem extends Model{}

challanItem.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    challanId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      materialName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      hsnCode: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      qty: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      rate: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      gst: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Amount: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      
},{
    modelName: ModelName.challanItem,
    paranoid: true,
    sequelize: database,
    tableName: ModelName.challanItem,
    collate: "utf8mb4_bin",
});

export default challanItem;
