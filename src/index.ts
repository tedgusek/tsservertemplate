// const express = require('express');
import express, { Request, Response, NextFunction } from 'express';
// require('dotenv').config();
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const ALLOWEDORIGINS: string[] = (process.env.ALLOWEDORIGINS || '').split(',');

app.use((req: Request, res: Response, next: NextFunction) => {
    const origin = req.get('Origin');

    if (origin !== undefined && ALLOWEDORIGINS.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    next();
});

app.get('/hello', (req: Request, res: Response) => {
    res.send({ res: 'hello there' });
});

app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));