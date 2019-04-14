# Contributing

## Infinite mode

If you are interested in contributing.

Here are a list of files/functions that are for the infinite mode only.

- throttle
- getOriginalCounterPart
- getCloneCounterPart
- getClones
- whenEnteredClones
- correctClonesPosition() in componentDidUpdate()
- setClones()

## Technical guide.

The most difficult part of building this lib is for the infinite mode. For non-infinite mode, its very easy, we simply calculate the length of the children as well as calculating the total width of the container, and then the following:

```
const width = containerWidth / this.props.children.length;
return children.map(child => <li style={{ width: width }}>{child}</li> )
```

And this is what's behind of hood pretty much.

For for the infinite mode, we need to clone the children on the client-side, the algorithm that is used in this lib can be found at `utils/clones` with the name `getClones()`.

We also need to care about the timing of canceling/enabling the animation, there are two functions for this, can be found at `utils/clones` with the name `whenEnteredClones()` and `correctClonesPosition()` in `Carousel.tsx` in the `componentDidUpdate()` method.

For server-side rendering, we use `flex-basis` to set the width of the item, and on the client-side we switch to `width`

## Locale development.

- cd app
- npm install
- npm run dev
