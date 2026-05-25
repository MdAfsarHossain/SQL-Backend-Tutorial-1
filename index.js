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


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
