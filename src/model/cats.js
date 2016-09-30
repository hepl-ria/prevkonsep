/*Chris Jend - 30/092016 
    src/model/cats.js - prevkonsep*/

import fs from "fs"; // Fait la meme chose qu'un require fs avec variable

const DATA_PATH = `${ __dirname }/../../data/cats.json`; // Sorte de nvl variable qui ne changera jamais

let fGetJsonFromFile,
    fGetAll,
    fGetOne,
    fSetOne,
    fRemoveOne;

fGetJsonFromFile = function( fNext ) { // FERA toujours les taches 1 et 2 ci dessous
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
    // 1 - Read file
    // 2- Convert from json
    // 3- Call callback

    fGetJsonFromFile( fNext ); // Lis le fichier et le convertit ( point 1 et 2)
};

fGetOne = function( sName, fNext ) {
    // 1- read file
    // 2- convert from json
    fGetJsonFromFile( ( oError, aCats ) => {
        if ( oError ) {

            return fNext( oError );

        }

    // 3- Search cat
         let oCat = aCats.find( ( oElt ) => sName === oElt.name );
    // 4- display it - call back

        return fNext( null, oCat );

    } );
};

fSetOne = function( sName, oData = {} , fNext ) { // Si pour odata est false ou nul, {} vaudra un objt vide
    // 1- read file
    // 2- convert from json
    fGetJsonFromFile( ( oError, aCats ) => {
        if ( oError ) {
            return fNext( oError );
        }
    // 3- Modify cat
        // Récuperer l'index de notre chat ( localiser elt du tab )
        let iIndex = aCats.findIndex( ( oElt ) => sName === oElt.name );

        if ( iIndex < 0 ) {
            // Cat existe pas, on le crée alors
            aCats.push( oData );

        } else {
            // si il existe on le modifie
            aCats[ iIndex ] = oData;
        }
    // 4- save file
    // 5- Call back
        fs.writeFile( DATA_PATH, JSON.stringify( aCats ), "utf-8", fNext );
    } );
    
    
    

};

fRemoveOne = function( sName, fNext ) {
    // 1- read file
    // 2- convert from json
    fGetJsonFromFile( ( oError, aCats ) => {
    // 3- search cat
        let iIndex = aCats.findIndex( ( oElt ) => sName === oElt.name );

        if ( iIndex < 0 ){
            return fNext( new Error( "Unknown cat" ) );
        }
    // 4- remove cat
    // DEGEU : delete aCats[ iIndex ];
        aCats.splice( iIndex, 1 );

    // 5- save file
    // 6- call back
        fs.writeFile( DATA_PATH, JSON.stringify( aCats ), "utf-8", fNext );

        } );
    
};

export { //POur exporter nos fct

    fGetAll as all,
    fGetOne as get,
    fSetOne as set,
    fRemoveOne as remove,
};


