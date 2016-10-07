/* leny/prevkonsep
 *
 * /src/core/middlewares/log.js - Simple log middleware for express
 *
 * coded by leny@flatLand!
 * started at 30/09/2016
 */

import zouti from "zouti";

export default function( { method, url }, oResponse, fNext ) {
    zouti.log( `${ method } ${ url }` ); // eslint-disable-line no-console
    fNext();
}
