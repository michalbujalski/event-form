import { Router } from "express";
import service from "./service";
import { Event } from "./models";

const router = Router();

router.post("/create", async (req, res, next) => {
  try {
    const createdEvent: Event = await service.createEvent(req.body);
    res.send(createdEvent);
  } catch (err) {
    next(err)
  }
});

router.get("/", async (_req, res) => {
  const list = await service.getAllEvents();
  console.log(list);
  res.send(list);
});

export default router;
