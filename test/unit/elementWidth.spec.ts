import {
  getPartialVisibilityGutter
} from './utils';


describe('Element width', () => {
  describe('getPartialVisibilityGutter', () => {
    const responsive = {
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1,
        partialVisibilityGutter: 30
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1,
        partialVisibilityGutter: 50
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
      }
    }
    test('gets the correct number on client-side', () => {
      const number = getPartialVisibilityGutter(responsive, true, null, 'desktop');
      expect(number).toBe(30);
    })
    test('gets the correct number on server-side', () => {
      const number = getPartialVisibilityGutter(responsive, true, 'tablet', 'desktop');
      expect(number).toBe(30);
    })
    test('should return undefined if no partialVisibilityGutter', () => {
      const number = getPartialVisibilityGutter(responsive, true, 'mobile');
      expect(number).toBe(undefined);
    })
  })
})
