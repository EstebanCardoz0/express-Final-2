import { Router } from "express";
import { TrackController } from "../controllers/TrackController.js";

const router = new Router();
const trackCon = new TrackController();

router.post("/", trackCon.createTrack);
router.get("/", trackCon.getAllTracks);
router.post("/:trackId/train/:botId", trackCon.trainBot);
router.get("/:id", trackCon.getTrackById);

export { router };
