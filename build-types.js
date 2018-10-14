// This code generates index.d.ts TypeScript type definitions file.
// This script is part of library build process, executed when `npm run build` is ran.

var fs = require("fs");

var paramsVariants = 2;
var paramsCount = 10;
var declarations = ["CurryFunc", "curry"];

var content = "";

for (var declarationId = 0; declarationId < declarations.length; declarationId++) {
    var declaration = declarations[declarationId];

    var maxSecondParamsCount = paramsVariants - 1;
    for (var secondParamsCount = 0; secondParamsCount <= maxSecondParamsCount; secondParamsCount++) {
        var maxFirstParamsCount = paramsCount - secondParamsCount;
        for (var firstParamsCount = 0; firstParamsCount <= maxFirstParamsCount; firstParamsCount++) {
            var currentParamsCount = firstParamsCount + secondParamsCount;
            var types = "TOut";
            for (var i = 1; i <= currentParamsCount; i++) {
                types += ", T"+i;
            }
            
            var firstParams = "";
            for (var i = 1; i <= firstParamsCount; i++) {
                if (i === 1) {
                    firstParams += "p1: T1";
                } else {
                    firstParams += ", p"+i+": T"+i;
                }
            }

            var secondParams = "";
            for (var i = 1; i <= secondParamsCount; i++) {
                var x = i + firstParamsCount;
                if (i === 1) {
                    secondParams += "p"+x+": T"+x;
                } else {
                    secondParams += ", p"+x+": T"+x;
                }
            }

            var genericType = "CurryFunc"+firstParamsCount+"_"+secondParamsCount+"<"+types+">";

            if (declaration === "CurryFunc") {
                content += "export declare type "+genericType+" = ("+firstParams+") => ("+secondParams+") => TOut;\n";
            } else {
                content += "export declare function curry<"+types+">(func: "+genericType+"): "+genericType+";\n";
            }
        }

        content += "\n";
    }
}

fs.writeFileSync("./dist/index.d.ts", content);
