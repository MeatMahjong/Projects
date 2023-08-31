## What is a functor?
- It is a container
- It has a way to "map" a function over itself
  - i.e. if we map a function over a list/array we get back a list/array where the function has been applied to each element
- If the mapping returns the same type (i.e. we get back an array) we can can it an "endofunctor"
- The mapping function is called "map" in Javascript

## What is a monad?
- It's just a monoid in the category of endofunctors, it's that simple! 😉
- It has a way to map a funciton over itself, but unlike functors, we don't wrap the value in a new monad -- the result is already one
- The mapping function is called "flatMap" in Javascript

For monads, you're *technically* also supposed to have a type constructor, and a type converter, but javascript doesn't really have a type system, so...

***You can look at it sort-of like replacing innerHTML vs outerHTML***
---
## Array example in Javascript

```js
function repeatOnce(x) {
  return [x,x];
}

[1,2,3].map(repeatOnce)
// [[1,1], [2,2], [3,3]]

[1,2,3].flatMap(repeatOnce)
// [1,1,2,2,3,3]
```

## Making your own monads
```js
class Maybe {
  constructor(v) { this.value = v; }
  map(f) {
    if(this.value == null) return new Maybe(null);
    return Maybe.from(f(this.value));
  }
  flatMap(f) {
    if(this.value == null) return new Maybe(null);
    return new Maybe(f(this.value));
  }
}

//Example of how you can use the Maybe monad.
//Verify password here returns a function. This is a way to achieve currying in javascript. 
//In some languages just calling a function without all its arguments will return a function that takes the remaining arguments.
function getUserSecret(username, password) {
  return getUser("username")
    .flatMap(verifyPassword("password"))
    .flatMap(getSecret);
}

//How the imperative code would look instead
function getUserSecret(username, password) {
  let user = getUser("username");
  if(!user) return;
  let verified = verifyPassword(user, password);
  if(!verified) return;
  return getSecret(verified);
}
```
