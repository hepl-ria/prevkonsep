
    module.export = function( oRequest, oResponse, fNext ) {
        console.log( `${ oRequest.method } ${ oRequest.url }` ); // eslint-disable-line no-console
        fNext();
    };
