# yapi-quicktype

### 一个自动拉取yapi,swagger数据，生成typescript .d.ts文件的插件。  
### An automatic pull Yapi, swagger data generation typescript d. Plug in for TS files.

#### 使用/Use
create yapi yapi-quicktype.config.js(or ts) In your project root directory or cmd input
``` bash
// package.json
 "scripts": {
    "type": "yapi-quicktype"
 }
```
##### 参数配置/ params
| key  | require |  default |  type | discribe | platform |  
| :--: | :-----: | :----: | :---: | -------- | ----- |
| platform | true | yapi | string | yapi/swagger | yapi |
| email | true |        | string | account | yapi |
| password | true |  | string | password | yapi |
| baseURL | true |  | string | domain name | yapi |
| all | false | false  | boolean | completed api | yapi |
| limit | false | 1000 | number | request page size | yapi |
| taskLimit | false | 6 | number | number of concurrent requests | yapi |
| url | true | '' | string | xxx.json | swagger |
| allPropertiesRequired | false | false | boolean | required | swagger |

in yapi-quicktype.config file
``` bash
ctrl + shift + p
```
enter 'APIQuicktype'

or  
```
ctrl + 7
```
