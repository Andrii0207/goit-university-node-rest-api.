import express from "express";
import ctrl from "../controllers/contactsControllers.js"
import { isEmptyBody } from "../middlewares/isEmptyBody.js"
import { isValidId } from "../middlewares/isValidId.js"


const contactsRouter = express.Router();

contactsRouter.get("/", ctrl.getAllContacts);

contactsRouter.get("/:id", isValidId, ctrl.getOneContact);

contactsRouter.delete("/:id", isValidId, ctrl.deleteContact);

contactsRouter.post("/", ctrl.createContact);

contactsRouter.put("/:id", isValidId, isEmptyBody, ctrl.updateContact);

contactsRouter.patch("/:id/favorite", isValidId, ctrl.updateStatus)

export default contactsRouter;