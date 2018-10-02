var fs = require("fs");

var variants = 10;

var declarations = ["Func", "CurryFunc", "curry"];
var content = "";

for (var x = 0; x < declarations.length; x++) {
    var declaration = declarations[x];

    for (var i = 0; i < variants; i++) {
        var types = "TOut";
        var funcArgs = "";
        var curryArgs1 = "";
        var curryArgs2 = "";
    
        for (var j = 1; j <= i; j++) {
            types += (", T"+j);
    
            if (j === 1) {
                funcArgs += "a1: T1";
            } else if (j > 1) {
                funcArgs += (", a"+j+": T"+j);
            }
    
            if (j === 2) {
                curryArgs1 = "a2: T2";
            } else if (j > 2) {
                curryArgs1 += (", a"+j+": T"+j);
            }
        }
    
        if (i >= 1) {
            curryArgs2 = "a1: T1";
        }
    
        if (declaration === "Func") {
            content += "export declare type Func"+i+"<"+types+"> = ("+funcArgs+") => TOut;\n";
        } else if (declaration === "CurryFunc") {
            content += "export declare type CurryFunc"+i+"<"+types+"> = ("+curryArgs1+") => ("+curryArgs2+") => TOut;\n";
        } else {
            content += "export declare function curry<"+types+">(func: Func"+i+"<"+types+">): CurryFunc"+i+"<"+types+">;\n";
        }
    }

    content += "\n";
}

fs.writeFileSync("./dist/index.d.ts", content);