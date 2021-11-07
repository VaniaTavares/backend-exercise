const express = require("express");
const ideasRouter = express.Router({ mergeParams: true });

const { findDataArrayByName, addToDatabase } = require("./db");
const checkMillionDollarIdea = require("./checkMillionDollarIdea");

ideasRouter.param("ideaId", (req, res, next, id) => {
  const ideaId = Number(id);

  if (Number.isNaN(ideaId)) {
    res.status(404).send();
  } else {
    const ideaIndex = findDataArrayByName("ideas").data.findIndex(
      (elt) => Number(elt.id) === ideaId
    );

    if (ideaIndex !== -1) {
      req.ideaIndex = ideaIndex;
      next();
    } else {
      res.status(404).send();
    }
  }
});

ideasRouter.get("/", (req, res) => {
  res.send(findDataArrayByName("ideas").data);
});

ideasRouter.get("/:ideaId", (req, res) => {
  res.send(findDataArrayByName("ideas").data[req.ideaIndex]);
});

ideasRouter.delete("/:ideaId", (req, res) => {
  findDataArrayByName("ideas").data.splice(req.ideaIndex, 1);
  res.status(204).send(findDataArrayByName("ideas"));
});

ideasRouter.put("/:ideaId", (req, res) => {
  if (req.body) {
    const updates = req.body;
    findDataArrayByName("ideas").data[req.ideaIndex] = updates;
    res.send(findDataArrayByName("ideas").data[req.ideaIndex]);
  }
});

ideasRouter.post("/", checkMillionDollarIdea, (req, res) => {
  let newIdea = req.body;
  newIdea = addToDatabase("ideas", newIdea);
  res.status(201).send(newIdea);
});

module.exports = ideasRouter;
