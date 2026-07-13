CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  task VARCHAR(150) NOT NULL,
  done BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO todos (task, done) VALUES
  ('Buy groceries', FALSE),
  ('Clean the house', TRUE),
  ('Finish the project', FALSE);

