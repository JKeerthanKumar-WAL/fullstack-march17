var express = require("express");
var router = express.Router();
let forums = [
  {
    title: "The wings of fire",
    author: "Abdul Kalam",
    dateOfAdding: "2022-03-20",
    body: "It is a book written by Abdul Kalam",
  },
];
router.get("/", (req, res) => {
  res.json(forums);
});
router.post("/", (req, res) => {
  console.log(req.body);
  let { title, author, dateOfAdding, body } = req.body;
  forums.push({ title, author, dateOfAdding, body });
  res.send({ status: "New user details are added" });
});
router.delete("/:id", (req, res) => {
  console.log(req.params.id);
  let newForums = forums.filter((val, index) => {
    if (index === parseInt(req.params.id)) {
      return false;
    } else {
      return true;
    }
  });
  forums = newForums;
  res.send({ status: "Selected user details are deleted" });
});
router.get("/clearall", (req, res) => {
  forums = [];
  res.send({ status: "All user details are removed" });
});

module.exports = router;
