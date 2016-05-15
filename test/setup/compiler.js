var fs = require('fs');
var path = require('path');
var babel = require('babel-core');
var origJs = require.extensions['.js'];
require('babel-core/register');

require.extensions['.js'] = function (module, fileName) {
    var output;
    if (fileName.indexOf('node_modules/react-native-autocomplete/RCTAutoComplete.ios.js') >= 0) {
        fileName = path.resolve('./test/setup/mock.js');
    }
    else if (fileName.indexOf('node_modules/react-native/Libraries/react-native/react-native.js') >= 0) {
        fileName = path.resolve('./test/setup/mock.js');
    }
    else if (fileName.indexOf('node_modules/') >= 0) {
        return (origJs || require.extensions['.js'])(module, fileName);
    }
    var src = fs.readFileSync(fileName, 'utf8');
    output = babel.transform(src, {
        filename: fileName
    }).code;

    return module._compile(output, fileName);
};


// var fs = require('fs');
// var path = require('path');
// var babel = require('babel-core');
// var origJs = require.extensions['.js'];
// require('babel-core/register');
//
// require.extensions['.js'] = function (module, fileName) {
//     var output;
//     console.log(fileName);
//     if (fileName.indexOf('node_modules/react-native-autocomplete/RCTAutoComplete.ios.js') >= 0) {
//         fileName = path.resolve('./test/setup/mock.js');
//     }
//     if (fileName.indexOf('node_modules/') >= 0) {
//         if(fileName.indexOf('AutoComplete')>=0) {
//             console.log(fileName.indexOf('react-native-autocomplete'));
//             return (origJs || require.extensions['.js'])(module, fileName);
//         }
//     } else {
//         // fileName = path.resolve('./test/setup/mock.js');
//     }
//     var src = fs.readFileSync(fileName, 'utf8');
//     output = babel.transform(src, {
//         filename: fileName
//     }).code;
//
//     return module._compile(output, fileName);
// };