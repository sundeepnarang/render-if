# render-ifelse
[![License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://npmjs.org/package/render-ifelse)
[![NPM version](http://img.shields.io/npm/v/render-ifelse.svg?style=flat)](https://npmjs.org/package/render-ifelse)

An extension to [render-if](https://github.com/ajwhite/render-if) 

A tiny, yet conveniently curried way to render conditional React components. Works great with both React and React Native.

```js
renderIfElse(predicate)(elementOnTrue[,elementOnFalse])
```



## What it looks like

`renderIfElse` is a curried function that takes a predicate and returns a function accepting two elements, first of them will only be returned if the predicate is satisfied, else second is returned.
The function returned by `renderIfElse` will also accept parameterless functions which will be invoked similarly, if the predicate is satisfied, first argument is invoked, else second is invoked, allowing for lazy evaluation of inner JSX.

```js
renderIfElse(1 + 1 === 2)(
  <Text>Hello World!</Text>, <Text>Hello, Non-Decimal World!</Text>
)
```

### As an in-line expression

```jsx
class MyComponent extends Component {
  render() {
    return (
      {renderIfElse(1 + 2 === 3)(
        <span>The universe is working</span>,<span>The universe is broken</span>
      )}
    );
  }
}
```

### As a lazy in-line expression

```jsx
class MyComponent extends Component {
  render() {
    return (
      {renderIfElse(1 + 2 === 3)(
          () => (
            <span>This is only invoked if the universe is working</span>
          ),
          () => (
            <span>This is only invoked if the universe is broken</span>
          )
      )}
    );
  }
}
```

### As a named function

```jsx
class MyComponent extends Component {
  render() {
    const isTheUniverseIsWorking = renderIfElse(1 + 2 === 3);
    return (
      {isTheUniverseIsWorking(
        <span>The universe is still wroking</span>,
        <span>The universe is not wroking</span>
      )}
    )
  }
}
```

### As a composed function
```jsx
const isEven = number => renderIfElse(number % 2 === 0);

class MyComponent extends Component {
  render() {
    return (
      {isEven(this.props.count)(
        <span>{this.props.count} is even</span>,
        <span>{this.props.count} is odd</span>
      )}
    );
  }
}
```

## What it no longer looks like

```jsx
class MyComponent extends Component {
  render() {
    var conditionalOutput;
    if (1 + 1 === 2) {
      conditionalOutput = <span>I am rendered!</span>;
    } else {
      conditionalOutput = <span>I am not rendered :(</span>;
    }
    return (
      <div>
        <!-- this works, but it can get ugly -->
        {conditionalOutput}
        {1 + 1 === 2 && <span>I am rendered!</span>}
        {this.anotherConditionalRender()}
      </div>
    );
  }
  anotherConditionalRender() {
    if (1 + 1 === 2) {
      return <span>I am rendered!</span>
    }
  }
}
```
