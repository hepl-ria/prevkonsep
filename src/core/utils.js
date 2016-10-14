/* prevkonsep
 *
 * /src/core/utils.js - Small & misc utilities
 *
 * coded by Anne
 * started at 14/10/2016
 */

 let fSlugify;

 fSlugify = function( sStr ) {
 	return sStr.toLowerCase().replace( /\s/g, "-" );
 };

 export {
 	fSlugify as slugify,
 };