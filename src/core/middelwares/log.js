/* Chris Jend - 30/092016 
	Server.js - prevkonsep*/

export default function( { method, url }, oResponse, fNext ) {
	console.log( `${ method } ${ url }` ); //eslint-disable-line no-console
	fNext();
}
