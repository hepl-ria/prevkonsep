/* quentin/prevkonsep
 *
 * /src/core/middlewares/log.js - simple log middleware for express
 *
 * coded by quentin
 * started at 30/09/2016
 */

import zouti from "zouti";

export default function ( { method, url }, oRequest, oResponse ) {
    zouti.log( `${ method } ${ url }`, "quentin/prevkonsep" );
    fNext();
};
