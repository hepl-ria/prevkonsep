import { db } from "../../core/mongodb"; // importer database
import { slugify } from "../../core/utils";

const GENDERS = ["male", "female"];

export default function ( oRequest, oResponse ) {
    const POST = oRequest.body;

    let sName = ( POST.name || "" ).trim(),
        iAge = parseInt( POST.age ),
        sGender = POST.gender,
        sColor = (POST.color || "" ).trim(),
        aErrors = [],
        sSlug,
        oCat;

    if ( !sName ) {
        aErrors.push("name can't be empty!");
    }

    if ( isNaN(iAge)) {
        aErrors.push( "age isn't a Number!");
    }

    if( GENDERS.indexOf(sGender) === -1 ) { // Est-ce que le genre donné est présent dans le tableau gender
        aErrors.push(`invalid gender: must be "male" or "female!"`);
    }

    if( !sColor){
        aErrors.push("color can't be empty!");
    }

    if ( aErrors.length ){
        return oResponse.status( 400 ).json({
            "errors": aErrors,
        });
    }

    sSlug = slugify( sName );

    // Remplacer toutes les majuscules dans l'url par des minuscules et des tirets pas les espaces
    sSlug = sName.toLowerCase().replace(/\s/g, "-");

    /*oResponse.send( "all is ok");*/

    db.collection( "cats" )
        .findOne({
            "slug": sSlug,
        })
        .then( (oCatFromDB ) => {
            if (oCatFromDB){
                return oResponse.status().json({
                    "errors": [`A cat with the name "${ sName} already exists!`]
                });
            }

            oCat = {
                "slug": sSlug,
                "name": sName,
                "age": Math.abs(iAge), // si quelqu'un donne -24 ça donnera 24
                "gender": sGender,
                "color": sColor,
                "create": new Date(),
                "update": new Date(),
            };

            db.collection( "cats" )
                .insertOne( oCat )
                .then(() => {
                    oResponse.status(201).json(oCat);
                })
                .catch(( oError ) => {
                    oResponse.status(500).json({
                        "errors":[oError],
                    })
                })
        })

        .catch(( oError ) => {
            oResponse.status(500).json({
                "errors":[oError],
            })
        })
}
