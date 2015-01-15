module.exports = function _getDateStamp() {
	var d = new Date(),
		yy = d.getFullYear(),
		mm = (d.getMonth() + 1).toString(),
		dd = (d.getDate()).toString()
	mm = mm.length === 2 ? mm : "0" + mm
	dd = dd.length === 2 ? dd : "0" + dd
	return (yy + "-" + mm + "-" + dd)
}