/* ria/prevkonsep
 *
 * /src/core/mongodb.js - MongoDB connector
 *
 * Coded by Mucht - Mathieu Claessens
 * started at 07/10/2016
*/

import { MongoClient } from "mongodb";
import Promise from "bluebird";
// l'idée des promise => tant que x est pas fini on passe pas à la suite.
import zouti from "zouti";

const MONGO_URL = "mongodb://127.0.0.1:27017/cats";

let oDB;

// Fonction qui va nous connecter à la DB
export default function() {
    return new Promise( ( fResolve, fReject ) => {
        MongoClient.connect( MONGO_URL, ( oError, oDBLink ) => {
            if ( oError ) {
                return fReject( oError );
            }
            zouti.log( "connected to bd.", "Mucht/prevkonsep" );
            fResolve( oDB = oDBLink );
        } );
    } );
}

export {
    oDB as db,
};
