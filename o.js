import XLSX from 'xlsx'

export function importXLSX(e,callback,keyObj){
    //拿到所导入文件的名字
    let fileName = e.target.files[0]
    //定义reader，存放文件读取方法
    let reader = new FileReader()
    //启动函数
    reader.readAsBinaryString(fileName)
    //存放json数组格式的表格数据
    let resultJson = []
    //存放字符串数组格式的表格数据
    let resultFormulae = []
    //onload在文件被读取时自动触发
    reader.onload = function (e) {
        //workbook存放excel的所有基本信息
        let workbook = XLSX.read(e.target.result, {type: 'binary'})
        //定义sheetList中存放excel表格的sheet表，就是最下方的tab
        let sheetList = workbook.SheetNames
        //存放json数组格式的表格数据
        resultJson = []
        //存放字符串数组格式的表格数据
        resultFormulae = []
        //遍历sheet表
        sheetList.forEach(function(y) {
            let worksheet = workbook.Sheets[y]
            let json = XLSX.utils.sheet_to_json(workbook.Sheets[y])
            let formulae = XLSX.utils.sheet_to_formulae(workbook.Sheets[y])
            if(json.length > 0){
                // console.log(json)
                //具体如何处理看项目需求，我的项目其实只有一个sheet，在这里写成循环避免大家误会
                //数据处理与存放
                resultJson = json
                resultFormulae.push(formulae)
            }
        })

        let arrList = []
        if (keyObj != undefined) {
            resultJson.map((value, index, arry) => {
                let obj = Object.keys(value).reduce((newData, key) => {
                    let newKey = keyObj[key] || key
                    newData[newKey] = value[key]
                    return newData
                }, {})
                arrList.push(obj)
            })
        } else { 
            arrList = resultJson
        }
        callback && callback(arrList)
    }
}


// 导出函数封装
export function exportXLSX(name,dataList,option) {
    let key = [],title = []
    for(let k in option){
        key.push(k)
        title.push(option[k])
    }
    require.ensure([], () => {
        const { export_json_to_excel } = require('./lib/Export2Excel')
        const data = formatJson(key, dataList)
        export_json_to_excel(title, data, name)
    })
}

function formatJson(filterVal, jsonData) {
    return jsonData.map(v => filterVal.map(j => v[j]))
}