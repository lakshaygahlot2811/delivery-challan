import { Op } from "sequelize";
import { dataNotFound, parameterNotFound, responseGenerator } from "../helper/function.helper.js";
import { challanItem,deliveryChalan } from "../models/index.js";
import STATUSCODE from "../server/statusCode.js";
import ejs from "ejs";
import path from "path";
import pdf from "html-pdf";
import { fileURLToPath } from 'url';

// Convert `import.meta.url` to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class renderDeliveryChallan {
     static renderChallan = async (req, res, next) => {
        try {
            const challanData = await deliveryChalan.findOne({
                where: { id: req.query.id },
                include: [{ model: challanItem, as: "items" }],
              });
        
              if (!challanData) {
                return res.status(404).send("Challan not found.");
              }
              // Fetch image data
              const imageData = await images.findAll();
        
              const templateData = challanData.toJSON();
              res.render("pdfTemplate", {challan: challanData.toJSON(),
              images: imageData.map((image) => image.toJSON())});
        } catch (error) {
            next(error);
        }
    };
    static generatePdf = async (req, res, next) => {
        try {
        const challanData = await deliveryChalan.findOne({where: { id: req.query.id },include: [{model: challanItem,as: "items",},],});
      
          if (!challanData) {
            return res.status(404).send("Challan not found.");
          }
      
          const templateData = {
            challanData: challanData.toJSON(), 
            data: challanData.items,
          };
          const filePath = path.join(process.cwd(), "/views/pdfTemplate.ejs");
          ejs.renderFile(filePath, templateData,challanData, (err, html) => {
            if (err) {
              return res.status(500).send({
                error: "Error rendering template",
                details: err.message,
              });
            }
      
            // Convert HTML to PDF
            const options = { format: "A4",landscape: true, };
            pdf.create(html, options).toFile("uploads/deliveryChallan.pdf", (err, result) => {
              if (err) {
                return res.status(500).send({
                  error: "Error generating PDF",
                  details: err.message,
                });
              }
      
              // Send the generated PDF as a response or download
              res.download(result.filename);
            });
          });
        } catch (error) {
          next(error);
        }
      };
};