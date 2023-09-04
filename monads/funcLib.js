//This is a collection of functional programming functions/utilities

Array.prototype.get = function (...indices) {
    const getValue = (array, [index, ...restIndices]) =>
        index === undefined
            ? array
            : restIndices.length === 0
            ? array[index]
            : getValue(array[index], restIndices);

    const partial = (...args) => getValue(this, [...indices, ...args]);

    return partial;
};

const curry = func => (...args) => {
    return args.length >= func.length
        ? func(...args)
        : (...moreArgs) => curry(func)(...args, ...moreArgs);
};

Function.prototype['∘'] = function(func) {
    return (...args) => {
        const result = func(...args);
        if (Array.isArray(result)) {
            return this(...result);
        } else {
            return this(result);
        }
    };
};


const add = curry((d, ...args) => {
    const result = args.map(arg => arg + d);
    const next = (...nextArgs) => add(d, ...args, ...nextArgs);
    next.value = () => result;
    return next;
});


const div = curry((d, ...args) => {
    const result = args.map(arg => arg / d);
    const next = (...nextArgs) => div(d, ...args, ...nextArgs);
    next.value = () => result;
    return next;
});

const addDiv = curry((d, ...args) => {
    const result = (add(d))['∘'](div(d))(...args);
  
    const next = (...nextArgs) => {
      const composedResult = result(...nextArgs);
      if (typeof composedResult === 'function') {
        return addDiv(d, ...args, ...composedResult());
      }
      return addDiv(d, ...args, composedResult);
    };
  
    next.value = () => result.value();
    return next;
  });
  
  
  
  

const addDiv = curry((d, ...args) =>  (add(d))['∘'](div(d))(...args));
