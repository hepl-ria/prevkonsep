/* quentin/prevkonsep
 *
 * /src/controllers/alpagas/add.js - API Controller for alpagas adding
 *
 * coded by quentin
 * started at 20/10/2016
 */

import { db } from "../../core/mongodb";
import { slugify } from "../../core/utils";

const COATS = [ "suris", "huacayas" ];

export default function( oRequest, oResponse ) {
    const POST = oRequest.body;

    let sName = ( POST.name || "" ).trim(),
        iAnimalHeight = +POST.aheight,
        sCoat = POST.coat,
        sSpecies = ( POST.species || "" ).trim(),
        aErrors = [],
        sSlug,
        oAlpaga;

    if ( !sName ) {
        aErrors.push( "name can't be empty!" );
    }

    if ( isNaN( iAnimalHeight ) ) {
        aErrors.push( "height isn't a Number!" );
    }

    if ( COATS.indexOf( sCoat ) === -1 ) {
        aErrors.push( `invalid coat: must be "suris" or "huacayas"!` );
    }

    if ( !sSpecies ) {
        aErrors.push( "species can't be empty!" );
    }

    if ( aErrors.length ) {
        return oResponse.status( 400 ).json( {
            "errors": aErrors,
        } );
    }

    sSlug = slugify( sName );

    db.collection( "alpagas" )
        .findOne( {
            "slug": sSlug,
        } )
        .then( ( oAlpagaFromDB ) => {
            if ( oAlpagaFromDB ) {
                return oResponse.status( 409 ).json( {
                    "errors": [ `A alpaga with the name "${ sName }" already exists!` ],
                } );
            }

            oAlpaga = {
                "slug": sSlug,
                "name": sName,
                "height": Math.abs( iAnimalHeight ),
                "coat": sCoat,
                "species": sSpecies,
                "create": new Date(),
                "update": new Date(),
            };

            db.collection( "alpagas" )
                .insertOne( oAlpaga )
                    .then( () => {
                        oResponse.status( 201 ).json( oAlpaga );
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
