import { pool } from './database.js'
import containersData from '../data/containers.js'
import flavorsData from '../data/flavors.js'
import toppingsData from '../data/toppings.js'

const createOrdersTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS orders CASCADE;

        CREATE TABLE IF NOT EXISTS orders (
            id SERIAL PRIMARY KEY,
            container_id INT REFERENCES containers(id) NOT NULL,
            flavor_id INT REFERENCES flavors(id) NOT NULL,
            topping1_id INT REFERENCES toppings(id),
            topping2_id INT REFERENCES toppings(id),
            total_price DECIMAL(10,2) NOT NULL
        )
    `

    try {
        await pool.query(createTableQuery)
        console.log('🎉 orders table created successfully')
    } catch (err) {
        console.error('⚠️ error creating orders table', err)
    }
}

const createContainersTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS containers CASCADE;

        CREATE TABLE IF NOT EXISTS containers (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            image VARCHAR(255) NOT NULL,
            price DECIMAL(10,2) NOT NULL
        )
    `
    try {
        await pool.query(createTableQuery)
        console.log('🎉 containers table created successfully')
    } catch (err) {
        console.error('⚠️ error creating containers table', err)
    }
}

const createFlavorsTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS flavors CASCADE;

        CREATE TABLE IF NOT EXISTS flavors (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            image VARCHAR(255) NOT NULL,
            price DECIMAL(10,2) NOT NULL
        )
    `
    try {
        await pool.query(createTableQuery)
        console.log('🎉 flavors table created successfully')
    } catch (err) {
        console.error('⚠️ error creating flavors table', err)
    }
}

const createToppingsTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS toppings CASCADE;

        CREATE TABLE IF NOT EXISTS toppings (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            image VARCHAR(255) NOT NULL,
            price DECIMAL(10,2) NOT NULL
        )
    `

    try {
        await pool.query(createTableQuery)
        console.log('🎉 toppings table created successfully')
    } catch (err) {
        console.error('⚠️ error creating toppings table', err)
    }
}

const seedContainersTable = async () => {
    await createContainersTable()

    for (const container of containersData) {
        const insertQuery = {
            text: 'INSERT INTO containers (name, image, price) VALUES ($1, $2, $3)',
            values: [
                container.name,
                container.image,
                container.price,
            ],
        }

        try {
            await pool.query(insertQuery)
            console.log(`✅ ${container.name} added successfully`)
        } catch (err) {
            console.error('⚠️ error inserting container', err)
        }
    }
}

const seedFlavorsTable = async () => {
    await createFlavorsTable()

    for (const flavor of flavorsData) {
        const insertQuery = {
            text: 'INSERT INTO flavors (name, image, price) VALUES ($1, $2, $3)',
            values: [
                flavor.name,
                flavor.image,
                flavor.price,
            ],
        }

        try {
            await pool.query(insertQuery)
            console.log(`✅ ${flavor.name} added successfully`)
        } catch (err) {
            console.error('⚠️ error inserting flavor', err)
        }
    }
}

const seedToppingsTable = async () => {
    await createToppingsTable()

    for (const topping of toppingsData) {
        const insertQuery = {
            text: 'INSERT INTO toppings (name, image, price) VALUES ($1, $2, $3)',
            values: [
                topping.name,
                topping.image,
                topping.price,
            ],
        }

        try {
            await pool.query(insertQuery)
            console.log(`✅ ${topping.name} added successfully`)
        } catch (err) {
            console.error('⚠️ error inserting topping', err)
        }
    }
}



const seed = async () => {
    await seedContainersTable()
    await seedFlavorsTable()
    await seedToppingsTable()
    await createOrdersTable()
}

seed().then(() => process.exit(0)).catch(() => process.exit(1))