import sqlite3 from 'sqlite3';
import path from 'path';

sqlite3.verbose();

const moviesDbPath = path.join(__dirname, '../../../db/movies.db');
const ratingsDbPath = path.join(__dirname, '../../../db/ratings.db');

export const moviesDb = new sqlite3.Database(moviesDbPath);
export const ratingsDb = new sqlite3.Database(ratingsDbPath);
