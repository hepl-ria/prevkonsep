/* Chris Jend - 30/092016 
	Server.js - prevkonsep*/

import { db } from "../../core/mongodb";
const GENDER = [ "male", "female" ];

export default function( oResquest, oResponse) {
	const POST = oResquest.body;

	let sName = ( POST.name || "").trim(),
		iAge = +POST.age, // vaut un parseInt(),10
		sGender = POST.gender,
		sColor = ( POST.color || "").trim(),
		aErrors = [],
		oCat;

	if ( !sName ) {
		aErrors.push("name can't be empty");
	}
	if ( isNan( iAge ) ){
		aErrors.push("age isn't not un number");
	}
	if ( GENDERS.indexOf( sGender ) ) { //Verifie si le genre est dans le tableau, indexOf retourne la position de l'elt dans le tab, si pas d'elt il retournerea -1
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
	oCat = {
		"name": sName,
		"age": Math.abs( iAge ),
		"gender": sGendre,
		"color": sColor,
		"create": new Date(),
		"update": new Date(),
	};
	db.collection( "cats" )
		.insertOne( oCat )
			.then( ()=>{
				oResponse.status( 201 ).json( oCat );
			})
			.catch( (oError ) => {
				oResponse.status( 500 ).json( {
					"errors": [ oError ],
				})
			})
}