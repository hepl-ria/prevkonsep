/* ria/prevkonsep
 *
 * /src/core/utils.js - Small & misc utilities
 *
 * Coded by Mucht - Mathieu Claessens
 * started at 14_10_2016
*/

let fSlugify;

fSlugify = function( sStr ) {
    return sStr.toLowerCase().replace( /\s/g, "-" );
};

export {
    fSlugify as slugify,
};
