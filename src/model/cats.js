/* prevkonsep
 *
 * /model/cats - Model for cats
 *
 * coded by Anne
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
    /*
    fGetJSONFromFile( ( oError, aCats ) => {
        fNext( oError, aCats );
    } );
    vu qu'on appelle la fonction quand fGetJSONFromFile a fini son travail et que les deux ont les mêmes paramètres, on appelle fNext directement
    */
    fGetJSONFromFile( fNext );
};

fGetOne = function( sName, fNext ) {
    fGetJSONFromFile( ( oError, aCats ) => {
        if ( oError ) {
            return fNext( oError );
        }
        // 3. find cat
        /*
        aCats.find( ( oCat ) => {
         return sName === oCat.name;
        } ); 
        */
        let oCat = aCats.find( ( oCat ) => sName === oCat.name );

        // 4. callback
        return fNext( null, oCat );
        
    } );
};

fSetOne = function( sName, oData = {}, fNext ) {
    // on donne une valeur par défaut au param, si on appelle et qu'on ne donne pas le paramètre, on aura un objet vide
    // 1. read file
    // 2. convert from json
    fGetJSONFromFile( ( oError, aCats ) => {
        if ( oError ) {
            return fNext( oError )
        }
    
        // 3. modify cat
        // récupérer l'index dans le tableau pour réécrire les données au même endroit
        let iIndex = aCats.findIdex( ( oElt ) => sName === oElt.name );

        if ( iIndex < 0 ) {
            // si le chat n'existe pas, on le crée
            aCats.push( oData );
        } else {
            // le chat existe, on le modifie
            aCats[ iIndex ] = oData;
        }
        // 4. save file
        // fs.writeFile( DATA_PATH, JSON.stringify( aCats ), "utf-8", ( oSaveError ) => {
        //  return fNext( oSaveError );
        // } );
        fs.writeFile( DATA_PATH, JSON.stringify( aCats ), "utf-8", fNext );
        } );

    // 5. callback
    };


fRemoveOne = function( sName, fNext ) {
    fGetJSONFromFile( ( oError, aCats ) => {
        // 3. search cat
        let iIndex = aCats.findIdex( ( oElt ) => sName === oElt.name );

        if ( iIndex < 0 ) {
            return fNext( new Error( "Unknown cat" ) );
        }
        // 4. remove cat
        // splice retire des éléments du tableau
        aCats.splice( iIndex, 1 );
        // 5. save file
        // 6. callback
        fs.writeFile( DATA_PATH, JSON.stringify( aCats ), "utf-8", fNext );
    } );    
};

// on exporte les fonctions pour pouvoir les utiliser dans d'autres fichiers
// attention on met une , au dernier élément  = trailing coma
export {
    fGetAll as all,
    fGetOne as get,
    fSetOne as set,
    fRemoveOne as remove,
};
