const express = require('express');
const app = express();
app.use(express.json());
const fs = require('fs');
const taskRoutes = require('./routes/taskRoutes');

app.set('port', process.env.PORT || 4001);

app.use(express.json());

app.use(express.static('public'));

app.use(taskRoutes);

if (!fs.existsSync('task.json')) {
    fs.writeFileSync('task.json', '[]');
  }

app.listen(app.get('port'), () => {
    console.log(`Hello world, listening to port ${app.get('port')}`);
});
