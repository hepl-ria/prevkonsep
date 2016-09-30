/* ria/prevkonsep
 *
 * model/cats.js - Model for cats
 *
 * Coded by mucht@mathieuclaessens.be
 * started at 30/09/2016
*/

// var fs = require( "fs" ); => remplacé par :
import fs from "fs;"

// plus de "var" mais const ou let.
// "const" pour les constantes, toujours en majuscule. Ne change pas ! Sinon il y aura une erreur.
const DATA_PATH = `${ __dirname }/../../data/cats.json`;

let fGetAll,
    fGetOne,
    fSetOne,
    fRemoveOne;

fGetAll = function( fNext ) {
    // 1. read file
    // 2. convert from json
    // 3. callback
};

fGetOne = function( sName, fNext ) {
    // 1. read file
    // 2. convert from json
    // 3. callback
};

// le "=" permet de mettre une valeur par défault s'il n'est pas défini de base.
fSetOne = function( sName, oData = {}, fNext ) {
    // 1. read file
    // 2. convert from json
    // 3. modify cats
    // 4. callback
};

fRemoveOne = function( sName, fNext ) {
    // 1. read file
    // 2. convert from json
    // 3. search cat
    // 4. remove cat
    // 5. save file
    // 6. callback
};
