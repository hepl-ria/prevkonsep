/* ria/prevkonsep
 *
 * /src/core/utils.js - sMALL & MISC UTIITIES
 *
 * Coded by - Paulineviroux
 * started at 07/10/2016
*/

let fSlugify;

fSlugify = function( sStr ) {
    return sStr.toLowerCase().replace( /\s/g, "-" );
}

export {
    fSlugify as slugify,
}