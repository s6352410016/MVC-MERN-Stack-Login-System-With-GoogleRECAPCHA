const mongoose = require('mongoose');
require('dotenv').config();
const dbUrl = process.env.DATABASE;

await mongoose.connect(dbUrl , {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connecting to database...');
}).catch((err) => {
    console.log(err);
});

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
} , {
    timestamps: true
});

module.exports = mongoose.model('users' , userSchema);