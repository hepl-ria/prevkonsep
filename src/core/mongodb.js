import { MongoClient } from "mongodb";
import Promise from "bluebird";
import zouti from "zouti";

const MONGO_URL = "mongodb://127.0.0.1:27017/parrots";

let oDB;

export default function() {
    return new Promise( ( fResolve, fReject ) => {
        MongoClient.connect( MONGO_URL, ( oError, oDBLink ) => {
            if ( oError ) {
                return fReject( oError );
            }

            zouti.log( "Connected to db.", "jimmy/prevkonsep" );
            fResolve( oDB = oDBLink );
        } );
    } );
}

export {
    oDB as db,
};
