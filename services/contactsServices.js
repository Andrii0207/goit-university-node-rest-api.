import Contact from "../models/Contact.js"


const listContacts = (search = {}) => {
    const { filter = {}, fields = "" } = search;
    return Contact.find(filter, fields)
};

const getContact = filter => Contact.findOne(filter)

const removeContact = filter => Contact.findOneAndDelete(filter)

const addContact = data => Contact.create(data);

const updateContact = (filter, body) => Contact.findOneAndUpdate(filter, body)

const updateStatusContact = (filter, body) => Contact.findByIdAndUpdate(filter, body, { new: true })

export default {
    listContacts,
    getContact,
    removeContact,
    addContact,
    updateContact,
    updateStatusContact
} 