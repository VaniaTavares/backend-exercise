const express = require("express");
const minionsRouter = express.Router({ mergeParams: true });

const { findDataArrayByName, addToDatabase } = require("./db");

const workRouter = require("./work");
minionsRouter.use("/:minionId/work", workRouter);

minionsRouter.param("minionId", (req, res, next, id) => {
  if (!Number.isNaN(Number(id))) {
    const minionIndex = findDataArrayByName("minions").data.findIndex(
      (elt) => Number(elt.id) === Number(id)
    );

    if (minionIndex !== -1) {
      req.minionIndex = minionIndex;
      next();
    } else {
      res.status(404).send();
    }
  } else {
    res.status(404).send("Provide a numeric id");
  }
});

minionsRouter.get("/", (req, res) => {
  const minions = findDataArrayByName("minions");
  res.send(minions.data);
});

minionsRouter.get("/:minionId", (req, res) => {
  const minion = findDataArrayByName("minions").data[req.minionIndex];
  res.send(minion);
});

minionsRouter.put("/:minionId", (req, res) => {
  const updates = req.body;
  findDataArrayByName("minions").data[req.minionIndex] = updates;

  res.send(findDataArrayByName("minions").data[req.minionIndex]);
});

minionsRouter.delete("/:minionId", (req, res) => {
  findDataArrayByName("minions").data.splice(req.minionIndex, 1);
  res.status(204).send();
});

minionsRouter.post("/", (req, res) => {
  let newMinion = req.body;
  newMinion = addToDatabase("minions", newMinion);
  res.status(201).send(newMinion);
});

module.exports = minionsRouter;
