import express from "express";
import designerController from "../controllers/designerController.js";
import tokenAuthentication from "../middleware/tokenAuthentication.js";

const router = express.Router();

router.get("/", designerController.getDesigners);
router.get("/isFollow/:designer_id", tokenAuthentication, designerController.getIsFollowDesigner);
router.get("/featured", tokenAuthentication, designerController.getFeaturedDesigners);
router.get("/popular", designerController.getPopularDesigners);
router.get("/relatedDesigners", designerController.getRelatedDesigners);
router.get("/:designer_id", designerController.getSingleDesigner);
router.post("/", tokenAuthentication, designerController.followDesigner);

export default router;
