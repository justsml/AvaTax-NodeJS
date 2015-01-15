'use strict';
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;


/*
Here's how it's done:
*/
var GetTax,
		customerId = '123abc',
		productId = '4-acme',
		subtotalAmount = 49.95,
		addr = {
			"AddressCode": "01",
			"Line1": "45 Fremont Street",
			"City": "San Francisco",
			"Region": "CA"
		}

// TODO: complete tests using different inputs - verify/check err states
// TODO: complete tests using different inputs - verify/check err states
// TODO: complete tests using different inputs - verify/check err states
describe("GetTax API Query", function() {
	it('has valid tax rate results', function (done) {
		GetTax = require('../').getTax;
		var t = new GetTax(customerId, productId, addr, subtotalAmount, function _taxResp(err, data) {
			expect(data.ResultCode)
			expect(data).to.have.property('TotalTax')
			expect(data.TaxLines.length).to.be.within(1, 2)
			expect(data.TaxAddresses.length).to.be.within(1, 2)
			done()
		})
	})
});
