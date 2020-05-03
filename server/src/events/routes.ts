import { Router } from "express";
import service from "./service";
import { Event } from "./models";

const router = Router();

router.post("/create", async (req, res, next) => {
  try {
    const createdEvent: Event = await service.createEvent(req.body);
    res.send(createdEvent);
  } catch (err) {
    next(err);
  }
});

router.get("/", async (_req, res) => {
  const list = await service.getAllEvents();
  res.send(list);
});

router.get("/:id", async (req, res, next) => {
  try {
    const event = await service.getEvent(req.params.id);
    res.send(event);
  } catch (err) {
    next(err);
  }
});

export default router;
