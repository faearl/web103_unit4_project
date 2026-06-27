import { pool } from '../config/database.js';

const getContainers = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM containers ORDER BY id ASC');
        res.status(200).json(results.rows);
    }
    catch (error) {
        res.status(409).json({ error: error.message });
    }
}

const getFlavors = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM flavors ORDER BY id ASC');
        res.status(200).json(results.rows);
    }
    catch (error) {
        res.status(409).json({ error: error.message });
    }
}

const getToppings = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM toppings ORDER BY id ASC');
        res.status(200).json(results.rows);
    }
    catch (error) {
        res.status(409).json({ error: error.message });
    }
}

export default {
    getContainers,
    getFlavors,
    getToppings,
};

