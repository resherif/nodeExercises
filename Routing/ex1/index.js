const express = require('express');
const app = express(); 
app.use(express.json());
const jobRoute = require('./routes/jobRoutes');
app.use('/jobs', jobRoute);
app.listen(3000, () => { 
    console.log('servwr Running on port 3000');

})