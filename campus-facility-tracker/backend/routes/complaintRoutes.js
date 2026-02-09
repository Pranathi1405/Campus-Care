const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaintController');
const verifyToken = require('../middleware/authMiddleware');
const checkRole = require('../middleware/roleMiddleware');
const upload = require('../config/multerConfig');

router.post(
    '/create',
    verifyToken,
    checkRole(['student']),
    upload.single('image'),
    complaintController.createComplaint
);

router.get('/my', verifyToken, complaintController.getMyComplaints);
router.get('/all', verifyToken, complaintController.getAllComplaints);
router.put('/update/:id', verifyToken, complaintController.updateComplaint);
router.get('/stats', verifyToken, checkRole(['manager', 'admin']), complaintController.getStats);


module.exports = router;
