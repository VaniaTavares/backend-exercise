const express = require("express");
const { findDataArrayByName, addToDatabase } = require("./db");
const workRouter = express.Router({ mergeParams: true });

workRouter.get("/", (req, res) => {
  const workLoad = findDataArrayByName("work").data.filter(
    (elt) => elt.minionId === req.params.minionId
  );
  res.send(workLoad);
});

workRouter.post("/", (req, res) => {
  let newTask = req.body;
  newTask = addToDatabase("work", newTask);
  res.status(201).send(newTask);
});

workRouter.put("/:workId", (req, res) => {
  const workLoadIndex = findDataArrayByName("work").data.findIndex(
    (elt) =>
      elt.minionId === req.params.minionId && elt.id === req.params.workId
  );

  if (workLoadIndex !== -1) {
    const updates = req.body;
    findDataArrayByName("work").data[workLoadIndex] = updates;
    res.send(findDataArrayByName("work").data[workLoadIndex]);
  } else {
    res.status(400).send();
  }
});

workRouter.delete("/:workId", (req, res) => {
  const workLoadIndex = findDataArrayByName("work").data.findIndex(
    (elt) =>
      elt.minionId === req.params.minionId && elt.id === req.params.workId
  );

  if (workLoadIndex !== -1) {
    findDataArrayByName("work").data.splice(workLoadIndex, 1);
    res.status(204).send(findDataArrayByName("work").data);
  } else {
    res.status(404).send();
  }
});

module.exports = workRouter;
