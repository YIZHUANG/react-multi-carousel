import { populatePreviousSlides } from './utils';

describe('Previous functionality', () => {
  test('Over sliding', () => {
    const state = {
      slidesToShow: 3,
      currentSlide: 2,
      itemWidth: 250,
      totalItems: 8,
      slidesHavePassed: 2
    }
    const props = {
      slidesToSlide: 1
    }
    const results = populatePreviousSlides(state, props);
    expect(results).toEqual({
      nextSlides: 1,
      nextPosition: -250
    })
  })
  test('Over sliding, and we are at the beginning of the slides, it should stop the function from running', () => {
    const state = {
      slidesToShow: 3,
      currentSlide: 0,
      itemWidth: 250,
      totalItems: 8,
      slidesHavePassed: 4
    }
    const props = {
      slidesToSlide: 1
    }
    const results = populatePreviousSlides(state, props);
    expect(results).toEqual({
      nextSlides: undefined,
      nextPosition: undefined
    })
  })
  test('Sliding normally', () => {
    const state = {
      slidesToShow: 3,
      currentSlide: 6,
      itemWidth: 250,
      totalItems: 8,
      slidesHavePassed: 2
    }
    const props = {
      slidesToSlide: 1
    }
    const results = populatePreviousSlides(state, props);
    expect(results).toEqual({
      nextSlides: 5,
      nextPosition: -1250
    })
  })
})
