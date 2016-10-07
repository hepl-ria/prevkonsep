/* /src/core/middlewares - log.js
 Started at 30/09/2016 */

export default function( oRequest, oResponse, fNext ) {
    console.log( `${ oRequest.method } ${ oRequest.url }` ); //eslint-disable-line no-console
    fNext();
}