let index = 10000;
const DEFAULT_SN_PREFIX = "WSN";
function getSimpleSerialNumber( skuId, skuName, codePrefix = DEFAULT_SN_PREFIX ){
	let code = codePrefix + skuName + --index;
	return {
      "serialCode": code,
      "sku":skuId
   };
}
export {
	getSimpleSerialNumber
}