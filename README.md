# yapi-quicktype

### 一个自动拉去yapi数据，生成typescript .d.ts文件的插件。  
### An automatic pull Yapi data generation typescript d. Plug in for TS files.

#### 安装/install
```bash
npm/cnpm install yapi-quicktype --save / yarn add yapi-quicktype
```

#### 使用/Use
create yapi yapi-quicktype.config.js(or ts) In your project root directory or cmd input
``` bash
// package.json
 "scripts": {
    "type": "yapi-quicktype"
 }
```
##### 参数配置/ params
| key  | require |  default |  type | discribe |  
| :--: | :-----: | :----: | :---: | -------- |  
| email | true |        | string | yapi account |
| password | true |  | string | yapi password |
| baseURL | true |  | string | yapi domain name |
| all | false | false  | boolean | completed api |
| limit | false | 1000 | number | request page size |
| taskLimit | false | 6 | number | number of concurrent requests |
