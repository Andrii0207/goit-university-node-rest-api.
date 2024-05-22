import Contact from "../models/Contact.js"


const listContacts = (search = {}) => {
    const { filter = {}, fields = "", settings = {} } = search;
    return Contact.find(filter, fields, settings).populate("owner", "email subscription")
};

const countContacts = filter => Contact.countDocuments(filter)

const getContact = filter => Contact.findOne(filter)

const removeContact = filter => Contact.findOneAndDelete(filter)

const addContact = data => Contact.create(data);

const updateContact = (filter, body) => Contact.findOneAndUpdate(filter, body)

const updateStatusContact = (filter, body) => Contact.findByIdAndUpdate(filter, body)


export default {
    listContacts,
    countContacts,
    getContact,
    removeContact,
    addContact,
    updateContact,
    updateStatusContact
}