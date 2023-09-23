import express from "express";
import designerController from "../controllers/designerController.js";
import tokenAuthentication from "../middleware/tokenAuthentication.js";

const router = express.Router();

router.get("/", designerController.getDesigners);
router.get("/:designer_id", designerController.getSingleDesigner);
router.post("/:designer_id", tokenAuthentication, designerController.followDesigner);

router.get("/featured", designerController.getFeaturedDesigners);
router.get("/relatedDesigners/:designer_id", designerController.getRelatedDesigners);
router.get("/popular", designerController.getPopularDesigners);

export default router;
