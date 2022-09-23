"use strict";
exports.__esModule = true;
function default_1(str) {
    return new Promise(function (next, error) {
        try {
            var input = document.createElement("input");
            document.body.appendChild(input);
            input.value = str;
            input.select();
            document.execCommand('copy');
            document.body.removeChild(input);
            next(true);
        }
        catch (e) {
            error(e);
        }
    });
}
exports["default"] = default_1;
