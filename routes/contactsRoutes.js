const router = require("express").Router();
const contactsController = require("../controllers/contactsController");

router.get("/", contactsController.getAllContacts);
router.get("/:id", contactsController.getContactById);
router.post("/", contactsController.createContact);
router.put("/:id",  contactsController.updateContact);
router.delete("/:id", contactsController.deleteContact);

module.exports = router;
