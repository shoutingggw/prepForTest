import * as serialNumberPayload from '../payload/serialNumberPayload.js';
import * as requestMethod from '../request/requestMethod.js';


const url = 'http://127.0.0.1:8102/SerialNumber';
function createSimpleSerialNumber( skuId, skuName, callback, namePrefix){
	return requestMethod.wrappedPost(url, serialNumberPayload.getSimpleSerialNumber(skuId, skuName), callback);
}

function createMultipleSerialNumber(skuId, skuName, quantity, singleCallback, allCallback, namePrefix){
	let i = 0, 
	promises = [];
	for(;i < quantity; i++){
		promises.push(getSimpleSerialNumber(skuId, skuName, singleCallback, namePrefix));
	}
	return Promise.all(promises).then(allCallback);
}

export {
	createSimpleSerialNumber,
	createMultipleSerialNumber
}