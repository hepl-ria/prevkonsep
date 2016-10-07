/* /model/cats - Model for cats
   Started at 30/09/2016 */

import fs from "fs"; // Remplace require dans ES2015

const DATA_PATH = `${ __dirname }/../../data/cats.json`;
let fGetJSONFromFile,
    fGetAll,
    fGetOne,
    fSetOne,
    fRemoveOne;

fGetJSONFromFile = function( fNext ) {
    fs.readFile( DATA_PATH, "utf-8", ( oError, sContent ) => { // Raccourci pour écrire une fonction =>
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
    // 1. read file
    fGetJSONFromFile( ( oError, aCats ) => {
        fNext( oError, aCats );
    } ); // Ou on peut appeler direct fNext dans la fGetJSONFromFile, comme c'est les même parametres dans les deux
    // 2. convert from json
    // 3. callback
};

fGetOne = function( sName, fNext ) {
    // 1. read file and 2. convert from json
    fGetJSONFromFile( sName, fNext ) {
        fGetJSONFromFile( ( oError, aCats ) => {
            return fNext( oError );
        }

    // 3. search cat
        let oCat = aCats.find( ( oElt ) => sName === oElt.name ); // Pas la peine de créer une fonction complète, c'est une forme raccource ES2016
        });

    // 4. callback

        return fNext( null, oCat );

};

fSetOne = function( sName, oData = {}, fNext ) { // Si je passe {} à oData, et que je lui met une valeur false ou null ( = on lui donne pas de valeur) ça deviendra un objet vide
    // 1. read file
    // 2. convert from json
    // 3. modify cat
    // 4. save file
    // 5. callback
};

fRemoveOne = function( sName, fNext ) {
    // 1. read file
    // 2. convert from json
    // 3. search cat
    // 4. remove cat
    // 5. save file
    // 6. callback
};