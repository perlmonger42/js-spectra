import { make_parse } from './parse.mjs';
import './tokens.mjs';

/*jslint evil: true */

/*members create, error, message, name, prototype, stringify, toSource,
    toString, write
*/

/*global JSON, make_parse, parse, source, tree */

// Make a new object that inherits members from an existing object.

if (typeof Object.create !== 'function') {
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
    var parse = make_parse();

    function go(source) {
        var string, tree;
        try {
            tree = parse(source);
            string = JSON.stringify(tree, ['key', 'name', 'message',
                'value', 'arity', 'first', 'second', 'third', 'fourth'], 4);
        } catch (e) {
            string = JSON.stringify(e, ['name', 'message', 'from', 'to', 'key',
                    'value', 'arity', 'first', 'second', 'third', 'fourth'], 4);
        }
        console.log(string);
    }

    go("var make_parse = " + (make_parse.toSource ?
            make_parse.toSource() : make_parse.toString()) + ";");
}());
