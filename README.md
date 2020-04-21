# hexo-deployer-tcb

TCB deployer plugin for Hexo

[Tencent CloudBase Website Hosting](https://cloud.tencent.com/product/wh)


## Install
``` bash
$ npm install hexo-deployer-tcb --save
```

## Options
You can configure this plugin in _config.yml.

``` yaml
# You can use this:
deploy:
  type: tcb
  secretId: < # your envId >
  secretKey: < # your secretKey >
  envId: < # your envId >


# Example:
deploy:
  type: tcb
  secretId: AKIDy72vb123isqCRhYSzqzdw3XGF9XY2oAu
  secretKey: iz47dbHBCJwSHIRQQNyerK1pDmaGslKZ
  envId: blog-1b08ba
```

You can get the SecretId, SecretKey on your [Tencent Cloud Console](https://console.cloud.tencent.com/cam/capi).
* **secretId**: specify a SecretId
* **secretKey**: specify a SecretKey
* **envId**: specify a Environment ID,You can find it in your TCB console [environment settings](https://console.cloud.tencent.com/tcb/env/setting).

## Usage
**Deploy to TCB after generation:**
```bash
$ hexo d -g

## or this

$ hexo deploy --generate

```
You can get it from here.[Tencent Cloud Console](https://console.cloud.tencent.com/cam/capi)

![image.png](https://vxuu.com/img/bcY1oHxXNjMQaA3.png)


![image.png](https://vxuu.com/img/ng9FsjtH371R4Y8.png)


## Help 
* [什么是云开发静态网站](https://cloud.tencent.com/developer/article/1611257)
* [如何在云开发静态托管绑定静态域名](https://cloud.tencent.com/developer/article/1613278)
* [将你的 Hexo 部署到云开发静态托管](https://vxuu.com/archives/2020/32ew2k.html)


## License
MIT