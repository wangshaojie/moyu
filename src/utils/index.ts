export function generateRandomColor() {
	// 生成随机的红、绿、蓝三个分量的值
	const red = Math.floor(Math.random() * 256)
	const green = Math.floor(Math.random() * 256)
	const blue = Math.floor(Math.random() * 256)

	// 将分量的值转换为十六进制字符串
	const redHex = red.toString(16).padStart(2, '0')
	const greenHex = green.toString(16).padStart(2, '0')
	const blueHex = blue.toString(16).padStart(2, '0')

	// 拼接颜色代码并返回
	const colorCode = '#' + redHex + greenHex + blueHex
	return colorCode
}
