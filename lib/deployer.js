'use strict';

var pathFn = require('path'),
    fs = require('hexo-fs'),
    CloudBase = require('@cloudbase/manager-node'),
    chalk = require('chalk');

module.exports = function(args, callback) {
    if (!args.secretId || !args.secretKey || !args.envId) {
        var help = [
            "You should argsure deployment TCB settings in _config.yml first!",
            "",
            "deploy:",
            "   type: tcb",
            "   secretId: your secretId",
            "   secretKey: your secretKey",
            "   envId: your secretKey",
            "",
            'For more help, you can check the docs: ' + chalk.underline('https://hexo.io/'),
            'and '+chalk.underline('https://vxuu.com/hexo-deployer-tcb')
        ];
        console.log(help.join('\n'));
        log.error('hexo-deployer-tcb config error');
        return;
    }


    let publicDir = this.public_dir,
        log = this.log,
        uploadFileList = [];

    const app = new CloudBase({
        secretId: args.secretId,
        secretKey: args.secretKey,
        envId: args.envId
    });
    const { hosting, storage } = app;
    log.info('Uploading files to TCB...');
    // get all files sync
    traverseFiles(publicDir,
        function(file) {
            uploadFileList.push({
                cloudPath: getUploadPath(file, pathFn.basename(publicDir)),
                localPath: file
            });
        });
    upload(uploadFileList);
    // upload
    async function upload(uploadFileList) {
        const successFiles = [];
        const failedFiles = [];
        await hosting.uploadFiles({
            files:uploadFileList,
            onFileFinish: (error, res, fileData) => {
                if (error){
                    log.error(error);
                    failedFiles.push(fileData.Key)
                }
                if(res.statusCode == 200){
                    log.info(`File ${fileData.Key} Uploaded successfully`);
                    successFiles.push(fileData.Key)
                }
            }
        });
        const totalFiles = uploadFileList.length;

        log.info(`\n`);
        log.info(`Total Files      ${totalFiles} `);
        log.info(`Uploaded Success ${successFiles.length} `);
        log.info(`Uploaded Failed  ${failedFiles.length} `);
    }
};

function traverseFiles(dir, handle) {
    var files = fs.listDirSync(dir);
    files.forEach(function(filePath) {
        var absPath = pathFn.join(dir, filePath),
            stat = fs.statSync(absPath);
        if (stat.isDirectory()) {
            traverseFiles(absPath, handle);
        } else {
            handle(absPath);
        }
    });
}

function getUploadPath(absPath, root) {
    var pathArr = absPath.split(pathFn.sep),
        rootIndex = pathArr.indexOf(root);
    pathArr = pathArr.slice(rootIndex + 1);
    return pathArr.join('/');
}