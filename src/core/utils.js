/* Chris Jend - 30/092016 
	Server.js - prevkonsep  */

let fSlugify;

fSlugify = function( sStr = "" ) {
	return sStr.toLowerCase().replace( /\s/g, "-" );
};

export {
	fSlugify as slugify,
};