import express from "express";

import contactControllers from "../controllers/contactsControllers.js";

import { isEmptyBody } from "../middlewares/isEmptyBody.js";

import { isValidId } from "../middlewares/isValidId.js";


const contactsRouter = express.Router();

contactsRouter.get("/", contactControllers.getAllContacts);

contactsRouter.get("/:id", isValidId, contactControllers.getOneContact);

contactsRouter.delete("/:id", isValidId, contactControllers.deleteContact);

contactsRouter.post("/", contactControllers.createContact);

contactsRouter.put("/:id", isValidId, isEmptyBody, contactControllers.updateContact);

contactsRouter.patch("/:id/favorite", isValidId, contactControllers.updateStatus)

export default contactsRouter;
