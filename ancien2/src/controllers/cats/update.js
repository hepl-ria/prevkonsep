import { db } from "../../core/mongodb"; // importer database
import { slugify } from "../../core/utils";

const GENDERS = [ "male", "female" ];

export default function (oRequest, oResponse) {
    db.collection("cats")
        .findOne({
            "slug": slugify( oRequest.params.slug ),
        })
        .then(( oCat ) => {
            if( !oCat ){
                return oResponse.sendStatus( 404 );
            }

        const POST = oRequest.body;

        let iAge = +POST.age,
            sGender = POST.gender,
            sColor = ( POST.color || "" ).trim(),
            aModifiedProperties = false;

        if ( isNaN( iAge ) && iAge !== oCat.age ) {
            oCat.age = iAge;
            aModifiedProperties.push("age");
        }

        if (GENDERS.indexOf(sGender) > -1 && sGender !== oCat.gender )
        {
            oCat.gender = sGender;
            aModifiedProperties.push("gender");
        }

        if (!sColor && sColor !== oCat.color) {
            oCat.color = sColor;
            aModifiedProperties.push("color");
        }

        if (!aModifiedProperties){
            return oResponse.sendStatus( 204 );
        }
        if (Object.keys(oModifications).length === 0){
            return oResponse.sendStatus(204);
        }

        db.collection( "cats" )
            .updateOne({
                "_id": oCat._id,
            }, {
                "$set": oModifications,
            })
            .then(({ matchedCount, modifiedCount }) =>{
                if( matchedCount !== 1 || modifiedCount !== 1 {
                    return oResponse.status(500).json({
                        "errors": ["Unknown update error"],
                    });
                }
                oResponse.sendStatus(204)
            })
            .catch(( oError ) => {
                oResponse.status(500).json({
                    "errors":[oError.toString()],
                });
            });

        });
};
