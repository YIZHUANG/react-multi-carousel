# Flickering issues in infinite mode.

This is a common issue in all of the Carousel components that supports infinite mode.

I have introduced some fixes previously for this can be found at the [Changelog](https://github.com/YIZHUANG/react-multi-carousel/blob/master/CHANGELOG.md). However if still, you encounter flickering issues, try the following:

Consider the following structure:
```
<Carousel>
  <div className='item'>
  Item 1
  </div>
  <div className='item'>
  Item 2
  </div>
</Carousel>
```

Add the following to your CSS should fix the problem:
```
.item {
  -webkit-perspective: 2000;
  -webkit-backface-visibility: hidden;
}
```
