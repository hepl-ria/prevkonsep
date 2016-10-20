/* auré/prevkonsep
 *
 * /src/controllers/dogs/add.js - API Controller for dogs adding
 *
 * coded by auré
 * started at 07/10/2016
 */

import { db } from "../../core/mongodb";
import { slugify } from "../../core/utils";

const CHIP = [ "yes", "no" ];

export default function( oRequest, oResponse ) {
    const POST = oRequest.body;

    let sName = ( POST.name || "" ).trim(),
        iPawsNumber = +POST.pawsNumber,
        sChip = POST.chip,
        iAge = +POST.age,
        aErrors = [],
        sSlug,
        oDog;

    if ( !sName ) {
        aErrors.push( "name can't be empty!" );
    }

    if(isNaN(iPawsNumber)){
        aErrors.push("pawsNumber isn't a number!");
    }

    if ( CHIP.indexOf( sChip ) === -1 ) {
        aErrors.push( `invalid chip: must be "yes" or "no"!` );
    }

    // facultative
    if ( isNaN( iAge ) ) {
        return null;
    }

    if ( aErrors.length ) {
        return oResponse.status( 400 ).json( {
            "errors": aErrors,
        } );
    }

    sSlug = slugify( sName );

    db.collection( "dogs" )
        .findOne( {
            "slug": sSlug,
        } )
        .then( ( oDogFromDB ) => {
            if ( oDogFromDB ) {
                return oResponse.status( 409 ).json( {
                    "errors": [ `A dog with the name "${ sName }" already exists!` ],
                } );
            }

            oDog = {
                "slug": sSlug,
                "name": sName,
                "pawsNumber": Math.abs(iPawsNumber),
                "chip": sChip,
                "age": Math.abs( iAge ),
                "create": new Date(),
                "update": new Date(),
            };

            db.collection( "dogs" )
                .insertOne( oDog )
                    .then( () => {
                        oResponse.status( 201 ).json( oDog );
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