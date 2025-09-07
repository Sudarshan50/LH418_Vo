import e from "express";
import ses from "../controllers/SessionController.js";
const sr = e.Router();

sr.post('/', ses.create);
sr.get('/:id', ses.status);
sr.put('/:id', ses.update);
sr.get('/', ses.getAll);

export default sr;
