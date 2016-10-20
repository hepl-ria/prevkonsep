/* prevkonsep
 *
 * /src/core/middlewares/log.js - simple log middleware for express
 *
 * coded by Anne
 * started at 30/09/2016
 */

 import zouti from "zouti";

 export default function( { method, url }, oResponse, fNext ) {
    zouti.log( `${ method } ${ url }`, "anne/prevkonsep" );
    fNext();
 }
