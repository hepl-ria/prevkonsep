/*
*
* /src/core/middlewares/log.js - Main entry point
*
*/

export default function( { method, url }, oResponse, fNext ){
    console.log( `${ method } ${ url }` ); // eslint-disable-line no-console
    fNext();
}