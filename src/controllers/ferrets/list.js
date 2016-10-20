/* Chris Jend - 30/09/2016 
	Server.js - prevkonsep*/


import { db } from "../../core/mongodb";

export default function( oResquest, oResponse) {
	db.collection( "ferrets" )
		.find({})
		.toArray()
			.then( ( aFerrets = [] ) => {
				oResponse.json( aFerrets );
			})
			.catch( ( oError ) => {
				oResponse.status( 500 ).json( {
					"errors": [ oError.toString() ],
				});
			});
}