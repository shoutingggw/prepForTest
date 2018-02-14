import request from 'request';
import fs from 'fs';

console.log("----------------------------Start to read configuration----------------------------");
const config = JSON.parse(fs.readFileSync('basicConfigure.js'));
const {tenantId, employeeId, userId, userType} = config;
console.log(`tenantId: ${tenantId}; employeeId: ${employeeId}; userId: ${userId}`);
console.log("----------------------------End reading configuration------------------------------");

const commonHeader = getCommonHeader();

function wrappedPost(url, payload, callback){
    return wrappedBaseRequest( "POST", url , payload, callback);
}

function wrappedGet(url, callback){
    return wrappedBaseRequest( "GET", url ,callback);
}


function wrappedPut(url, payload, callback){
	return wrappedBaseRequest( "PUT", url , payload, callback);
}

function wrappedPatch(url, payload, callback){
	return wrappedBaseRequest( "PATCH", url , payload, callback);
}

function wrappedBaseRequest( method, url, payload, callback){
	let options = {
        method: method,
        url: url,
        headers: commonHeader
    };
    if( typeof payload === "object"){
    	options["body"] = JSON.stringify(payload);
    }
    if( typeof callback === "function"){
    	return request(options, callback);
    }
	return request(options);
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

export {
	wrappedPost,
	wrappedGet,
	wrappedPut,
	wrappedPatch
}
