
import fs from "fs/promises"
import path from "path"
import { nanoid } from "nanoid"

const contactsPath = path.resolve("db", "contacts.json")
const updateMovies = contacts => fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));


async function listContacts() {
    const contactList = await fs.readFile(contactsPath)
    return JSON.parse(contactList);
}

async function getContactById(id) {
    const contactList = await listContacts();
    const contact = contactList.find(item => item.id === id)
    return contact || null;
}

async function removeContact(id) {
    const contactList = await listContacts();
    const index = contactList.findIndex(item => item.id === id)

    if (index === -1) {
        return null;
    }

    const [result] = contactList.splice(index, 1)
    await updateMovies(contactList)
    return result;
}

async function addContact(data) {
    const contactList = await listContacts();

    const newContact = {
        id: nanoid(),
        ...data
    }
    contactList.push(newContact);
    await updateMovies(contactList);

    return newContact;
}

async function updateContact(id, data) {
    const contactList = await listContacts();

    const index = contactList.findIndex(item => item.id === id)
    if (index === -1) {
        return null;
    }
    contactList[index] = { ...contactList[index], ...data };
    await updateMovies(contactList);

    return contactList[index];
}

export default {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact
}
