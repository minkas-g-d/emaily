const express = require( 'express' );
const passport = require( 'passport' );
const GoogleStrategy = require( 'passport-google-oauth20' ).Strategy;
const keys = require( './config/keys' );

// generate new application
const app = express();

// client id
// client secret
passport.use( new GoogoleStrategy( {
			clientID: keys.googleCLientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback'
		},
		accessToken => {	
			console.log( 'accessToken', accessToken );
		} 
	) 
);

app.get( 
	'/auth/google', 
	passport.authenticate( 'google', {
		scope: [ 'profile', 'email' ]
	} )
);

const PORT = process.env.PORT || 5000;
app.listen( PORT );