
let fSlugify;

fSlugify = function( sStr = "" ) {
    return sStr.toLowerCase().replace( /\s/g, "-" );
};

export {
    fSlugify as slugify,
};
