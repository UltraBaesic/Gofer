const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const dbConnection = require('./database/connection');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

dotenv.config();

const app = express();

//cors
app.use(cors());

//db connectivity
dbConnection();

//request payload middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Creating User API
app.use('/user', require('./routes/userRoutes'));

//API Documentation
if (process.env.NODE_ENV != 'production'){
    app.use('/goferApi-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
}

app.get('/', (req, res, next) => {
    res.send('Hello from Node server');
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

//error handling middleware
app.use((err,req,res,next) =>{
    console.log(err.stack);
    res.status(500).send({
        status: 500,
        message: err.message,
        body: {}
    });
});