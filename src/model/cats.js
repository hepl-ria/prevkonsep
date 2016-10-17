/* Model for cats
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
            fNext( oError );
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
  // Readfile
  // convert from json
    fGetJSONFromFile( fNext );
  // call callback
};

fGetOne = function( sName, fNext ) {
  // Readfile
  // Convert from json
    fGetJSONFromFile( ( oError, aCats ) => {
        if ( oError ) {
            return fNext( oError );
        }
          // search cats
        let oCat = aCats.find( ( oElt ) => sName === oElt.name );

          // callback
        return fNext( null, oCat );
    } );

};

fSetOne = function( sName, oData = {}, fNext ) {
  // Readfile
  // Convert from json
    fGetJSONFromFile( ( oError, aCats ) => {
        if ( oError ) {

            return fNext( oError );

        }
        let iIndex = aCats.findIndex( ( oElt ) => sName === oElt.name );

        if ( iIndex < 0 ) {

            aCats.push( oData );

        } else {

            aCats[ iIndex ] = oData;

        }
        fs.writeFile( DATA_PATH, JSON.stringify( aCats ), "utf-8", fNext );
    } );
  // modifie cats
  // save file
  // callback
};

fRemoveOne = function( sName, fNext ) {
  // Readfile
  // Convert from json
    fGetJSONFromFile( ( oError, aCats ) => {
        let iIndex = aCats.findIndex( ( oElt ) => sName === oElt.name );

        if ( iIndex < 0 ) {
            return fNext( new Error( "Unknow cat" ) );
        }
        aCats.splice( iIndex, 1 ); // on veut supprimer un seul chat et on doit donner l'index de départ

        fs.writeFile( DATA_PATH, JSON.stringify( aCats ), "utf-8", fNext );

    } );
  // search cats
  // remove cats
  // save file
  // callback
};

export {
  fGetAll as all,
  fGetOne as get,
  fSetOne as set,
  fRemoveOne as remove,
};
