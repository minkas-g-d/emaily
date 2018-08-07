const express = require( 'express' );
const mongoose = require( 'mongoose' );
const cookieSession = require( 'cookie-session' );
const passport = require( 'passport' );

const authRoutes = require( './routes/authRoutes' );
const keys = require( './config/keys' );

require( './models/User' );
require( './services/passport' );

mongoose.connect( keys.mongoURI );

// generate new application
const app = express();


// middlewares are function that can modify the incoming requests to our app
// before they are sent to the route handlers
app.use(
	cookieSession( {
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [ keys.cookieKey ] // used for encryption
	} )
);

app.use( passport.initialize() );
//  passport.session() - is a middleware that alters the request object 
// and change the 'user' value that is currently the session id (from the client cookie)
// into the true deserialized user objec
app.use( passport.session() );

require( './routes/authRoutes' )( app );

const PORT = process.env.PORT || 5000;
app.listen( PORT );