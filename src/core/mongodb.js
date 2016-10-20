/* prevkonsep
 *
 * /src/core/mongodb.js - MongoDB Connector
 *
 * coded by Anne
 * started at 7/10/2016
 */

// syntaxe pour récup un seul élément d'un import
import { MongoClient } from "mongodb";
import Promise from "bluebird";
import zouti from "zouti";

// promise: nouveau type de donnée censé être natif dans ES2015, mais en attendant que tout soit bien implémenté on utilise les primise de bluebird
const MONGO_URL = "mongodb://127.0.0.1:27017/animals";

let oDB;

// fonction qu'on appelle pour se connecter à la db
export default function() {
    return new Promise( ( fResolve, fReject ) => {
        MongoClient.connect( MONGO_URL, ( oError, oDBLink ) => {
            if ( oError ) {
                return fReject( oError );
            }

            zouti.log( "connected to db", "anne/prevkonsep" );
            fResolve( oDB = oDBLink );
        } );
    } );
}

export {
    oDB as db,
};