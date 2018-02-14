import * as skuFactory from './boFactory/skuFactory.js';
import * as serialNumberFactory from './boFactory/serialNumberFactory.js';

debugger
//create single sku
//skuFactory.createSimpleSKU(callbackSingleSKU);


//create multiple skus
//skuFactory.createMultipleSKU(10, callbackSingle, createMultipleSKU);


//create serial number
skuFactory.createSimpleSerialSKU(callbackSingleSKU);
// serialNumberFactory.createMultipleSerialNumber(skuId, quantity, singleCallback, allCallback, namePrefix)



//create multiple serial numbers


function callbackSingleSKU(error, response, body){
	if(error){
		console.error(error);
		return;
	}
	let info = JSON.parse(body);
	if(!info){
		return null;
	}
	let id =info["id"],
	skuId =info["defaultSKUId"],
    skuName = info["name"];
	console.log(`body id is ${id}, skuId is ${skuId}, skuName is ${skuName}`);
	return serialNumberFactory.createSimpleSerialNumber( skuId, skuName, callbackSingle);
}

function callbackSingle(error, response, body){
	if(error){
		console.error(error);
		return;
	}
	let info = JSON.parse(body);
	if(!info){
		return null;
	}
	let id =info["id"];
	console.log(`body id is ${id}`);
}

function callbackAll(){
	console.log("============= complete all ==============")
}