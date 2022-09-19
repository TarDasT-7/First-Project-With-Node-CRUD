const express = require("express");
const joi = require("joi");
const data = require("../../data/users");

const router = express.Router();

const formValidation = (data) => {
  const schema = joi.object({
    name: joi.string().min(2).max(50).required(),
    subject: joi.string().min(2).max(50).required(),
  });

  const { error } = schema.validate(data);

  if (error) {
    return {
      status: error.status,
      message: error.message,
    };
  }

  return {
    status: 200,
    message: "SUCCESS",
  };
};

router.get("/api/users", (req, res) => {
  res.send(data);
});

router.post("/api/users", (req, res) => {
  const request = req.body;
  const checkValidForm = formValidation(request);

  if (checkValidForm.status === 200) {
    const user = {
      id: data[data.length - 1].id + 1,
      name: request.name,
      subject: request.subject,
    };

    data.push(user);
    res.send(data);
  } else {
    res.send(checkValidForm.message);
  }
});

router.get("/api/users/:id", (req, res) => {
  const id = req.params.id;

  const user = data.find((u) => u.id == id);
  if (!user) {
    res.send("not found user");
  }
  res.send(user);
});

router.put("/api/users/:id", (req, res) => {
  const request = req.body;
  const checkValidForm = formValidation(request);
  const id = req.params.id;

  const user = data.find((u) => u.id == id);
  if (!user) {
    res.send("not found user");
  }

  if (checkValidForm.status === 200) {
    user.name = request.name;
    user.subject = request.subject;

    res.send(data);
  } else {
    res.send(checkValidForm.message);
  }
});

router.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;

  const user = data.find((u) => u.id == id);
  if (!user) {
    res.send("not found user");
  }
  res.send(data.filter((u) => u.id != id));
});

module.exports = router;