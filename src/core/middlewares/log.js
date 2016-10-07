/* ria/prevkonsep
 *
 * src/core/middlewares/log.js - Simple log middelware for express
 *
 * Coded by mucht@mathieuclaessens.be
 * started at 30/09/2016
*/

import zouti from "zouti";

export default function( { method, url }, oResponse, fNext ) {
    zouti.log( `${ method } ${ url }`, "Mucht/prevkonsep" );
    fNext();
}
