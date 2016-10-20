/* quentin/prevkonsep
 *
 * /src/controllers/alpagas/update.js - Controllers to update alpagas
 *
 * coded by quentin
 * started at 20/10/2016
 */

import { db } from "../../core/mongodb";
import { slugify } from "../../core/utils";

const COATS = [ "suris", "huacayas" ];

export default function( oRequest, oResponse ) {
    db.collection( "alpagas" )
        .findOne( {
            "slug": slugify( oRequest.params.slug ),
        } )
        .then( ( oAlpaga ) => {
            if ( !oAlpaga ) {
                return oResponse.sendStatus( 404 );
            }

            const POST = oRequest.body;

            let iAnimalHeight = +POST.aheight,
                sCoat = POST.coat,
                sSpecies = ( POST.species || "" ).trim(),
                oModifications = {};

            if ( !isNaN( iAnimalHeight ) && iAnimalHeight !== oAlpaga.aheight ) {
                oModifications.aheight = iAnimalHeight;
            }

            if ( COATS.indexOf( sCoat ) > -1 && sCoat !== oAlpaga.coat ) {
                oModifications.coat = sCoat;
            }

            if ( sSpecies !== "" && sSpecies !== oAlpaga.species ) {
                oModifications.species = sSpecies;
            }

            if ( Object.keys( oModifications ).length === 0 ) {
                return oResponse.sendStatus( 204 );
            }

            oModifications.update = new Date();

            db.collection( "alpagas" )
                .updateOne( {
                    "_id": oAlpaga._id,
                }, {
                    "$set": oModifications,
                } )
                .then( ( { matchedCount, modifiedCount } ) => {
                    if ( matchedCount !== 1 || modifiedCount !== 1 ) {
                        return oResponse.status( 500 ).json( {
                            "errors": [ "Unknown update error" ],
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
