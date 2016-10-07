/* /src/core/mongodb.js - MongoDB connector */

import { MongoClient } from "mongodb";
import Promise from "bluebird";

const MONGO_URL = "mongodb://127.0.0.1:27017/cats"; // Se connecter à la DB et la créer

let oDB;

export default function(){
    return new Promise( ( fResolve, fReject ) => {
        MongoClient.connect( MONGO_URL, (oError, oDBLink ) => {
            if (oError) {
                return fReject( oError );
            }
            fResolve ( oDB = oDBLink )
        })
    })
}

export {
    oDB as db,
};