import express from "express";
import designerController from "../controllers/designerController.js";
import tokenAuthentication from "../middleware/tokenAuthentication.js";

const router = express.Router();

router.get("/", designerController.getDesigners);
router.get("/featured", designerController.getFeaturedDesigners);
router.get("/popular", designerController.getPopularDesigners);
router.get("/relatedDesigners/:designer_id", designerController.getRelatedDesigners);
router.get("/:designer_id", designerController.getSingleDesigner);
router.post("/:designer_id", tokenAuthentication, designerController.followDesigner);


export default router;
