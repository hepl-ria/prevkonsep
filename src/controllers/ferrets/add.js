/* Chris Jend - 30/09/2016 
	Server.js - prevkonsep*/

import { db } from "../../core/mongodb";
import { slugify } from "../../core/utils";

const GENDERS = [ "male, female" ];

export default function( oRequest, oResponse) {
	const POST = oRequest.body;

	let sName = ( POST.name || "" ).trim(),
		iAge = +POST.age,
		sGender = POST.gender,
		sColor = ( POST.color || "").trim(),
		aErrors = [],
		aSlug,
		oFerret;

	if ( !sName ) {
		aErrors.push("name can't be empty");
	}
	if ( isNan( iAge ) ){
		aErrors.push("age must be a number");
	}
	if( GENDERS.indexOf( sGender ) === -1) {
		aErrors.push('invalid gender, must be male or female');
	}
	if ( !sColor ) {
		aErrors.push("color can't be empty!");
	}
	if ( aErrors.length ) {
		return oResponse.status( 400 ).json( {
			"errors": aErrors,
		})
	}
	sSlug = slugify( sName );

	db.collection( "ferrets" )
		.findOne( {
			"slug": sSlug,
		} )
		.then( (oFerretFromDB) => {
			if ( oFerretFromDB ) {
				return oResponse.status( 409 ).json( {
					"errors": [`A ferret with the same name "${ sName }" already exist`]
				}); 
			}

			oFerret = {
				"slug": sSlug,
				"name": sName,
				"age": Math.abs( iAge ),
				"gender": sGender,
				"color": sColor,
				"create": new Date(),
				"update": new Date(),
			};

			db.collection( "ferrets" )
				.insertOne( oFerret )
					.then( () => {
						oResponse.status( 201 ).json( oFerret );
					} ) 
					.catch( ( oError ) => {
						oResponse.status( 500 ).json( {
							"errors": [ oError.toString() ],
						} );
					});

		})
		.catch( ( oError ) => {
			oResponse.status( 500 ).json( {
				"errors": [ oError.toString() ],
			});
		});
}
