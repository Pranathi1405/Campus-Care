const db = require('../config/db');

const createComplaint = (student_id, category, description, urgency, department, callback) => {
    const sql = `
        INSERT INTO complaints 
        (student_id, category, description, urgency, department)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(sql, [student_id, category, description, urgency, department], (err, result) => {
        if (err) {
            console.log(err);
            return callback(err, null);
        }
        callback(null, result);
    });
};

const getComplaintsByStudent = (student_id, callback) => {
    const sql = "SELECT * FROM complaints WHERE student_id = ? ORDER BY created_at DESC";

    db.query(sql, [student_id], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};
const getAllComplaints = (callback) => {
    const sql = `
        SELECT complaints.*, users.name AS student_name
        FROM complaints
        JOIN users ON complaints.student_id = users.id
        ORDER BY created_at DESC
    `;

    db.query(sql, (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};
const updateComplaintStatus = (id, status, remarks, callback) => {
    const sql = `
        UPDATE complaints 
        SET status = ?, remarks = ?
        WHERE id = ?
    `;

    db.query(sql, [status, remarks, id], (err, result) => {
        if (err) {
    console.log("Update Error:", err);
    return callback(err, null);
}

        callback(null, result);
    });
};

const getComplaintStats = (department, role, callback) => {

    let sql;

    if (role === 'manager') {
        sql = `
            SELECT 
                COUNT(*) AS total,
                SUM(status = 'pending') AS pending,
                SUM(status = 'in-progress') AS inProgress,
                SUM(status = 'resolved') AS resolved
            FROM complaints
            WHERE department = ?
        `;

        db.query(sql, [department], callback);

    } else {
        sql = `
            SELECT 
                COUNT(*) AS total,
                SUM(status = 'pending') AS pending,
                SUM(status = 'in-progress') AS inProgress,
                SUM(status = 'resolved') AS resolved
            FROM complaints
        `;

        db.query(sql, callback);
    }
};

module.exports = {
    createComplaint,
    getComplaintsByStudent,
    getAllComplaints,
    updateComplaintStatus,
    getComplaintStats
};

