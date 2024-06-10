const { credit, debit } = require("../controllers/account.controller");

const routes = require("express").Router();

routes.post("/credit", credit).post("/debit", debit);

module.exports = routes;
