import express from "express";
import {
  getAllTodos,
  createTodo,
  renameTodo,
  toggleTodo,
  deleteTodo,
} from "../controller/TodosController.ts";

const router = express.Router();

router.get("/", getAllTodos);
router.post("/", createTodo);
router.put("/rename/:id", renameTodo);
router.put("/toggle/:id", toggleTodo);
router.delete("/:id", deleteTodo);

export default router;
