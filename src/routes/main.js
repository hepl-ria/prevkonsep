/* Chris Jend - 30/092016 
	Server.js - prevkonsep*/	

import { Router } from "express";

let oRouter = new Router();

oRouter.get( "/", ( oRequest, oResponse ) => {
	oResponse.send("Hi you");
});

export default oRouter;