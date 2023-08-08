import { utils,write} from 'xlsx';
const XLSX={ utils,write};
/**
 * @description **工具方法** 通用下载
 */
export const downloadByBlob = (filename: string, content: any) => {
	let a = document.createElement("a");
	//解决微软系产品 bom 头引起的中文乱码问题
	// a.href = URL.createObjectURL(new Blob(["\ufeff", content]));
	a.href = URL.createObjectURL(
		new Blob([content], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8" })
	);
	// a.href = URL.createObjectURL(new Blob(["\ufeff", content], { type: "application/octet-stream;charset=utf-8" }));
	// a.href = window.URL.createObjectURL(new Blob([content], { type: "application/octet-stream;charset=UTF-8" }));
	// a.href = URL.createObjectURL(new Blob([content]));
	// encodeURIComponent
	filename = decodeURIComponent(filename);
	a.download = filename;
	a.click();
	a.remove();
	window.URL.revokeObjectURL(a.href);
};
/**
 *
 * @param sheetData 数组表格数据
 * @param fileName 文件名
 */
export const  exportFile=(sheetData:any, fileName:any) =>{
	// 将由对象组成的数组转化成sheet
	const sheet = XLSX.utils.json_to_sheet(sheetData)
	// 百分数和数字更改为数字类型
	Object.keys(sheet).forEach((key) => {
			// if (sheet[key].v) {
			// 		const val = sheet[key].v
			// 		if (!isNaN(val)) {
			// 				sheet[key].t = 'n'
			// 		}
			// 		if (val.lastIndexOf('%') === val.length - 1) {
			// 				sheet[key].t = 'n'
			// 				sheet[key].z = '0.00%'
			// 				sheet[key].v = Number(val.substring(0, val.length - 1)) / 100
			// 		}
			// }
	})
	// 创建虚拟的workbook
	const wb = XLSX.utils.book_new()
	// 把sheet添加到workbook中
	XLSX.utils.book_append_sheet(wb, sheet, fileName)
	const workbookBlob = workbook2blob(wb)
	openDownload(workbookBlob, `${fileName}.xls`)
}
function openDownload(blob:any, fileName:any) {
	if (typeof blob === 'object' && blob instanceof Blob) {
			blob = URL.createObjectURL(blob) // 创建blob地址
	}
	const aLink = document.createElement('a')
	aLink.href = blob
	// HTML5新增的属性，指定保存文件名，可以不要后缀，注意，有时候 file:///模式下不会生效
	aLink.download = fileName || ''
	let event
	if (window.MouseEvent) event = new MouseEvent('click')
	//   移动端
	else {
			event = document.createEvent('MouseEvents')
			event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
	}
	aLink.dispatchEvent(event)
}

function workbook2blob(workbook:any) {
	// 生成excel的配置项
	const wopts =<any> {
			// 要生成的文件类型
			bookType: 'xlsx',
			// // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
			bookSST: false,
			type: 'binary',
	}
	const wbout = XLSX.write(workbook, wopts)
	// 将字符串转ArrayBuffer
	function s2ab(s: string) {
			const buf = new ArrayBuffer(s.length)
			const view = new Uint8Array(buf)
			for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff
			return buf
	}
	const blob = new Blob([s2ab(wbout)], {
			type: 'application/octet-stream',
	})
	return blob
}


