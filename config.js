/**
 * 小程序配置文件
 */

var host = "localhost:18080/booth"

var config = {

    host,

    // 测试的请求地址，用于测试会话
    requestUrl: `http://${host}/`
};

module.exports = config