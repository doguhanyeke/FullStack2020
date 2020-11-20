import express from 'express';
import cors from 'cors';
import diagnoseRouter from './routers/diagnoses';
import patientRouter from './routers/patientRouter';

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/diagnoses", diagnoseRouter);
app.use("/api/patients", patientRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log("Listening port: ", PORT);
});
