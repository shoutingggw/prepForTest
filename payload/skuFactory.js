let index = 10000;
const DEFAULT_SKU_PREFIX = "WXT";
getSimpleSKU( namePrefix = DEFAULT_SKU_PREFIX ){
	return getSimpleSKUByType();
}

getSimpleSerialSKU( namePrefix = DEFAULT_SKU_PREFIX ){
	return getSimpleSKUByType("SerialProduct");
}

getSimpleBatchSKU( namePrefix = DEFAULT_SKU_PREFIX ){
	return getSimpleSKUByType("BatchProduct");
}

getSimpleSKUByType( batchSerial = "None", namePrefix = DEFAULT_SKU_PREFIX){
	var skuName = namePrefix + index;
    console.log(`[getSimpleSKUPayload]skuName: ${skuName}`);
    return { 
  	  name: skuName,
	  batchSerial: batchSerial
	};
}

export {
	getSimpleSKU as getSimpleSKU,
	getSimpleSerialSKU as  getSimpleSerialSKU,
	getSimpleBatchSKU as getSimpleBatchSKU
}