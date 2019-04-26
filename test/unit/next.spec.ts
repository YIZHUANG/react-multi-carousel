import { populateNextSlides } from './utils';


describe('Next', () => {
  test('Over sliding', () => {
    const state = {
      slidesToShow: 3,
      currentSlide: 3,
      itemWidth: 250,
      totalItems: 8,
      slidesHavePassed: 2
    }
    const props = {
      slidesToSlide: 1
    }
    const results = populateNextSlides(state, props);
    expect(results).toEqual({
      nextSlides: 4,
      nextPosition: -1000
    })
  })
  test('Over sliding, and we are at the end of the slides, it should stop the function from running', () => {
    const state = {
      slidesToShow: 3,
      currentSlide: 5,
      itemWidth: 250,
      totalItems: 8,
      slidesHavePassed: 2
    }
    const props = {
      slidesToSlide: 1
    }
    const results = populateNextSlides(state, props);
    expect(results).toEqual({
      nextSlides: undefined,
      nextPosition: undefined
    })
  })
  test('Sliding normally', () => {
    const state = {
      slidesToShow: 3,
      currentSlide: 1,
      itemWidth: 250,
      totalItems: 8,
      slidesHavePassed: 2
    }
    const props = {
      slidesToSlide: 1
    }
    const results = populateNextSlides(state, props);
    expect(results).toEqual({
      nextSlides: 2,
      nextPosition: -500
    })
  })
})
