## What is a functor?
- It is a container
- It has a way to "map" a function over itself
  - i.e. if we map a function over a list/array we get back a list/array where the function has been applied to each element
- If the mapping returns the same type (i.e. we get back an array) we can can it an "endofunctor"
- The mapping function is called "map" in javascript

## What is a monad?
- It's just a monoid in the category of endofunctors, it's that simple! 😉
- It has a way to map a funciton over itself, but unlike functors, we don't wrap the value in a new monad -- the result is already one
- The mapping function is called "flatMap" in javascript

---

***You can look at it sort-of like replacing innerHTML vs outerHTML***

```js
repeatOnce = (x) => [x,x]

[1,2,3].map(repeatOnce)
// [[1,1], [2,2], [3,3]]

[1,2,3].flatMap(repeatOnce)
// [1,1,2,2,3,3]
```
