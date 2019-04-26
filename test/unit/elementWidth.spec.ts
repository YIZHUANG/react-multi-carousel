import {
  getParitialVisibilityGutter
} from './utils';


describe('Element width', () => {
  describe('getParitialVisibilityGutter', () => {
    const responsive = {
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1,
        paritialVisibilityGutter: 30
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1,
        paritialVisibilityGutter: 50
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
      }
    }
    test('gets the correct number on client-side', () => {
      const number = getParitialVisibilityGutter(responsive, true, null, 'desktop');
      expect(number).toBe(30);
    })
    test('gets the correct number on server-side', () => {
      const number = getParitialVisibilityGutter(responsive, true, 'tablet', 'desktop');
      expect(number).toBe(30);
    })
    test('should return undefined if no paritialVisibilityGutter', () => {
      const number = getParitialVisibilityGutter(responsive, true, 'mobile');
      expect(number).toBe(undefined);
    })
  })
})
