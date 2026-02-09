const complaintModel = require('../models/complaintModel');

const createComplaint = (req, res) => {
    const { category, description, urgency } = req.body;
    const student_id = req.user.id;

    let department;

    if (category.toLowerCase() === "electrical") {
        department = "Electrical";
    } else if (category.toLowerCase() === "cleaning") {
        department = "Housekeeping";
    } else if (category.toLowerCase() === "it") {
        department = "IT Support";
    } else {
        department = "General";
    }

    complaintModel.createComplaint(
        student_id,
        category,
        description,
        urgency || 'low',
        department,
        (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Error creating complaint" });
            }

            res.status(201).json({
                message: "Complaint submitted successfully"
            });
        }
    );
};


const getMyComplaints = (req, res) => {
    const student_id = req.user.id;

    complaintModel.getComplaintsByStudent(student_id, (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Error fetching complaints" });
        }

        res.json(results);
    });
};
const getAllComplaints = (req, res) => {
    complaintModel.getAllComplaints((err, results) => {
        if (err) {
            return res.status(500).json({ message: "Error fetching complaints" });
        }

        res.json(results);
    });
};
const updateComplaint = (req, res) => {
    const { id } = req.params;
    const { status, remarks } = req.body;

    complaintModel.updateComplaintStatus(id, status, remarks, (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Error updating complaint" });
        }

        res.json({
            message: "Complaint updated successfully"
        });
    });
};
const getStats = (req, res) => {

    const role = req.user.role;
    const department = req.user.department;

    complaintModel.getComplaintStats(department, role, (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Error fetching stats" });
        }

        res.json(results[0]);
    });
};

module.exports = {
    createComplaint,
    getMyComplaints,
    getAllComplaints,
    updateComplaint,
    getStats
};

