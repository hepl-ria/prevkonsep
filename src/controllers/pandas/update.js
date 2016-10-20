/* prevkonsep
 *
 * /src/controllers/pandas/update.js - Controllers to update pandas
 *
 * coded by Anne
 * started at 18/10/2016
 */

import { db } from "../../core/mongodb";
import { slugify } from "../../core/utils";

const GENDERS = [ "male", "female" ];

export default function( oRequest, oResponse ) {
	db.collection( "cats" )
		.findOne( {
			"slug": slugify( oRequest.params.slug ),
		} )
		.then( ( oPanda ) => {
			if ( !oPanda ) {
				return oResponse.sendStatus( 404 );
			}

			const POST = oRequest.body

			let iAge = +POST.age,
				sGender = POST.gender,
				sBabies = ( POST.babies || "No babies yet" ).trim(),
				oModifications = {};

			if ( !isNaN( iAge ) && iAge !== oPanda.age ) {
				oModifications.age = iAge;
			}

			if ( GENDERS.indexOf( sGender ) > -1 && sGender !== oPanda.gender ) {
				oModifications.gender = sGender;
			}

			if( sBabies !== "" && sBabies !== oPanda.babies ) {
				oModifications.babies = sBabies;
			}

			if( sHome !== "" && sHome !== oPanda.home ) {
				oModifications.home = sHome;
			}

			if ( Object.keys( oModifications ).length === 0 ) {
				return oResponse.sendStatus( 204 );
			}

			oModifications.update = new Date();

			db.collection( "pandas" )
				.updateOne( {
					"_id": oPanda._id,
				}, {
					"$set": oModifications,
				} )
				.then( ( { matchedCount, modifiedCount } ) => {
					if( matchedCount !==1 || modifiedCount !== 1 ) {
						return oResponse.status( 500 ).json( {
							"errors" : [ "Unknow update error" ],
						} );
					}

					oResponse.sendStatus( 204 );
				} )
				.catch( ( oError ) => {
					oResponse.status( 500 ).json( {
						"errors": [ oError.toString() ],
					} );
				} );
			} )
			.catch( ( oError ) => {
				oResponse.status( 500 ).json( {
					"errors": [ oError.toString() ],
				} );
			} );
}