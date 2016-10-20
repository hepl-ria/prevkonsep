/* auré/prevkonsep
*
* /model/dogs.js - Model for dogs
*
*
* coded by auré
* started at 30/09/2016
*/

import fs from "fs"; 

const DATA_PATH = `${__dirname}/../../data/dogs.json`;

/* remplace les var */
let fGetJSONFromFile, 
	fGetAll, 
	fGetOne,
	fSetOne,
	fRemoveOne;

// read ile and convert from json
fGetJSONFromFile = function(fNext){

	fs.readFile(DATA_PATH, "utf-8", (oError, sContent) => {

		let aDogs;

		if(oError){

			return fNext(oError);
		}

		try{
			aDogs = JSON.parse(sContent);

		}catch(oJSONError){

			return fNext(oJSONError);
		}

		return fNext(null, aDogs);

	});
};

// recuperer tout le contenu de dogs.json
fGetAll = function(){

	// 1. read file
	// 2. convert from json
	// 3. callback
	fGetJSONFromFile(fNext);

};

// recuprer un nom du chien
fGetOne = function(sName, fNext){

	// 1. read file
	// 2. convert from json
	fGetJSONFromFile((oError, aDogs) => {

		if(oError){

			return fNext(oError);
		}

		// 3. search dog
		let oDag = aDogs.find( (oDog) => sName === oDog.name );

		// 4. callback
		return fNext(null, oDog);

	});
};

// modifier un nom de chat
fSetOne = function(sName, oData = {}, fNext){ 

	// 1. read file
	// 2. convert from json
	fGetJSONFromFile( (oError, aDogs) => {

		if(oError){

			return fNext(oError);
		}

	});

	// 3. modify dog
	let iIndex = aDogs.findIndex( (oElt) => sName === oElt.name);

	if(iIndex < 0){

		// dog doesn't exist, create it
		aDogs.push( oData);
	}else{

		// dog exists, modify it
		aDogs[ iIndex ] = oData;
	}

	// 4. search dog
	// 5. callback
	fs.writeFile(DATA_PATH, JSON.stringify(aDogs), "utf-8", fNext);

	});	
};

// supprimer un nom de chien
fRemoveOne = function(sName, fNext){

	// 1. read file
	// 2. convert from json
	fGetJSONFromFile( (oError, aDogs) => {

		// 3. search dog 
		let iIndex = aDogs.findIndex( (oElt) => sName === oElt, name);

		if( iIndex <o){

			return fNext(new Error("Unknow dog"));
		}

		// 4. remove dog
		aDogs.splice(iIndex, 1);

		// 5. save file
		// 6. callback
		fs.writeFile(DATA_PATH, JSON.stringify(aDogs), "utf-8", fNext);

	});
};

// pour utiliser les fct dans les autres fichiers
export {

	fGetAll as all,
	fGetOne as get,
	fSetOne as set,
	fRemoveOne as remove,

};
