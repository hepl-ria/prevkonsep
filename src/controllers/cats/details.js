import { db } from "../../core/mongodb"; // importer database
import { slugify } from "../../core/utils";

export default function (oRequest, oResponse) {
    db.collection("cats")
        .findOne({
            "slug": slugify(oRequest.params.slug),
        })
        .then( ( oCat ) => {
            if (oCat){
                return oResponse.json( oCat );
            }
            oResponse.sendStatus( 404 );
        })
        .catch(( oError ) => {
            oResponse.status(500).json({
                "errors":[oError],
            })
        })
}
