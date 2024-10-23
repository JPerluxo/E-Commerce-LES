const app = require('./app');
const db = require('./src/config/dbConfig');
const port = 3001;

db.sync().then(() => {
    app.listen(port, () => {
        console.clear();
        console.log('\x1b[32m%s\x1b[0m', 'Compiled successfully!', '\n');
        console.log(`Server is running on http://localhost:${port}`);
    });
});
