import { express } from 'express';
import { connect } from './connection.js';

const con = await connect();
const db = con.collection('login');
const jwtRouter = express.Router();

jwtRouter.get();

export { jwtRouter };