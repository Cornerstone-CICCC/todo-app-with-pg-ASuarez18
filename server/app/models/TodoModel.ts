import { pool } from "../db/pool.ts";

export type Todo = {
  id?: number;
  task: string;
  done?: boolean;
  created_at?: Date;
  updated_at?: Date;
};

export async function getAll(): Promise<Todo[]> {
  const { rows } = await pool.query("SELECT * FROM todos ORDER BY created_at DESC");
  return rows;
};

export async function create(data: Todo): Promise<Todo> {
  const query = "INSERT INTO todos (task) VALUES ($1) RETURNING *";
  const values = [data.task];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

export async function rename(id: number, task: string): Promise<Todo | null> {
  const query = "UPDATE todos SET task = $1, updated_at = NOW() WHERE id = $2 RETURNING *";
  const values = [task, id];
  const { rows } = await pool.query(query, values);
  return rows[0] || null;
}

export async function toggle(id: number): Promise<Todo | null> {
  // Get current status of the todo
  const { rows } = await pool.query("SELECT done FROM todos WHERE id = $1", [id]);
  if (rows.length === 0) {
    return null; // Todo not found
  }

  const currentStatus = rows[0].done;
  
  // Toggle the status
  const query = "UPDATE todos SET done = $1, updated_at = NOW() WHERE id = $2 RETURNING *"
  const values = [!currentStatus, id];

  const result = await pool.query(query, values);
  return result.rows[0] || null;
}

export async function remove(id: number): Promise<boolean> {
  const query = "DELETE FROM todos WHERE id = $1 RETURNING *";
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0] || null ? true : false;
}