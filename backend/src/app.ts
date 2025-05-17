import bodyParser from 'body-parser';
import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';
import http from 'http';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger/doc/swagger.json';
import ServerResponse from './utils/ServerResponse';
import router from './routes';
import morganLogger from './loggers/logger';
import { startParkingSlotAvailabilityJob } from './utils/parkingSlotAvailabilityJob';

config();

const app = express()
const server = http.createServer(app)
const PORT = process.env.PORT

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({ origin: "*" }))
app.use(morganLogger)
app.disable('x-powered-by');

app.use('/api/v1', router)
// @ts-ignore: Unreachable code error
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use("*", (req, res) => {
    return ServerResponse.error(res, "Route not found")
})

//run app scheduler to update parking slot availability
startParkingSlotAvailabilityJob()

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})