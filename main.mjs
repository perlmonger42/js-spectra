import { parse } from "./parse.mjs";
import "./tokens.mjs";

// Make a new object that inherits members from an existing object.

if (typeof Object.create !== "function") {
    Object.create = function (o) {
        function F() {}
        F.prototype = o;
        return new F();
    };
}

// Transform a token object into an exception object and throw it.

Object.prototype.error = function (message, t) {
    t = t || this;
    t.name = "SyntaxError";
    t.message = message;
    throw t;
};


(function () {
    function go(source) {
        var string, tree;

        try {
            tree = parse(source);
            string = JSON.stringify(tree, [
                "key", "name", "message", "value",
                "arity", "first", "second", "third", "fourth"
            ], 4);
        } catch (e) {
            string = JSON.stringify(e, [
                "name", "message", "from", "to", "key",
                "value", "arity", "first", "second", "third", "fourth"
            ], 4);
        }
        console.log(string);
    }

    go("var parse = " +
        (parse.toSource ? parse.toSource() : parse.toString()) + ";");
}());
