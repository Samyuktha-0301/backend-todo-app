const { Router } = require("express");
const { saveToDo, getTodo, updateToDo, deleteToDo } = require('../controllers/Todocontroller');
const router = Router();

router.post('/', getTodo);
router.post('/save', saveToDo);
router.put('/update', updateToDo); // Changed POST to PUT for update
router.delete('/delete', deleteToDo); // Ensure the route is correct for DELETE

module.exports = router;
