'use strict';
var request = require('request'),
		dateStamp = require('./dateStamp'),
		accountNumber = process.env.AVA_ACCT_NUMBER || 'env.AVA_ACCT_NUMBER required',
		licenseKey = process.env.AVA_LICENSE_NUMBER || 'env.AVA_LICENSE_NUMBER required'

exports.getTax = function _getAvaTax(customerId, productId, addr, subtotalAmount, callback) {
	var getTaxReq = {
		customerCode: customerId,
		detailLevel: 'Line',
		docDate: dateStamp(),
		docType: "SalesOrder",
		Addresses: [ addr ],
		Lines: [{
			lineNo: "01",
			destinationCode: '01',
			itemCode: productId,
			qty: "1",
			amount: subtotalAmount.toString(),
	    taxCode: "DC010500"//digital download goods
		}]
	}
	return new exports.proxy("tax/get", 'POST', getTaxReq, callback)
}

exports.proxy = function AvaApiProxy(uriPath, method, requestData, callback) {
	var url, baseUrl = "https://development.avalara.net";
	if ( process.env.NODE_ENV === 'production' ) {
		baseUrl = 'https://avatax.avalara.net'
	}
	var reqOpts = {
		method: method === 'POST' ? 'POST' : 'GET',
		url: baseUrl + "/1.0/" + uriPath,
		// json: true,
		gzip: true,
		headers: {
      'User-Agent': 'Mozilla/5.678 (Linux x86_64) justsml/AvaTax-NodeJS ',
      'Content-Type': 'text/json',
      'Accepts': 'text/json,*/*;q=0.8'
    },
		auth: {
			user: accountNumber + ":" + licenseKey,
			pass: ""
		},
		body: JSON.stringify(requestData)
	};
	return request(reqOpts,		// body: request,//might need json: false?
  function (error, response, body) {
    if (error) {
      console.error('Tax Request Failed', error, reqOpts);
      return callback(new Error(body))// Fix this so we create a sensible error instance
    }
		// console.warn('BODY', body)
		// console.warn('reqOpts', reqOpts)
		if ( typeof(body) === 'string' ) {
			body = JSON.parse(body);
		}
    return callback(null, body);
  })
}
// uri = _POST['uri'];
// method = _POST['method'];
// request = _POST['request']; 
// url = serviceURL . "/1.0/" . uri;
// curl = curl_init();
// curl_setopt(curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
// curl_setopt(curl, CURLOPT_USERPWD, accountNumber . ":" . licenseKey);
// curl_setopt(curl, CURLOPT_URL, url);
// curl_setopt(curl, CURLOPT_RETURNTRANSFER, true);
// if (method == 'POST')
// {
// 	curl_setopt(curl, CURLOPT_POST, true);
// 	curl_setopt(curl, CURLOPT_POSTFIELDS, request); 
// }
// curl_response = curl_exec(curl);
// curl_close(curl);
// echo curl_response;	
