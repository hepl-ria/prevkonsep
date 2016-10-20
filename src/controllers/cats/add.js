/* Chris Jend - 30/092016 
	Server.js - prevkonsep*/

import { db } from "../../core/mongodb";
import { slugify } from "../../core/utils";

const GENDERS = [ "male", "female" ];

export default function( oRequest, oResponse) {
	const POST = oRequest.body;

	let sName = ( POST.name || "").trim(),
		iAge = +POST.age, // vaut un parseInt(),10
		sGender = POST.gender,
		sColor = ( POST.color || "").trim(),
		aErrors = [],
		sSlug,
		oCat;

	if ( !sName ) {
		aErrors.push("name can't be empty");
	}
	if ( isNan( iAge ) ){
		aErrors.push("age isn't not un number");
	}
	if ( GENDERS.indexOf( sGender ) === -1) { //Verifie si le genre est dans le tableau, indexOf retourne la position de l'elt dans le tab, si pas d'elt il retournerea -1
		aErrors.push(`invalid gender = must be "male" or "female!"`);
	}
	if ( !sColor ) {
		aErrors.push("color can't be empty !");
	}
	if ( aErrors.length ) {
		return oResponse.status( 400 ).json( {
			"errors": aErrors,
		})
	}
	sSlug = slugify( sName );
	
    db.collection( "cats" )
        .findOne( {
            "slug": sSlug,
        } )
        .then( ( oCatFromDB ) => {
            if ( oCatFromDB ) {
                return oResponse.status( 409 ).json( {
                    "errors": [ `A cat with the name "${ sName }" already exists!` ],
                } );
            }

            oCat = {
                "slug": sSlug,
                "name": sName,
                "age": Math.abs( iAge ),
                "gender": sGender,
                "color": sColor,
                "create": new Date(),
                "update": new Date(),
            };

            db.collection( "cats" )
                .insertOne( oCat )
                    .then( () => {
                        oResponse.status( 201 ).json( oCat );
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