import contactsService from "../services/contactsServices.js";

import HttpError from "../helpers/HttpError.js"

import ctrlWrapper from "../decorators/ctrlWrapper.js"


const getAllContacts = async (req, res, next) => {
    const contactList = await contactsService.listContacts();
    res.json(contactList);
};

const getOneContact = async (req, res, next) => {
    const { id } = req.params;
    const contact = await contactsService.getContactById(id);
    if (!contact) {
        throw HttpError(404, "Not found");
    }
    res.json(contact);
}

const deleteContact = async (req, res, next) => {
    const { id } = req.params;
    const responce = await contactsService.removeContact(id);
    if (!responce) {
        throw HttpError(404, "Not found")
    }
    res.json(responce);
};

const createContact = async (req, res, next) => {
    const { error } = createContactSchema.validate(req.body)
    if (error) {
        throw HttpError(400, error.message)
    }
    const responce = await contactsService.addContact(req.body)
    res.status(201).json(responce)
};

const updateContact = async (req, res, next) => {
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
};

const updateStatus = async (req, res, next) => {
    const { error } = updateStatusSchema.validate(req.body)
    if (error) {
        throw HttpError(404, error.message);
    }
    const { id } = req.params;
    const responce = await contactsService.updateStatusContact(id, req.body);

    if (!responce) {
        throw HttpError(404, "Not found");
    }
    res.status(200).json(responce)
}

export default {
    getAllContacts: ctrlWrapper(getAllContacts),
    getOneContact: ctrlWrapper(getOneContact),
    deleteContact: ctrlWrapper(deleteContact),
    createContact: ctrlWrapper(createContact),
    updateContact: ctrlWrapper(updateContact),
    updateStatus: ctrlWrapper(updateStatus)
}