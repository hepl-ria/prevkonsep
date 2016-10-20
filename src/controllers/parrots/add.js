import { db } from "../../core/mongodb";
import { slugify } from "../../core/utils";

const GENDERS = [ "male", "female" ];

export default function( oRequest, oResponse ) {
    const POST = oRequest.body;

    let sName = ( POST.name || "" ).trim(),
        iAge = +POST.age,
        sGender = POST.gender,
        sColor = ( POST.color || "" ).trim(),
        aErrors = [],
        sSlug,
        oParrot;

    if ( !sName ) {
        aErrors.push( "name can't be empty!" );
    }

    if ( isNaN( iAge ) ) {
        aErrors.push( "age isn't a Number!" );
    }

    if ( GENDERS.indexOf( sGender ) === -1 ) {
        aErrors.push( `invalid gender: must be "male" or "female"!` );
    }

    if ( !sColor ) {
        aErrors.push( "color can't be empty!" );
    }

    if ( aErrors.length ) {
        return oResponse.status( 400 ).json( {
            "errors": aErrors,
        } );
    }

    sSlug = slugify( sName );

    db.collection( "parrots" )
        .findOne( {
            "slug": sSlug,
        } )
        .then( ( oParrotFromDB ) => {
            if ( oParrotFromDB ) {
                return oResponse.status( 409 ).json( {
                    "errors": [ `A parrot with the name "${ sName }" already exists!` ],
                } );
            }

            oParrot = {
                "slug": sSlug,
                "name": sName,
                "age": Math.abs( iAge ),
                "gender": sGender,
                "color": sColor,
                "create": new Date(),
                "update": new Date(),
            };

            db.collection( "parrots" )
                .insertOne( oParrot )
                .then( () => {
                    oResponse.status( 201 ).json( oParrot );
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
