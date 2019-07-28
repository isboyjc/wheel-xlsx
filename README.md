# wheel-xlsx



### 说明

- 适用于普通无定制的excel导入导出功能实现
- 无脑函数式操作，方便快捷
- 前端导入导出避免了文件流传输的消耗
- 基于xlsx扩展



### 对比

| 对比 | 普通                                             | 插件                                              |
| ---- | ------------------------------------------------ | ------------------------------------------------- |
| 导入 | 前端传送文件流到后端，后端读取文件拿到数据后存储 | 前端读取文件，返回数据传给后端，后端只需存储      |
| 导出 | 后端查库得到数据生成excel文件，前端下载文件      | 后端查库得到数据返回前端，前端根据数据生成excel表 |



### 安装

```js
npm install -s wheel-xlsx
# CDN版本请等待 . . .
```



### 引入

```js
import { importXLSX,exportXLSX } from 'wheel-xlsx'
```



### 导入

- 引入

```js
import { importXLSX } from 'wheel-xlsx'
```



- 参数

```js
importXLSX(file,callback,option)
```

| 参数     | 选择 | 说明                                                         |
| -------- | ---- | ------------------------------------------------------------ |
| file     | 必传 | 导入excel表的文件流                                          |
| callback | 必传 | 导入回调(data)=>{console.log(data)}，data为读取导入excel表后返回的数组对象 |
| option   | 可选 | 导入文件键名更改 (导入文件后生成数组对象，默认键名为表头信息，可使用option参数转换，例：option为{”序号“ :  ”id“ , "姓名"  : "name"} ，则返回数据键名会对应更改) |



- 示例

```html
<input type="file" id="imFiler" onchange="exportData" style="display:none;" />
<button type="" onclick="btnClick">导入数据</button>
```

```js
function btnClick(){
    // 点击按钮后唤醒文件上传
    document.getElementById('imFiler').dispatchEvent(new MouseEvent('click'))
}

function exportData(file){
    // 选择文件后触发change
    let keyMap = {
        '序号'     :   'id',
        '用户名'   :   'name',
        '职务'     :   'position_name',
        '手机号'   :   'mobile'
    }

    importXLSX(file,(data)=>{
        console.log(data)
        // ... 向后端发送数据
    },keyMap)
}
```

```js
// 上述导出数据data格式为
[
    {id:1,name:'张三',position_name:'学生',mobile:"12345678901"},
    {id:2,name:'张四',position_name:'学生',mobile:"12345678902"},
    ...
]
```



**注：**如果在开发中要实现导入excel表的功能 ，我们只需要写一个唤醒文件上传的按钮 ，下载并引入`wheel-xlsx`，点击上传按钮唤醒文件上传 ，在文件上传的change事件里调用下`importXLSX`轮子就可以轻松实现前端excel文件读取 ，直接向后端传读取后的json数据就可以了，是不是超简单呢



### 导出

- 引入

```js
import {exportXLSX} from 'wheel-xlsx'
```



- 参数

```js
exportXLSX(name,dataList,option)
```

| 参数     | 选择 | 说明                                                         |
| -------- | ---- | ------------------------------------------------------------ |
| name     | 必传 | 导出excel表的文件名                                          |
| dataList | 必传 | 导出表的数据                                                 |
| option   | 必传 | 导出文件键名更改 (导出文件后生成excel表，默认excel表的标题为数据键名，可使用option参数转换，例：option为{“id” :  ”序号“ , "name"  : "姓名"} ，则导出的表头会对应更改) |



- 示例

```js
// 点击导出按钮请求数据
// 模拟后端返回前端的数据
let data = [
    {id:1,name:'张三',position_name:'学生',mobile:"12345678901"},
    {id:2,name:'张四',position_name:'学生',mobile:"12345678902"},
    ...
]
let keyMap = {
    'id'     		:   '序号',
    'name'   		:   '用户名',
    'position_name'  :   '职务',
    'mobile'   		:   '手机号'
}
exportXLSX('我是表名',data,keyMap)
```



**注：**看，我们只需要写一个导出按钮，点击按钮请求数据，拿到要导出的数据直接调用`exportXLSX`就ok了，一个超级简单的导出就完成了，而且效率更高