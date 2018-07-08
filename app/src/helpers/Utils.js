String.prototype.format = function () {
    var a = this;
    for (var k in arguments) {
        a = a.replace("{" + k + "}", arguments[k])
    }
    return a;
}

export const AppSetting = {
    host: 'http://localhost:8080/'
}