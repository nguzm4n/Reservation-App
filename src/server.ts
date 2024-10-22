import express, { Request, Response } from 'express';
import { env } from "process"

const app = express()

const PORT : number = Number(env.PORT) || 1234

app.get('/', (req: Request, res: Response) => {
    res.status(200).send('<h1> Hello World <h1>');
});


app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`);
})