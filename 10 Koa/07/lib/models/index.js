import mongoose from 'mongoose'
import { mongodb } from 'config-lite'

mongoose.connect(mongodb.url, (err) => {
    if (err) {
        console.error('connect to %s error:', mongodb.ur, err.message);
        process.exit(1);
    }
})

exports.User = require('./user');
exports.Topic = require('./topic');
exports.Comment = require('./comment');