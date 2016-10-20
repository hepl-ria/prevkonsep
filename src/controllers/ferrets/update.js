/* Chris Jend - 30/09/2016 
	Server.js - prevkonsep*/

import { db } from "../../core/mongodb";
import { slugify } from "../../core/utils";

const GENDERS = [ "male", "female" ];

export default function( oRequest, oResponse) {
	db.collection( "ferrets" )
		.findOne( {
			"slug": slugify( oRequest.params.slug ),
		})
		.then( ( oFerret ) =>{
			if ( oFerret ) {
				return oResponse.sendStatus( 404 );
			}

			const POST = oRequest.body;

			let iAge = +POST.age,
				sGender = POST.gender,
				sColor = ( POST.color || "" ).trim(),
				oModification = {};

				if ( !isNan( iAge ) && iAge !== oFerret.age) {
					oModification.age = iAge;
				}

	            if ( GENDERS.indexOf( sGender ) > -1 && sGender !== oFerret.gender ) {
	                oModifications.gender = sGender;
	            }

	            if ( sColor !== "" && sColor !== oFerret.color ) {
	                oModifications.color = sColor;
	            }

	            if ( Object.keys( oModifications ).length === 0 ) {
	                return oResponse.sendStatus( 204 );
	            }

	            oModifications.update = new Date();

	            db.collection( "ferrets" )
	            	.updateOne( {
	            		"_id": oFerret._id,
	            	}, {
	            		"$set": oModifications,
	            	})
	            	.then( ( { matchedCount, modifiedCount } ) =>{
	            		if ( matchedCount !== 1 || modifiedCount !== 1) {
	            			return oResponse.status( 500 ).json( {
	            				"errors": ["Unknown update error, try later" ],
	            			});
	            		}
	            		oResponse.sendStatus( 204 );
	            	})
	            	.catch( ( oError ) => {
	            		oResponse.status( 500 ).json( {
	            			"errors": [ oError.toString() ],
	            		});
	            	});
			})
			.catch( ( oError ) => {
				oResponse.status( 500 ).json( {
					"errors": [ oError.toString() ],
				});
			});
}