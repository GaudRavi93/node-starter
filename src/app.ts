import 'dotenv/config';
import { Routes } from './routes/index.routes';
import express, {Express, Request, Response} from 'express';

export class App {
    express: Express  = express();
    routes: Routes = new Routes();
    constructor() {
        this.express.use(express.json());
        this.express.use("/api/v1", this.routes.router)

        this.express.listen(process.env.PORT, () => {
            console.log(`Server is running on http://localhost:${process.env.PORT}`);
        });
        
        // Route to check if server is working or not
        this.express.get('/', (req: Request, res: Response) => {
            res.send('Server Works! 🚀🚀 ');
        });
    }
}