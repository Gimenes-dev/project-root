const db = require('../database/database');

class Task {
    static create(task, callback) {
        const { title, description, completed} = task;
        const sql = 'INSERT INTO tasks (title, description, completed) VALUES (?,?,?)';
        db.run(sql, [title, description, completed], function(err) {
            if (err) {
                return callback(err);
            }
            callback(null, { id: this.lastID, ...task });
        });
    }

    static findAll(callback) {
        const sql = 'SELECT * FROM tasks';
        db.all(sql, [], (err, rows) => {
            if (err) {
                return callback(err);
            }
            callback(null, rows);
        });
    }

    static findById(id, callback) {
        const sql = 'SELECT * FROM tasks WHERE id = ?';
        db.get(sql, [id], (err, row) => {
            if (err) {
                return callback(err);
            }
            callback(null, row);
        });
    }

    static update(id, task, callback) {
        const { title, description, completed } = task;
        const sql = 'UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ?';
        db.run(sql, [title, description, completed, id], function(err) {
            if (err) {
                return callback(err);
            }
            callback(null, { id, ...task });
        });
    }

    static delete(id, callback) {
        const sql = 'DELETE FROM tasks WHERE id = ?';
        db.run(sql, [id], function(err) {
            if (err) {
                return callback(err);
            }
            callback(null, this.changes > 0);
        });
    }
}

module.exports = Task;
