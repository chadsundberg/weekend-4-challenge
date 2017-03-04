CREATE TABLE tasks (
id SERIAL PRIMARY KEY,
task_name VARCHAR(80) NOT NULL,
task_completed boolean NOT NULL DEFAULT FALSE
);
