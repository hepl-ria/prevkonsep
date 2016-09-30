/* quentin/prevkonsep
 *
 * /src/model/cats.js - Model for cats
 *
 * coded by quentin
 * started at 30/09/2016
 */

import fs from "fs";

const DATA_PATH = `${ __dirname }/../../data/cats.json`;

let fGetJSONFromFile,
    fGetAll,
    fGetOne,
    fSetOne,
    fRemoveOne;

fGetJSONFromFile = function( fNext ) {
    fs.readFile( DATA_PATH, "utf-8", ( oError, sContent ) => {
        let aCats;

        if ( oError ) {
            return fNext( oError );
        }

        try {
            aCats = JSON.parse( sContent );
        } catch ( oJSONError ) {
            return fNext( oJSONError );
        }

        return fNext( null, aCats );
    } );
};

fGetAll = function( fNext ) {
    fGetJSONFromFile( fNext );
};

fGetOne = function( sName, fNext ) {
    fGetJSONFromFile( ( oError, aCats ) => {
        if ( oError ) {
            return fNext( oError );
        }

        let oCat = aCats.find( ( oElt ) => sName === oElt.name );  // la fonction fait uniquement un return donc on peut l'écrire comme ceci (elle recoit oElt et return sName === oElt.name)

        return fNext( null, oCat );
    } );
};

fSetOne = function( sName, oData = {}, fNext ) {  // si oData est null ou false ici on lui donne un objet vide
    fGetJSONFromFile( ( oError, aCats ) => {
        if ( oError ) {
            return fNext( oError );
        }

        let iIndex = aCats.findIndex( ( oElt ) => sName === oElt.name );

        if ( iIndex < 0 ) {
            // cat don't exist, create it
            aCats.push( oData );
        } else {
            // cat exist, modify it
            aCats[ iIndex ] = oData;
        }

        fs.writeFile( DATA_PATH, JSON.stringify( aCats ), "utf-8", fNext );
    } );
};

fRemoveOne = function( sName, fNext ) {
    fGetJSONFromFile( ( oError, aCats ) => {
        let iIndex = aCats.findIndex( ( oElt ) => sName === oElt.name );

        if ( iIndex < 0 ) {
            return fNext( new Error( "Unknown Cat" ) );
        }

        aCats.splice( iIndex, 1 );

        fs.writeFile( DATA_PATH, JSON.stringify( aCats ), "utf-8", fNext );  // save file and callback
    } );
};

export {
    fGetAll as all,
    fGetOne as get,
    fSetOne as set,
    fRemoveOne as remove,  // es2015 element de tableau tj mettre une virgule a la fin
};
