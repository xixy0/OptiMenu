const connection = require('../db');

const fetchTopItems = async (dateRange) => {
    let query = '';
    switch (dateRange) {
        case 'today':
            query = `
                SELECT itemname, SUM(quantity) AS value
                FROM orders
                WHERE order_date = CURDATE()
                GROUP BY itemname
                ORDER BY value DESC
                LIMIT 5
            `;
            break;
        case 'week':
            query = `
                SELECT itemname, SUM(quantity) AS value
                FROM orders
                WHERE YEARWEEK(order_date) = YEARWEEK(CURDATE())
                GROUP BY itemname
                ORDER BY value DESC
                LIMIT 5
            `;
            break;
        case 'month':
            query = `
                SELECT itemname, SUM(quantity) AS value
                FROM orders
                WHERE MONTH(order_date) = MONTH(CURDATE())
                AND YEAR(order_date) = YEAR(CURDATE())
                GROUP BY itemname
                ORDER BY value DESC
                LIMIT 5
            `;
            break;
        case 'year':
            query = `
                SELECT itemname, SUM(quantity) AS value
                FROM orders
                WHERE YEAR(order_date) = YEAR(CURDATE())
                GROUP BY itemname
                ORDER BY value DESC
                LIMIT 5
            `;
            break;
        default:
            throw new Error('Invalid date range');
    }
    try {
        const [rows] = await connection.query(query);
        return rows;
    } catch (error) {
        console.error('Error fetching top items from the database:', error);
        throw error;
    }
};

module.exports = { fetchTopItems };
