import _loadScript from 'load-script';
// 加载`javascript`脚本文件
export function loadScript(url) {
    return new Promise((resolve, reject) => {
        _loadScript(url, (error, script) => {
            if (error) {
                return reject(error);
            }
            resolve(script);
        });
    });
}
export default loadScript;