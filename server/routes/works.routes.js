const express = require("express");
const router = express.Router();
const db = require("../utils/database");

router.get("/", async (req, res) => {
  try {
    let data = await db.execute("SELECT * FROM works");
    let row = data[0];
    res.json({
      data: row,
    });
  } catch (error) {
    console.log(error);
  }
});
//get one
router.get("/:id", async (req, res) => {
  let { id } = req.params;
  try {
    let data = await db.execute(`SELECT * FROM works WHERE work_id=${id}`);
    let row = data[0];
    res.json({
      data: row,
    });
  } catch (error) {
    console.log(error);
  }
});
//delete
router.delete("/:id", async (req, res) => {
  let { id } = req.params;
  try {
    await db.execute(`DELETE FROM works WHERE (work_id = ${id});
    `);
    res.json({
      msessage: "delete success",
    });
  } catch (error) {
    console.log(error);
  }
});

//create
router.post("/", async (req, res) => {
  let { name, description } = req.body;
  try {
    await db.execute(`INSERT INTO works (name, description) VALUES (?, ?);`, [
      name,
      description,
    ]);

    res.json({
      message: `Post success`,
    });
  } catch (error) {
    console.log(error);
  }
});
//patch
router.patch("/:id", async (req, res) => {
  let { id } = req.params;
  let { name, description } = req.body;
  try {
    await db.execute(
      `UPDATE works SET name = ? , description = ? WHERE (work_id = ?);`,
      [name, description, id]
    );
    res.json({
      message: "Update success",
    });
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
