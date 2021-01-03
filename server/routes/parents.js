const express = require('express');
const { pool } = require('../config/db.config');
const router = express.Router();
const { check, validationResult } = require('express-validator');

router.get('/parents', async(req, res) => {
    try {
        await pool.query("SELECT * FROM Parents", (err, data) => {
            err ? res.status(404).send(err) : res.json(data);
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

router.get('/parents/:parent_id', async(req, res) => {
    var sql = "SELECT parent_id, first_name, last_name, phone_number, address, age FROM Parents WHERE parent_id = ?";
    var inserts = [req.params.parent_id];
    try {
        await pool.query(sql, inserts, (err, data) => {
            err ? res.status(404).send(err) : res.json(data[0])
        })
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

router.post('/parents/new', [check('first_name', 'First name is required. Must be at least 2 characters in length').not().isEmpty().isLength({ min: 2 }),
    check('last_name', 'Last name is required. Must be at least 2 characters in length.').not().isEmpty().isLength({ min: 2 }), check('phone_number', 'Phone Number is required with area code.').not().isEmpty(),
    check('address', 'Home address is required.').not().isEmpty(), check('age', 'Age is required').not().isEmpty()],
    async(req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        var inserts = [req.body.first_name, req.body.last_name, req.body.phone_number, req.body.address, req.body.age];
        var sql = "INSERT INTO Parents (first_name, last_name, phone_number, address, age) VALUES (?,?,?,?,?)";
        try {
            await pool.query(sql, inserts, (err, data) => {
                err ? res.send(err) : res.json(data); console.log('Parent was created');
            });
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
});

router.put('/parents/update/:parent_id', async(req, res) => {
    var inserts = [req.body.first_name, req.body.last_name, req.body.phone_number, req.body.address, req.params.parent_id];
    var sql = "UPDATE Parents SET first_name = ?, last_name = ?, phone_number = ?, address = ? WHERE parent_id = ?";
    try {
        await pool.query(sql, inserts, (err, data) => {
            err ? res.status(404).send(err) : res.json(data); console.log('Parent has been updated');
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error')
    }
});

// router.delete('/parents/:parent_id', async(req, res) => {
//     var sql = "DELETE FROM Parents WHERE parent_id = ?";
//     var inserts = [req.params.parent_id];
//     try {
//         await pool.query(sql, inserts, (err, data) => {
//             err ? res.status(400).send(err) : res.status(202).end(); console.log('Child was deleted');
//         });
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send('Server Error');
//     }
// });

module.exports = router;
