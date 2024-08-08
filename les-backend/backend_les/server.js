const app = require('./app');
const db = require('./src/config/dbConfig');
const port = 3001;

db.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
});
