/* Chris Jend - 30/092016 
	Server.js - prevkonsep*/
/*Fichier configuration express */
"use strict";

import express from "express";
import responseTime from "response-time";
import bodyParser from "body-parser";
import simpleLog from "./middlewares/log"; //On a du corriger le chemin car on est plus dans middleware
import mainRoutes from "./routes/main";
import zouti from "zouti";
import catsRoutes from "../routes/cats";


const APP_PORT = 8080;

let oApp;

export default function( iAppPort = APP_PORT ){

	if ( oApp ) {
		return oApp; // SI oApp existe deja on s'arrete là
	}
	// Configure Express
	oApp = express();

	// Configure les middleware
	oApp.use( simpleLog );
	oApp.use( responseTime() );
	oApp.use( bodyParser.json() );
	oApp.use( bodyParser.urlencoded ( {
		"extended": true,
	} ) );

	// Configure base temporary route
/*
	oApp.get( "/", ( oRequest, oResponse ) => {
		oResponse.send( "hello world !" );
	} );*/

	oApp.use( mainRoutes );

	// Listening
	oApp.listen( iAppPort, () => {
		zouti.log( `Server is listening on port ${ APP_PORT }` ); // eslint-disable-line no-console 
	} );
	}

