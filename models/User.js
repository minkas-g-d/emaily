const mongoose = require( 'mongoose' );
const { Schema } = mongoose;

// create schema for collection user
const userSchema = new Schema({
	googleId: String
});

// mongoose will not overrite existing collections
// it will create the collection if it does not exist
mongoose.model( 'users', userSchema );