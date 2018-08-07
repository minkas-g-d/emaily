const passport = require( 'passport' );
const GoogleStrategy = require( 'passport-google-oauth20' ).Strategy;
const mongoose = require( 'mongoose' );
const keys = require( '../config/keys' );

const User = mongoose.model( 'users' );

passport.serializeUser( ( user, done ) => {
	// user.id is the internal id of the model instance added when
	// creating the record
	done( null, user.id );
} );

passport.deserializeUser( ( id, done ) => {
	User.findById( id ).then( user => {
		done( null, user );
	} );
} )

// client id
// client secret
passport.use( new GoogleStrategy( {
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback'
		},
		( accessToken, refreshToken, profile, done ) => {
			User.findOne( { googleId: profile.id } ).then( ( existingUser ) => {
				if ( existingUser ) {
					// we already have a record with the given profile ID
					done( null, existingUser )
				}
				else {
					// we don't have a user record with this ID, make a new record
					// create model instance and save it to the mongo db
					new User( { googleId: profile.id } )
						.save()
						.then( user => done( null, user ) );
				}
			} )
		} 
	) 
);

