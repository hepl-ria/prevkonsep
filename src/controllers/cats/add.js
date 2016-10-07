/* prevkonsep
 *
 * /src/routes/add.js - API controller for cats adding
 *
 * coded by Anne
 * started at 7/10/2016
 */

const GENDERS = [ "male", "female" ];

export default function( oRequest, oResponse ) {
    const POST = oRequest.body;

    let sName = ( POST.name || "" ).trim(),
        iAge = +POST.age, // on transforme en integer, ça remplace parseInt, 10
        sGender = POST.gender,
        sColor = ( POST.color || "" ).trim(),
        aErrors = [],
        oCat;

    if ( !sName ) {
        aErrors.push( "name can't be empty!" );
    }

    if ( isNaN( iAge ) ) {
        aErrors.push( "age isn't a Number" );
    }

    if ( GENDERS.indexOf( sGender ) === -1 ) {
        aErrors.push( `invalid gender: must be "male" or "female!` );
    }

    if ( !sColor ) {
        aErrors.push( "color can't be empty!" );
    }

    if ( aErrors.length ) {
        return oResponse.status( 400 ).json( {
            "errors": aErrors,
        } );
    }

    oResponse.send( "all is ok" );
}