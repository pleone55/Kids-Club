const express = require('express');
const { pool } = require('../config/db.config');
const router = express.Router();
const { check, validationResult } = require('express-validator');

router.get('/kids', async(req, res) => {
    try {
        await pool.query("SELECT * FROM Kids", (err, data) => {
            err ? res.status(404).send(err) : res.json(data);
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

router.get('/kids/:kid_id', async(req, res) => {
    var sql = "SELECT kid_id, first_name, last_name, age, eye_color, hair_color, gender, checked_in, checked_in_time, parent_id FROM Kids WHERE kid_id = ?";
    var inserts = [req.params.kid_id];
    try {
        await pool.query(sql, inserts, (err, data) => {
            err ? res.status(404).send(err) : res.json(data[0])
        })
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

router.post('/kids/new', [check('first_name', 'First name is required. Must be at least 2 characters in length').not().isEmpty().isLength({ min: 2 }),
    check('last_name', 'Last name is required. Must be at least 2 characters in length.').not().isEmpty().isLength({ min: 2 }), check('age', 'Age is required').not().isEmpty(),
    check('eye_color', 'Eye Color is required').not().isEmpty(), check('hair_color', 'Hair color is required').not().isEmpty(),
    check('parent_id', 'Child must have a parent').not().isEmpty()],
    async(req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        var inserts = [req.body.first_name, req.body.last_name, req.body.age, req.body.eye_color, req.body.hair_color, req.body.gender, req.body.parent_id];
        var sql = "INSERT INTO Kids (first_name, last_name, age, eye_color, hair_Color, gender, parent_id) VALUES (?,?,?,?,?,?,?)";
        try {
            await pool.query(sql, inserts, (err, data) => {
                err ? res.send(err) : res.json(data); console.log('Child was created');
            });
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
});

router.put('/kids/update/:kid_id', async(req, res) => {
    var inserts = [req.body.checked_in, req.body.checked_in_time, req.params.kid_id];
    var sql = "UPDATE Kids SET checked_in = ?, checked_in_time = ? WHERE kid_id = ?";
    try {
        await pool.query(sql, inserts, (err, data) => {
            err ? res.status(404).send(err) : res.json(data); console.log('Child has been updated');
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error')
    }
});

router.delete('/kids/:kid_id', async(req, res) => {
    var sql = "DELETE FROM Kids WHERE kid_id = ?";
    var inserts = [req.params.kid_id];
    try {
        await pool.query(sql, inserts, (err, data) => {
            err ? res.status(400).send(err) : res.status(202).end(); console.log('Child was deleted');
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router;
