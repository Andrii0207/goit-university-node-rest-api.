import Contact from "../models/Contact.js"


const listContacts = (search = {}) => {
    const { filter = {}, fields = "" } = search;
    return Contact.find(filter, fields)
};

const getContactById = _id => Contact.findById(_id)

const removeContact = id => Contact.findByIdAndDelete(id)

const addContact = data => Contact.create(data);

const updateContact = (id, body) => Contact.findByIdAndUpdate(id, body)

const updateStatusContact = (id, body) => Contact.findByIdAndUpdate(id, body)

export default {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
    updateStatusContact
} 
