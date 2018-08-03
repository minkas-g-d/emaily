const express = require( 'express' );

// generate new application
const app = express();


// creating route handler handling the request method get
app.get( '/', ( req, res ) => {
	res.send( { hi: 'there' } )
} );

const PORT = process.env.PORT || 5000;
app.listen( PORT );