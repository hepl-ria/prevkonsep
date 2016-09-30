/* auré/prevkonsep
*
* /src/core/middlewares/log.js - 
*
*
* coded by auré
* started at 30/09/2016
*/

export default function({method, url}, oResponse, fNext){

	console.log(´${method} ${url}`); //eslint-disable-line no-console
	fNext();
}