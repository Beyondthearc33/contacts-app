const { getDb } = require("../db/mongoConnect");
const { ObjectId } = require("mongodb");

const getAllContacts = async (req, res) => {
  try {
    const db = getDb();

    const contacts = await db.collection("contacts").find().toArray();

    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching contacts",
      error: error.message,
    });
  }
};

const getContactById = async (req, res) => {
  try {
    const db = getDb();
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid contact id." });
    }

    const contact = await db
      .collection("contacts")
      .findOne({ _id: new ObjectId(id) });

    if (!contact) {
      return res.status(404).json({ message: "Contact not found." });
    }

    return res.status(200).json(contact);
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching contact",
      error: error.message,
    });
  }
};

const createContact = async (req, res) => {
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const db = getDb();

    const result = await db.collection("contacts").insertOne({
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday,
    });

    res.status(201).json({ id: result.insertedId });
  } catch (error) {
    res.status(500).json({
      message: "Error creating contact",
      error: error.message,
    });
  }
};

const updateContact = async (req, res) => {
     try {
    const db = getDb();
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid contact id." });
    }

    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const result = await db.collection("contacts").replaceOne(
      { _id: new ObjectId(id) },
      { firstName, lastName, email, favoriteColor, birthday }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Contact not found." });
    }

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({
      message: "Error updating contact",
      error: error.message
    });
  }
}

const deleteContact = async (req, res) => {
  try {
    const db = getDb();
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid contact id." });
    }

    const result = await db.collection("contacts").deleteOne({
      _id: new ObjectId(id)
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Contact not found." });
    }

    return res.status(204).json({ message: "Contact deleted." });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting contact",
      error: error.message
    });
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
};