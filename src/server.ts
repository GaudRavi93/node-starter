import 'dotenv/config';
import { App } from './app';
import mongoose from 'mongoose';

const app = new App();

const DB = process.env.DATABASE.replace(
    '<password>',
    process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => {
    console.log("Database connected ...");
}).catch(() => {
    console.log("Unable to connect database ...");
});