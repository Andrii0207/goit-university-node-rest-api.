import contactsService from "../services/contactsServices.js";

import { createContactSchema, updateContactSchema, updateStatusSchema } from "../schemas/contactsSchemas.js"

import HttpError from "../helpers/HttpError.js"

import ctrlWrapper from "../decorators/ctrlWrapper.js"


const getAllContacts = async (req, res, next) => {
    const { _id: owner } = req.user;
    const filter = { owner };
    const fields = "";
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;
    const settings = { skip, limit };
    const result = await contactsService.listContacts({ filter, fields, settings });
    const total = await contactsService.countContacts(filter);
    res.json({
        total,
        result
    });
};

const getOneContact = async (req, res, next) => {
    const { id: _id } = req.params;
    const { _id: owner } = req.user;
    const contact = await contactsService.getContact({ _id, owner });
    if (!contact) {
        throw HttpError(404, "Not found");
    }
    res.json(contact);
}

const deleteContact = async (req, res, next) => {
    const { id: _id } = req.params;
    const { _id: owner } = req.user;
    const responce = await contactsService.removeContact({ _id, owner });
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
    const { _id: owner } = req.user;
    const responce = await contactsService.addContact({ ...req.body, owner })
    res.status(201).json(responce)
};

const updateContact = async (req, res, next) => {
    const { error } = updateContactSchema.validate(req.body)
    if (error) {
        throw HttpError(400, error.message)
    }
    const { id: _id } = req.params;
    const { _id: owner } = req.user;
    const responce = await contactsService.updateContact({ _id, owner }, req.body);

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
    const { id: _id } = req.params;
    const { _id: owner } = req.user;
    const responce = await contactsService.updateStatusContact({ _id, owner }, req.body);

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