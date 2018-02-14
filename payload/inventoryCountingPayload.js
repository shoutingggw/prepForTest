function getSimpleInventoryCountingPayload(skus, warehouseId){
    return getBaseCounting(getSimpleInventoryCountingLines(skus), warehouseId);
}

function getSerialInventoryCountingPayload(skuSerialMap, warehouseId){
    return getBaseCounting(getSerialCountingLines(skuSerialMap), warehouseId);
}

function getSimpleInventoryCountingLines(skus){
    let lines=[];
    skus.forEach((item)=>{
        lines.push(getBaseLine(skuid));
    });
    return lines;
}

function getSerialCountingLines(skuSerialMap){
    var lines=[];
    skuSerialMap.forEach((value,key)=>{
    	let line = getBaseLine(skuid);
    	line["serials"] = value.map((item)=>{
    		return {
                  "serial": {
                    "id": item
                  }
                };
    	});
        lines.push(line);
    });
    return lines;
}

function getBaseLine(skuid){
	return {
            "countedQuantity": "1",
            "isSerialsInitialized": true,
            "sku": skuid,
            "variance": "0",
            "variancePercent": "0",
            "batches": [],
            "serials": []
    };
}

function getBaseCounting(lines, warehouseId){
	return {
        "lines": lines,
        "warehouse": {
            "id": warehouseId
        }
    };
}
// function getBatchCountingLines(skuBatchMap){
//     var lines=[];
//     skuBatchMap.forEach((value,key)=>{
//     	let line = getBaseLine(skuid);
//     	line["batches"] = value.map((item)=>{
//     		return {
//                   "batch": {
//                     "id": item
//                   }
//                 };
//     	});
//         lines.push(line);
//     });
//     return lines;
// }
export {
	getSimpleInventoryCountingPayload,
	getSerialInventoryCountingPayload
}