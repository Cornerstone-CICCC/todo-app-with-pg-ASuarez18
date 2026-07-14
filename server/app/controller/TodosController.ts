//  getAllTodos,
//   createTodo,
//   patchTodo,
//   updateTodo,
//   deleteTodo,

import express from "express";

import * as Todo from "../models/TodoModel.ts";

export const getAllTodos = async (
  req: express.Request,
  res: express.Response,
) => {
  const todos = await Todo.getAll();
  res.status(201).json(todos);
};

export const createTodo = async (
  req: express.Request,
  res: express.Response,
) => {
  const { task } = req.body;
  const newTodo = await Todo.create({ task });
  res.status(201).json(newTodo);
};

export const renameTodo = async (
  req: express.Request,
  res: express.Response,
) => {
  const { id } = req.params;
  const { task } = req.body;

  if (!task) {
    return res.status(400).json({ error: "Task is required" });
  }

  const updatedTodo = await Todo.rename(Number(id), task);

  if (!updatedTodo) {
    return res.status(404).json({ error: "Todo not found" });
  }

  res.status(200).json(updatedTodo);
};

export const toggleTodo = async (
  req: express.Request,
  res: express.Response,
) => {
  const { id } = req.params;

  const updatedTodo = await Todo.toggle(Number(id));

  if (!updatedTodo) {
    return res.status(404).json({ error: "Todo not found" });
  }

  res.status(200).json(updatedTodo);
};

export const deleteTodo = async (
  req: express.Request,
  res: express.Response,
) => {
  const { id } = req.params;

  const success = await Todo.remove(Number(id));

  if (!success) {
    return res.status(404).json({ error: "Todo not found" });
  }

  res.status(204).send();
};