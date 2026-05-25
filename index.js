const { Client } = require('pg');
const express = require('express');

const app = express();
app.use(express.json());

const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'afsar',
    database: 'demopost'
});

client.connect().then(() => {
    console.log('Connected to database');
}).catch((err) => {
    console.error(err);
})
// .finally(() => {
//     client.end();
// });

// client.query('SELECT * FROM users', (err, res) => {
//     if (err) {
//         console.error(err);
//     }
//     console.log(res.rows);
//     client.end();
// });

app.post('/postData', (req, res) => {
    const { name, id } = req.body;
    const insert_query = `INSERT INTO demotable (name, id) VALUES ($1, $2)`

    client.query(insert_query, [name, id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error inserting data');
        }
        else {
            // console.log(result);
            // res.status(200).send(result.rows)
            res.status(200).json({ message: 'Data inserted successfully' });
        }
    })

})

app.get('/getData', (req, res) => {
    const select_query = `SELECT * FROM demotable`

    client.query(select_query, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error fetching data');
        }
        else {
            // console.log(result);
            // res.status(200).send(result.rows)
            res.status(200).json({ message: 'Data fetched successfully', data: result.rows });
        }
    })

})

app.get('/getSpecificData/:id', (req, res) => {
    const { id } = req.params;
    const select_query = `SELECT * FROM demotable WHERE id = $1`

    client.query(select_query, [id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error fetching data');
        }
        else {
            // console.log(result);
            // res.status(200).send(result.rows)
            res.status(200).json({ message: 'Data fetched successfully', data: result.rows });
        }
    })

})

app.patch('/updateData/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const update_query = `UPDATE demotable SET name = $1 WHERE id = $2`

    client.query(update_query, [name, id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error updating data');
        }
        else {
            // console.log(result);
            // res.status(200).send(result.rows)
            res.status(200).json({ message: 'Data updated successfully' });
        }
    })

})

app.delete('/deleteData/:id', (req, res) => {
    const { id } = req.params;
    const delete_query = `DELETE FROM demotable WHERE id = $1`

    client.query(delete_query, [id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error deleting data');
        }
        else {
            // console.log(result);
            // res.status(200).send(result.rows)
            res.status(200).json({ message: 'Data deleted successfully' });
        }
    })

})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
