"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ratingsDb = exports.moviesDb = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
const path_1 = __importDefault(require("path"));
sqlite3_1.default.verbose();
const moviesDbPath = path_1.default.join(__dirname, '../../../db/movies.db');
const ratingsDbPath = path_1.default.join(__dirname, '../../../db/ratings.db');
exports.moviesDb = new sqlite3_1.default.Database(moviesDbPath);
exports.ratingsDb = new sqlite3_1.default.Database(ratingsDbPath);
