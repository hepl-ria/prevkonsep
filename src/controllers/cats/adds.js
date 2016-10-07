/* quentin/prevkonsep
 *
 * /src/controllers/cats/add.js - API Controller for cats adding
 *
 * coded by quentin
 * started at 07/10/2016
 */

import { db } from "../../core/mongodb";

const GENDERS = [ "male", "female" ];

export default function( oRequest, oResponse ) {
    const POST = oRequest.body;

    let sName = ( POST.name || "" ).trim(),
        iAge = +POST.age,  // + fait le meme chose que parseInt ,10
        sGender = POST.gender,
        sColor = ( POST.color || "" ).trim(),
        aErrors = [],
        oCat;

    if ( !sName ) {
        aErrors.push( "name can't be empty!" );
    }

    if ( isNaN( iAge ) ) {
        aErrors.push( "age isn't a Number!" );
    }

    if ( GENDERS.indexOf( sGender ) === -1 ) {
        aErros.push( `invalid gender: must be "male" or "female"!` );
    }

    if ( !sColor ) {
        aErros.push( "color can't be empty!" );
    }

    if ( aErros.length ) {
        return oResponse.status( 400 ).json( {
            "errors": aErrors,
        } );
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
            .then( () => {
                oResponse.status( 201 ).json( oCat );
            } )
            .catch( ( oError ) => {
                oResponse.status( 500 ).json( {
                    "errors": [ oError ],
                } );
            } );
}
