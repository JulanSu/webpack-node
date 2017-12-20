/**
 * 生成配置文件
 */
const fs = require('fs');
const path = require('path');
let output = {
    entryStr: function () {
        let entryJs = this.eachEntryFile('./client/js');
        return entryJs;
    },
    eachEntryFile: function(dir) {
        let entry_files = {};
        try {
            fs.readdirSync(dir).forEach(function (file) {
                let file_path = dir + '/' + file;
                fs.readdirSync(file_path).forEach(function (jsfile) {
                    let name = path.basename(jsfile, '.js');
                    let fname = `${file}/${name}`
                    let jsfile_path = file_path + '/' + jsfile;
                    entry_files[fname] = jsfile_path;
                })  
            })
            return entry_files;
        } catch (e) {
            console.log('获取入口js文件失败')
        }
    },
    htmlsPluginStr: function () {
        let jadesArray = this.eachFile('./views');
        return jadesArray;
    },
    eachFile: function(dir) {
        let pagesArray = [];
        try {
            fs.readdirSync(dir).forEach(function (file) {
                let file_obj = {};
                if (file.indexOf('jade') < 0 && file.indexOf('includes') < 0) {
                    let file_path = dir + '/' + file;
                    fs.readdirSync(file_path).forEach(function (jade) {
                        let chunk_name = path.basename(jade, '.html');
                        let jade_path = file_path + '/' + jade;
                        file_obj['filepath'] = jade_path;
                        file_obj['fileleft'] = jade.split('.')[0];
                        file_obj['template'] = file_path;
                        file_obj['chuckName'] = chunk_name;
                        pagesArray.push(file_obj)
                    })
                }
            })
            return pagesArray;
        } catch (e) {
            console.log(获取jade文件失败)
        }
    }
}

module.exports = output;