/* ria/prevkonsep
 *
 * model/cats.js - Model for cats
 *
 * Coded by mucht@mathieuclaessens.be
 * started at 30/09/2016
*/

// var fs = require( "fs" ); => remplacé par :
import fs from "fs";

// plus de "var" mais const ou let.
// "const" pour les constantes, toujours en majuscule. Ne change pas ! Sinon il y aura une erreur.
const DATA_PATH = `${ __dirname }/../../data/cats.json`;

// La diférence entre var et let c'est le scope. "let" se limite au { ... }.
let fGetJSONFromFile,
    fGetAll,
    fGetOne,
    fSetOne,
    fRemoveOne;

fGetJSONFromFile = function( fNext ) {
    // "( oError, sContent ) =>" remplace "function( oError, sContent )"
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
    // 1. read file & 2. convert from json & 3. callback
    // fGetJSONFromFile( ( oError, aCats ) => {
    //     fNext( oError, aCats );
    // } );
    fGetJSONFromFile( fNext );
};

fGetOne = function( sName, fNext ) {
    // 1. read file & 2. convert from json
    fGetJSONFromFile( ( oError, aCats ) => {
        if ( oError ) {
            return fNext( oError );
        }

        // 3. search cats
        let oCat = aCats.find( ( oElt ) => sName === oElt.name );
            // retourne un vrai ou faux
            // on peut l'écrire sans {} et sans return s'il n'y a qu'une ligne de return.

        // 4. callback
        return fNext( null, oCat );
    } );

};

// le "=" permet de mettre une valeur par défault s'il n'est pas défini de base.
fSetOne = function( sName, oData = {}, fNext ) {
    // 1. read file & 2. convert from json
    fGetJSONFromFile( ( oError, aCats ) => {
        if ( oError ) {
            return fNext( oError );
        }

        let iIndex = aCats.findIndex( ( oElt ) => sName === oElt.name );

        // 3. modify cats
        if ( iIndex < 0 ) {
            // cat dont exists, create it
            aCats.push( oData );
        } else {
            // cat exists, modify it
            aCats[ iIndex ] = oData;
        }

        // 4. save file & 5. callback
        fs.writeFile( DATA_PATH, JSON.stringify( aCats ), "utf-8", fNext );
    } );


};

fRemoveOne = function( sName, fNext ) {
    // 1. read file & 2. convert from json
    fGetJSONFromFile( ( oError, aCats ) => {
        let iIndex = aCats.findIndex( ( oElt ) => sName === oElt.name );

        // 3. search cat
        if ( iIndex < 0 ) {
            return fNext( new Error( "Unknown cat" ) );
        }
        // 4. remove cat
        aCats.splice( iIndex, 1 );

        // 5. save file & 6. callback
        fs.writeFile( DATA_PATH, JSON.stringify( aCats ), "utf-8", fNext );
    } );
};

export {
    fGetAll as all,
    fGetOne as get,
    fSetOne as set,
    fRemoveOne as remove,
};
