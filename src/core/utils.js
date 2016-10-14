let fSlugify;

fSlugify = function ( sStr = "" ) {
    return sStr.toLowerCase().replace(/\s/g, "-");
};

// rendre public la fonction
export {
    fSlugify as slugify,
};
