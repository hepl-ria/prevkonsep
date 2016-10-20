/*
*
* /src/core/middlewares/log.js - Main entry point
*
*/

import zouti from "zouti";

export default function( { method, url }, oResponse, fNext ){
    zouti.log( `${ method } ${ url }`, "pauline/prevkonsep" ); 
    fNext();
}