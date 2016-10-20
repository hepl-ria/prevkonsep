/* ria/prevkonsep
 * 
 * /src/controllers/fishes/add.js - API Controller for fishes adding
 *
 * Coded by - Paulineviroux
 * started at 07/10/2016
*/

import { db } from "../../core/mongodb";
import { slugify } from "../../core/utils";

const GENDERS = [ "male", "female" ];
const WATERS = [ "freshwater", "saltwater" ];

export default function( oRequest, oResponse ) {
    const POST = oRequest.body;

    let sName = ( POST.name || "" ).trim(),
        iAge = +POST.age, // = parseInt( POST.age, 10 )
        sGender = POST.gender,
        sColor = ( POST.color || "" ).trim(),
        sWater = POST.water,
        aErrors = [],
        sSlug,
        oFish;

    // Error managment
        // Name
    if ( !sName ) {
        aErrors.push( "name can't be empty!" );
    }
        // Age
    if ( isNaN( iAge ) ) {
        aErrors.push( "age isn't a number!" );
    }
        // Gender
    if ( GENDERS.indexOf( sGender ) === -1 ) {
        aErrors.push( `invalid gender: must be "male" or "female"!` );
    }
        // Color
    if ( !sColor ) {
        aErrors.push( "color can't be empty!" );
    }
        // Water
    if ( WATERS.indexOf( sWater ) === -1 ) {
        aErrors.push( `invalid water: must be "freshwater" or "saltwater"!` );
    }

    if ( aErrors.length ) {
        return oResponse.status( 400 ).json( {
            "errors": aErrors,
        } );
    }

    sSlug = slugify( sName );

    db.collection( "cats" )
        .findOne( {
            "slug": sSlug,
        } )
        .then( ( oFishFromDB ) => {
            if ( oFishFromDB ) {
                return oResponse.status( 409 ).json( {
                    "errors": [ `A fish with the name "${ sName }" already exists!` ],
                } );
            }

            oFish = {
                "slug": sSlug,
                "name": sName,
                "age": Math.abs( iAge ),
                "gender": sGender,
                "color": sColor,
                "water": sWater,
                "create": new Date(),
                "update": new Date(),
            };

            db.collection( "fishes" )
                .insertOne( oFish )
                    .then( () => {
                        oResponse.status( 201 ).json( oFish );
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