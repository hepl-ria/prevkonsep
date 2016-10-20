import zouti from "zouti";

export default function( { method, url }, oResponse, fNext ) {
    zouti.log( `${ method } ${ url }`, "jimmy/prevkonsep" );
    fNext();
}
