const express = require("express");
const meetingsRouter = express.Router({ mergeParams: true });

const { createMeeting, findDataArrayByName, addToDatabase } = require("./db");

meetingsRouter.get("/", (req, res) => {
  res.send(findDataArrayByName("meetings").data);
});

meetingsRouter.post("/", (req, res) => {
  let newMeeting = createMeeting();
  newMeeting = addToDatabase("meetings", newMeeting);
  res.status(201).send(newMeeting);
});

meetingsRouter.delete("/", (req, res) => {
  findDataArrayByName("meetings").data = [];
  res.status(204).send();
});
module.exports = meetingsRouter;
