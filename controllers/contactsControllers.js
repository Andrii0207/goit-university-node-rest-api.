import contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js"
import ctrlWrapper from "../decorators/ctrlWrapper.js"

import fs from "fs/promises"
import path from "path";


const avatarPath = path.resolve("public", "avatars");

const getAllContacts = async (req, res, next) => {
    const { _id: owner } = req.user;
    const fields = "";
    const { page = 1, limit = 20, favorite } = req.query;
    const filter = { owner, ...(favorite && { favorite }) };
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
    const { _id: owner } = req.user;
    if (!req.file) {
        throw HttpError(400, "poster is required for create new contact")
    }
    const { path: oldPath, filename } = req.file;

    const newPath = path.join(avatarPath, filename);

    await fs.rename(oldPath, newPath);
    const avatarURL = path.join("public", "avatars", filename);

    const responce = await contactsService.addContact({ ...req.body, avatarURL, owner })
    res.status(201).json(responce)
};

const updateContact = async (req, res, next) => {
    const { id: _id } = req.params;
    const { _id: owner } = req.user;
    const responce = await contactsService.updateContact({ _id, owner }, req.body);

    if (!responce) {
        throw HttpError(404, "Not found");
    }
    res.status(200).json(responce)
};

const updateStatus = async (req, res, next) => {
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