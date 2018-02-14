let index = 10000;
const DEFAULT_SKU_PREFIX = "W",
DEFAULT_SERIAL_SKU_PREFIX = "WS",
DEFAULT_BATCH_SKU_PREFIX = "WB";
function getSimpleSKU( namePrefix = DEFAULT_SKU_PREFIX ){
	return getSimpleSKUByType();
}

function getSimpleSerialSKU( namePrefix = DEFAULT_SERIAL_SKU_PREFIX ){
	return getSimpleSKUByType("SerialProduct");
}

function getSimpleBatchSKU( namePrefix = DEFAULT_BATCH_SKU_PREFIX ){
	return getSimpleSKUByType("BatchProduct");
}

function getSimpleSKUByType( batchSerial = "None", namePrefix = DEFAULT_SKU_PREFIX){
	var skuName = namePrefix + --index;
    console.log(`[getSimpleSKUPayload]skuName: ${skuName}`);
    return { 
  	  name: skuName,
	  batchSerial: batchSerial
	};
}

export {
	getSimpleSKU,
	getSimpleSerialSKU,
	getSimpleBatchSKU
}