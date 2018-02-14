import * as skuPayload from '../payload/skuPayload.js';
import * as requestMethod from '../request/requestMethod.js';


const url = 'http://127.0.0.1:8105/Product';
function createSimpleSKU(callback, namePrefix){
	return requestMethod.wrappedPost(url, skuPayload.getSimpleSKU(), callback);
}

function createSimpleSerialSKU(callback, namePrefix){
	return requestMethod.wrappedPost(url, skuPayload.getSimpleSerialSKU(), callback);
}

function createMultipleSKU(quantity, singleCallback, allCallback, namePrefix){
	let i = 0, 
	promises = [];
	for(;i < quantity; i++){
		promises.push(createSimpleSKU(singleCallback, namePrefix));
	}
	return Promise.all(promises).then(allCallback);
}

export {
	createSimpleSKU,
	createSimpleSerialSKU,
	createMultipleSKU
}