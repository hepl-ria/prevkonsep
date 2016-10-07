/*
*
* /src/controllers/add.js - API controller to add cats
*
*/
import { db } from "../../core/mongodb";

const GENDERS = [ "male", "female" ];

export default function( oRequest, oResponse ) {
    const POST = oRequest.body;

    let sName = ( POST.name || "" ).trim(),
        iAge = +POST.age,
        sGender = POST.gender,
        sColor = ( POST.color || "" ).trim(),
        aErrors = [],
        oCat;

    if ( !sName ) {
        aErrors.push( "name can't be empty" );
    }

    if ( isNaN( iAge ) ) {
        aErrors.push( "age isn't a number!" );
    }

    if ( GENDERS.indexOf( sGender ) === -1 ) { //le genre qu'on nous a donné, est ce qu'il est present de le tableau de mes genres 
        aErrors.push( `invalid gender: must be "male" or "female"!` );
    }

    if ( !sColor ) {
        aErrors.push( "color can't be empty" );
    }

    if ( aErrors.length ) {
        return oResponse.status( 400 ).json( {
            "errors": aErrors,
        } )
    }

    oCat = {
        "name": sName,
        "age": Math.abs( iAge ),
        "gender": sGender,
        "color": sColor,
        "create": new Date(),
        "update": new Date(),
    };

    db.collection( "cats" )
        .insertOne( oCat )
            .then( () => { //appelée si l'objet a été créé donc on l'appelle!
                oResponse.status( 201 ).json( oCat );
            } )
            .catch( ( oError ) => {
                oResponse.status( 500 ).json( {
                    "errors": [ oError ],
                } )
            });

}