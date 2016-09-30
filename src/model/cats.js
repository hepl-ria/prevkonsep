/* auré/prevkonsep
*
* /model/cats.js - Model for cats
*
*
* coded by auré
* started at 30/09/2016
*/

/* en es2015 on ne met plus de use strict */

// met les imports tjs au dessus
import fs from "fs"; // pareil que "var fs = require("fs");"

/* const = var à qui on affecte une valeur => tjs en maj ex const DATA_PATH */
/* on peut utiliser des guillemets simples */
/* le $ permet de concatener une chaine de caractere (remplace le +) */
const DATA_PATH = `${__dirname}/../../data/cats.json`;

/* remplace les var */
let fGetJSONFromFile, 
	fGetAll, 
	fGetOne,
	fSetOne,
	fRemoveOne;

// read ile and convert from json
fGetJSONFromFile = function(fNext){

	fs.readFile(DATA_PATH, "utf-8", (oError, sContent) => {

		let aCats;

		if(oError){

			return fNext(oError);
		}

		try{
			aCats = JSON.parse(sContent);

		}catch(oJSONError){

			return fNext(oJSONError);
		}

		return fNext(null, aCats);

	});
};

// recuperer tout le contenu de cats.json
fGetAll = function(){

	// 1. read file
	// 2. convert from json
	// 3. callback
	fGetJSONFromFile(fNext);

};

// recuprer un nom de chat
fGetOne = function(sName, fNext){

	// 1. read file
	// 2. convert from json
	fGetJSONFromFile((oError, aCats) => {

		if(oError){

			return fNext(oError);
		}

		// 3. search cat
		let oCat = aCats.find( (oCat) => sName === oCat.name );
		/*aCats.find( (oCat) => {

			return sName === oCat.name;

		});*/

		// 4. callback
		return fNext(null, oCat);

	});
};

// modifier un nom de chat
fSetOne = function(sName, oData = {}, fNext){ //oData = {} => valeur par défaut (si on donne pas de valeur ca vaudra un objet vide)

	// 1. read file
	// 2. convert from json
	fGetJSONFromFile( (oError, aCats) => {

		if(oError){

			return fNext(oError);
		}

	});

	// 3. modify cat
	let iIndex = aCats.findIndex( (oElt) => sName === oElt.name);

	if(iIndex < 0){

		// cat doesn't exist, create it
		aCats.push( oData);
	}else{

		// cat exists, modify it
		aCats[ iIndex ] = oData;
	}

	// 4. search cat
	// 5. callback
	fs.writeFile(DATA_PATH, JSON.stringify(aCats), "utf-8", fNext);

	});	
};

// supprimer un nom de chat
fRemoveOne = function(sName, fNext){

	// 1. read file
	// 2. convert from json
	fGetJSONFromFile( (oError, aCats) => {

		// 3. search cat 
		let iIndex = aCats.findIndex( (oElt) => sName === oElt, name);

		if( iIndex <o){

			return fNext(new Error("Unknow cat"));
		}

		// 4. remove cat
		aCats.splice(iIndex, 1);

		// 5. save file
		// 6. callback
		fs.writeFile(DATA_PATH, JSON.stringify(aCats), "utf-8", fNext);

	});
};

// pour utiliser les fct dans les autres fichiers
export {

	fGetAll as all,
	fGetOne as get,
	fSetOne as set,
	fRemoveOne as remove,

};
