import { db } from "../../core/mongodb";
import { slugify } from "../../core/utils";

const GENDERS = [ "male", "female" ];

export default function( oRequest, oResponse ) {
    db.collection( "parrots" )
        .findOne( {
            "slug": slugify( oRequest.params.slug ),
        } )
        .then( ( oParrots ) => {
            if ( !oParrots ) {
                return oResponse.sendStatus( 404 );
            }

            const POST = oRequest.body;

            let iAge = +POST.age,
                sGender = POST.gender,
                sColor = ( POST.color || "" ).trim(),
                oModifications = {};

            if ( !isNaN( iAge ) && iAge !== oParrots.age ) {
                oModifications.age = iAge;
            }

            if ( GENDERS.indexOf( sGender ) > -1 && sGender !== oParrots.gender ) {
                oModifications.gender = sGender;
            }

            if ( sColor !== "" && sColor !== oParrots.color ) {
                oModifications.color = sColor;
            }

            if ( Object.keys( oModifications ).length === 0 ) {
                return oResponse.sendStatus( 204 );
            }

            oModifications.update = new Date();

            db.collection( "parrots" )
                .updateOne( {
                    "_id": oParrot._id,
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
