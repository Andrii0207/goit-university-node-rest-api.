import HttpError from "../helpers/HttpError.js"
import contactsService from "../services/contactsServices.js";
import { createContactSchema, updateContactSchema } from "../schemas/contactsSchemas.js"


export const getAllContacts = async (req, res, next) => {
    try {
        const contactList = await contactsService.listContacts();
        res.json(contactList);

    } catch (error) {
        next(error);
    }
};

export const getOneContact = async (req, res, next) => {
    const { id } = req.params;
    try {
        const contact = await contactsService.getContactById(id);
        if (!contact) {
            throw HttpError(404, "Not found");
        }
        res.json(contact);

    } catch (error) {
        next(error);
    }
}

export const deleteContact = async (req, res, next) => {
    const { id } = req.params;
    try {
        const responce = await contactsService.removeContact(id);
        if (!responce) {
            throw HttpError(404, "Not found")
        }
        res.json(responce);

    } catch (error) {
        next(error);
    }
};

export const createContact = async (req, res, next) => {
    try {
        const { error } = createContactSchema.validate(req.body)
        if (error) {
            throw HttpError(400, error.message)
        }
        const responce = await contactsService.addContact(req.body)
        res.status(201).json(responce)

    } catch (error) {
        next(error);
    }
};

export const updateContact = async (req, res, next) => {
    try {
        const { error } = updateContactSchema.validate(req.body)
        if (error) {
            throw HttpError(400, error.message)
        }
        const { id } = req.params;
        const responce = await contactsService.updateContact(id, req.body);

        if (!responce) {
            throw HttpError(404, "Not found");
        }
        res.status(200).json(responce)

    } catch (error) {
        next(error)
    }
};
