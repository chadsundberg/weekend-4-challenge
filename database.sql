CREATE TABLE tasks (
id SERIAL PRIMARY KEY,
task_name VARCHAR(80),
task_completed boolean DEFAULT FALSE
);
