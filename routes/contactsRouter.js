import express from "express";

import contactControllers from "../controllers/contactsControllers.js";

import { isEmptyBody } from "../middlewares/isEmptyBody.js";

import { isValidId } from "../middlewares/isValidId.js";

import validateBody from "../helpers/validateBody.js"

import { createContactSchema, updateContactSchema, updateStatusSchema } from "../schemas/contactsSchemas.js"

import authenticate from "../middlewares/authenticate.js"


const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", contactControllers.getAllContacts);

contactsRouter.get("/:id", isValidId, contactControllers.getOneContact);

contactsRouter.delete("/:id", isValidId, contactControllers.deleteContact);

contactsRouter.post("/", validateBody(createContactSchema), contactControllers.createContact);

contactsRouter.put("/:id", isValidId, isEmptyBody, validateBody(updateContactSchema), contactControllers.updateContact);

contactsRouter.patch("/:id/favorite", isValidId, validateBody(updateStatusSchema), contactControllers.updateStatus)

export default contactsRouter;
