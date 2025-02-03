import { Op } from "sequelize";
import { dataNotFound, parameterNotFound, responseGenerator } from "../helper/function.helper.js";
import { challanItem, deliveryChalan,image } from "../models/index.js";
import STATUSCODE from "../server/statusCode.js";
import ejs from "ejs";
import path from "path";
import pdf from "html-pdf";
import fs from "fs"
import puppeteer from "puppeteer"
import { fileURLToPath } from 'url';
const baseUrl = process.env.BASE_URL || 'http://147.93.98.94:4200/';
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
      const imageData = await image.findAll();

      const templateData = challanData.toJSON();
      res.render("pdfTemplate", { challan: challanData.toJSON() })
              // images: imageData.map((image) => image.toJSON())});
    }
      catch (error) {
        next(error);
      }
    };

  static generatePdf = async (req, res, next) => {
    try {
      const challanData = await deliveryChalan.findOne({ where: { id: req.query.id }, include: [{ model: challanItem, as: "items", },], });

      if (!challanData) {
        return res.status(404).send("Challan not found.");
      }

      const challanDate = challanData.challanDate
    ? new Intl.DateTimeFormat("en-US", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(challanData.challanDate))
    : null;

    const urlimages= await image.findAll();
    const logo = urlimages.find(image => image.imageName.includes('Shreejeelogo'));
    const aisanpaintLogo = urlimages.find(image => image.imageName.includes('asianPaintLogo'));
    
    const logoUrl = logo ? `${baseUrl}${logo.imagePath.replace(/\\/g, '/')}` : null;
    const aisanpaintlogoUrl = aisanpaintLogo ? `${baseUrl}${aisanpaintLogo.imagePath.replace(/\\/g, '/')}` : null;
   

      const templateData = {
        challanData: challanData.toJSON(),
        data: challanData.items,
        challanDate: challanDate,
        logoUrl:logoUrl,
        aisanpaintlogoUrl:aisanpaintlogoUrl
      };

      const filePath = path.join(process.cwd(), "/views/pdfTemplate.ejs");
        const html = await ejs.renderFile(filePath, templateData);


        // Launch Puppeteer with optimized settings
        const browser = await puppeteer.launch({
                    headless: "new",
                    args: ["--no-sandbox", "--disable-setuid-sandbox"], 
                });
       const page = await browser.newPage();
              await page.setContent(html, { waitUntil: "networkidle0" });
      
              const pdfPath = path.join(process.cwd(), "uploads", "deliveryChallan.pdf");
      
              await page.pdf({
                  path: pdfPath,
                  format: "A4",
                  
              });
      
              await browser.close();
      
              // Send the PDF file as a response
              res.download(pdfPath, "deliveryChallan.pdf", err => {
                  if (err) {
                      console.error("Error sending file:", err);
                      return res.status(500).send("Error downloading PDF.");
                  }
      
                  // Optionally, delete the file after sending it
                  setTimeout(() => fs.unlinkSync(pdfPath), 5000);
              });
    } catch (error) {
      next(error);
    }
  };
};