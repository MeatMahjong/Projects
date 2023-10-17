//This is a collection of functional programming functions/utilities

const curry = func => (...args) => {
    return args.length >= func.length
        ? func(...args)
        : (...moreArgs) => curry(func)(...args, ...moreArgs);
};

Function.prototype['∘'] = function(func) {
    return (...args) => {
        let result = func(...args);
        result = typeof result.value === 'function' 
            ? result.value() 
            : result;
        return Array.isArray(result) 
            ? this(...result) 
            : this(result);
    }
}

const add = curry((x, ...args) => {
    const result = args.map(arg => (+arg) + (+x));
    const next = (...nextArgs) => add(x, ...args, ...nextArgs);
    next.value = () => result;
    return next;
});

const div = curry((x, ...args) => {
    const result = args.map(arg => arg / x);
    const next = (...nextArgs) => div(x, ...args, ...nextArgs);
    next.value = () => result;
    return next;
});

const addTwice = curry((x, ...args) => (add(x))['∘'](add(x))(...args));
const addDiv = curry((x, ...args) => (add(x))['∘'](div(x))(...args));