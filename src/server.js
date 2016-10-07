/* prevkonsep
 *
 * /src/server.js - Main entry point
 *
 * coded by Anne
 * started at 30/09/2016
 */

// on a externalisé la config et on l'appelle
import initServer from "./core/express";
// on se connecte à la db et si ça a fonctionné on allume le serveur
import initDB from "./core/mongodb";

console.log();
console.log( "Starting…" );

initDB()
    .then( () => {
        initServer( 12345 );
    } )
    .catch( ( oError ) => {
        console.error( oError );
    } );

/* Avec les promise, l'idée c'est de dire que tant qu'un bout de code n'est pas fini on passe à la suite */