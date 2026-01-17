const { getDb } = require("../db/mongoConnect");
const { ObjectId } = require("mongodb"); 
const router = require("express").Router();
router.get("/", async (req, res) => {
  try {
    const db = getDb();

    const contacts = await db
      .collection("contacts")
      .find()
      .toArray();

    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching contacts",
      error: error.message
    });
  }
});

router.get("/:id", async (req, res) => {
    try {
    
    const db = getDb();
    
    const id = req.params.id;
    
    const contacts = await db
      .collection("contacts")
      .findOne({_id: new ObjectId(id)})

    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching contacts",
      error: error.message
    });
  }
});
        // id: req.params.id

module.exports = router;
