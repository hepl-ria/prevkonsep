/* Chris Jend - 30/092016 
	Server.js - prevkonsep*/
import zouti from "zouti";

export default function( { method, url }, oResponse, fNext ) {
	zouti.log( `${ method } ${ url }`, "leny/prevkonsep" ); //eslint-disable-line no-console
	fNext();
}
