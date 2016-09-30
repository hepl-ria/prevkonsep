/* prevkonsep
 *
 * /src/core/middlewares/log.js - simple log middleware for express
 *
 * coded by Anne
 * started at 30/09/2016
 */

 export default function( { method, url }, oResponse ) {
    console.log( `${ method } ${ url }` ); // eslint-disable-line no-console
    fNext;
 }
