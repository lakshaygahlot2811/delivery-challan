import { DataTypes, Model } from "sequelize";
import database from "../database/init.sql.js";
import ModelName from "../database/model_name.sql.js";
class images extends Model{}

images.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    imageName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      imagePath: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      
},{
    modelName: ModelName.images,
    paranoid: true,
    sequelize: database,
    tableName: ModelName.images,
    collate: "utf8mb4_bin",
});

export default images;
