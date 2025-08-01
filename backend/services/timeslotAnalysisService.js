const connection = require('../db');

const getTimeslotAnalysis = async (daterange) => {
    let query = '';
    switch (daterange) {
        case 'today':
            query = `select Sum(price) as Revenue,sum(quantity) as Orders, left(order_time,2) as slot 
                    from orders 
                    where order_date = curdate() 
                    group by slot order by slot
            `;
            
            break;

        case 'week':
            query = `select Sum(price) as Revenue,sum(quantity) as Orders, left(order_time,2) as slot 
                    from orders 
                    where week(order_date)  = week(curdate()) 
                    group by slot order by slot
            `;
            break;

        case 'month':
            query = `select Sum(price) as Revenue,sum(quantity) as Orders, left(order_time,2) as slot 
                    from orders 
                    where month(order_date)  = month(curdate()) 
                    group by slot order by slot
            `;
            break;
        case 'year':
            query = `select Sum(price) as Revenue,sum(quantity) as Orders, left(order_time,2) as slot 
                    from orders 
                    where year(order_date)  = year(curdate()) 
                    group by slot order by slot
            `;
            break;
        default:
            query = `select Sum(price) as Revenue,sum(quantity) as Orders, left(order_time,2) as slot 
                    from orders 
                    where order_date = curdate() 
                    group by slot order by slot
            `;
            break;
    }
    try {
        const [rows] = await connection.query(query);
        return rows;
    } catch (error) {
        console.error('Error fetching timeslot analysis:', error);
        throw error;
    }
}

module.exports = { getTimeslotAnalysis };

