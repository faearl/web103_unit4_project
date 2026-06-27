import { pool } from '../config/database.js';

const createOrder = async (req, res) => {
    const { container_id, flavor_id, topping1_id, topping2_id, total_price } = req.body;

    const insertQuery = `
        INSERT INTO orders (container_id, flavor_id, topping1_id, topping2_id, total_price)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `;

    try {
        const results = await pool.query(insertQuery, [container_id, flavor_id, topping1_id, topping2_id, total_price]);
        res.status(201).json(results.rows[0]);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

const getOrderById = async (req, res) => {
    const { id } = req.params;
    const query = `
        SELECT
            orders.id,
            orders.total_price,
            c.id    AS container_id,  c.name AS container_name,  c.image AS container_image,  c.price AS container_price,
            f.id    AS flavor_id,     f.name AS flavor_name,     f.image AS flavor_image,     f.price AS flavor_price,
            t1.id   AS topping1_id,   t1.name AS topping1_name,  t1.image AS topping1_image,  t1.price AS topping1_price,
            t2.id   AS topping2_id,   t2.name AS topping2_name,  t2.image AS topping2_image,  t2.price AS topping2_price
        FROM orders
        JOIN containers c   ON orders.container_id = c.id
        JOIN flavors    f   ON orders.flavor_id    = f.id
        LEFT JOIN toppings t1 ON orders.topping1_id = t1.id
        LEFT JOIN toppings t2 ON orders.topping2_id = t2.id
        WHERE orders.id = $1
    `;
    try {
        const results = await pool.query(query, [id]);
        if (results.rowCount === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(results.rows[0]);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

const editOrder = async (req, res) => {
    const { id } = req.params;
    const { container_id, flavor_id, topping1_id, topping2_id, total_price } = req.body;

    const updateQuery = `
        UPDATE orders
        SET container_id = $1, flavor_id = $2, topping1_id = $3, topping2_id = $4, total_price = $5
        WHERE id = $6
        RETURNING *;
    `;

    try {
        const results = await pool.query(updateQuery, [container_id, flavor_id, topping1_id, topping2_id, total_price, id]);
        if (results.rowCount === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(results.rows[0]);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

const deleteOrder = async (req, res) => {
    const { id } = req.params;

    const deleteQuery = `
        DELETE FROM orders
        WHERE id = $1
        RETURNING *;
    `;

    try {
        const results = await pool.query(deleteQuery, [id]);
        if (results.rowCount === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

const getAllOrders = async (req, res) => {
    const query = `
        SELECT
            orders.id,
            orders.total_price,
            c.image  AS container_image,
            f.image  AS flavor_image,
            t1.image AS topping1_image,
            t2.image AS topping2_image
        FROM orders
        JOIN containers c   ON orders.container_id = c.id
        JOIN flavors    f   ON orders.flavor_id    = f.id
        LEFT JOIN toppings t1 ON orders.topping1_id = t1.id
        LEFT JOIN toppings t2 ON orders.topping2_id = t2.id
        ORDER BY orders.id ASC
    `;
    try {
        const results = await pool.query(query);
        res.status(200).json(results.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export default {
    createOrder,
    getOrderById,
    editOrder,
    deleteOrder,
    getAllOrders
}