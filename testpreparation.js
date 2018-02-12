var request = require('request');
var tenantId = '103464304572960',
userId = '413857310146560',
employeeId = '413857312571456',
userType = 'Key',
warehouseId = 413857365073952,
skuSerialMap = new Map();
SKU_PREFIX = "SWXT";

 var promiseList = [];

for(let i = 0; i < 50;i++){
    promiseList.push(generateSKUAndSerial(i));
}
console.log("^^^^^^^^^^^^^^^^", promiseList.length );

setTimeout(generateCounting,60000);

// Promise.all(promiseList).then(()=>{
    
// });


function generateCounting(){
    console.log("***********begin to create counting");
     let optionsCounting = {
        method: 'POST',
        url: 'http://127.0.0.1:8084/InventoryCounting',
        headers: getCommonHeader(),
        body: JSON.stringify(getSimpleSerialCountingPayload())
    };
    // console.log(JSON.stringify(getSimpleSerialCountingPayload()));
    var t1 = new Date();
    request(optionsCounting, (error, response, body)=>{
        console.log("!!!!!!!!!!!!!!!!!!! cost time: ", (new Date())-t1);
        // console.log("**********request complete body:", body);
        if (!error) {
            "----------------counting complete ------------"
        }
    });
}

function generateSKUAndSerial(index){
    console.log("***********", index);
    let optionsSku = {
        method: 'POST',
        url: 'http://127.0.0.1:8105/Product',
        headers: getCommonHeader(),
        body: JSON.stringify(getSimpleSKUPayload("SerialProduct", index))
    };
    request(optionsSku, (error, response, body)=>{
    // console.log("**********request complete body:", body);
  if (!error) {
        var info = JSON.parse(body),
        skuId = info["defaultSKUId"];
        skuName = info["name"];
        console.log("***********" + skuId);
        if(skuId){
            var optionSerial = {
                method: 'POST',
                url: 'http://127.0.0.1:8084/SerialNumber',
                headers: getCommonHeader(),
                body: JSON.stringify(getSimpleSerialNumberPayload(skuName+"001", skuId))
            };
            // console.log("**********optionSerial: {}", optionSerial);
            // optionSerial[body] = JSON.stringify(getSimpleSerialNumberPayload(skuName+"001", skuId));
            request(optionSerial, function(error, response, body){
                console.log("===============" + skuId);
                var info = JSON.parse(body);
                skuSerialMap.set(skuId, info["id"]);
                console.log("---------------size, key, value",skuSerialMap,skuId,info["id"]);
                // console.log("***********" + info["id"]);
            });
        }
        
    }
    });
}

function getSimpleSKUPayload(batchSerial, index){
    var no = 999 - index;
    console.log("*************************", SKU_PREFIX + no)
    return { 
  	  name: SKU_PREFIX + no,
	  batchSerial: batchSerial
	};
}

function getSimpleSerialNumberPayload(code, skuId){
   return {
      "serialCode": code,
      "sku":skuId
   };
}
function getCommonHeader(){
    return {
        'content-type':'application/json',
        'accept':'application/json',
        'X-Tenant-ID':tenantId,
        'X-User-ID':userId,
        'X-Employee-ID':employeeId,
        'X-Locale':'xx_XX',
        'X-User-Type':userType
    };
}
function getSimpleSerialCountingPayload(){
    return {
        "lines": getSerialCountingLines(),
        "warehouse": {
            "id": warehouseId
        }
    };
}
function getSerialCountingLines(){
    var lines=[];
    console.log(skuSerialMap.size);
    skuSerialMap.forEach((value,key)=>{
        lines.push({
            "countedQuantity": "1",
            "isSerialsInitialized": true,
            "sku": key,
            "variance": "0",
            "variancePercent": "0",
            "batches": [],
            "serials": [
                {
                  "serial": {
                    "id": value
                  }
                }
            ]
        });
    });
    return lines;
}
