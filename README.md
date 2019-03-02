# react-multi-carousel

## Install

```
$ npm install react-multi-carousel --save
```

### Limitations.

```
It works if you don't ask for too much.
```

## Demo.

Demo can be found at [here](http://www.yizhuang.fi/).

## Props
```
responsive: responsiveType;
deviceType?: string;
forSSR?: boolean;
slidesToSlide?: number; // number of slides on each slide.
disableDrag?: boolean; // for desktop
removeArrow?: boolean;
disableSwipeOnMobile?: boolean;
removeArrowOnDeviceType?: string | Array<string>;
children: React.ReactNode | null;
customLeftArrow?: React.ReactElement<any> | null;
customRightArrow?: React.ReactElement<any> | null;
infinite?: boolean;
contentClassName?: string;
itemClassName?:string;
containerClassName?: string;
transition?:string;
```
## Examples

```
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};
<Carousel
  disableSwipeOnMobile
  disableDrag
  responsive={responsive}
  forSSR
  slidesToSlide={2}
  infinite={true}
  className='test'
  removeArrowOnDeviceType={['tablet', 'mobile']}
  deviceType={this.props.deviceType}
>
  {fakerData.map(card => {
    return <Card {...card} />;
  })}
</Carousel>
```
