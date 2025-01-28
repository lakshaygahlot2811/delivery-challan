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
        allowNull: false,
      },
      hsnCode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      rate: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      gst: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      
},{
    modelName: ModelName.challanItem,
    paranoid: true,
    sequelize: database,
    tableName: ModelName.challanItem,
    collate: "utf8mb4_bin",
});

export default challanItem;
