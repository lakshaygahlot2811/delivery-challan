import deliveryChalans from "./deliveryChallan.model.js";
import materialDetails from "./material.model.js";
import partyDetails from "./party.model.js";
import challanItems from "./challanItem.model.js";
import images from "./image.model.js";

export const deliveryChalan= deliveryChalans;
export const materialDetail= materialDetails;
export const partyDetail= partyDetails;
export const challanItem= challanItems;
export const image= images;

deliveryChalans.hasMany(challanItems, { foreignKey: "challanId", as: "items" });
challanItems.belongsTo(deliveryChalans, { foreignKey: "challanId", as: "challan" });