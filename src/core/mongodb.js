/* leny/prevkonsep
 *
 * /src/core/mongodb.js - MongoDB Connector
 *
 * coded by leny@flatLand!
 * started at 07/10/2016
 */

import { MongoClient } from "mongodb";
import Promise from "bluebird";
import zouti from "zouti";

const MONGO_URL = "mongodb://127.0.0.1:27017/cats";

let oDB;

export default function() {
    return new Promise( ( fResolve, fReject ) => {
        MongoClient.connect( MONGO_URL, ( oError, oDBLink ) => {
            if ( oError ) {
                return fReject( oError );
            }

            zouti.log( "Connected to db.", "leny/prevkonsep" );
            fResolve( oDB = oDBLink );
        } );
    } );
}

export {
    oDB as db,
};
