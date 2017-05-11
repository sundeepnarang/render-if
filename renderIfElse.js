'use strict';

const isFunction = input => typeof input === 'function';

export default predicate => (elemOrThunk,elseElemOrThunk = null) =>
    predicate ? (isFunction(elemOrThunk) ? elemOrThunk() : elemOrThunk) : (isFunction(elseElemOrThunk) ? elseElemOrThunk() : elseElemOrThunk);

