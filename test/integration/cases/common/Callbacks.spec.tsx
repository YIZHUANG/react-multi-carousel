import * as React from "react";
import { configure, mount, ReactWrapper } from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

import Carousel from "../../../../lib/Carousel";
import Card from "../../components/Card";
import { responsive1 } from "../../common/responsive";
import { longData } from "../../common/data";

jest.useFakeTimers();

describe("Callbacks", () => {
  const beforeChange = jest.fn();
  const afterChange = jest.fn();

  let wrapper!: ReactWrapper<{}, {}, Carousel>;
  beforeEach(() => {
    beforeChange.mockClear();
    afterChange.mockClear();

    wrapper = mount(
      <Carousel
        responsive={responsive1}
        beforeChange={beforeChange}
        afterChange={afterChange}
      >
        {longData.map(card => (
          <Card {...card} />
        ))}
      </Carousel>
    );
  });

  it("calls beforeChange and afterChange", () => {
    wrapper.instance().goToSlide(1);
    jest.runOnlyPendingTimers();
    expect(beforeChange).toHaveBeenCalledTimes(1);
    expect(afterChange).toHaveBeenCalledTimes(1);
  });

  it("it skips callbacks as expected", () => {
    wrapper.instance().goToSlide(1, true);
    jest.runOnlyPendingTimers();
    expect(beforeChange).toHaveBeenCalledTimes(0);
    expect(afterChange).toHaveBeenCalledTimes(0);
  });

  describe("skipping individual callbacks", () => {
    it("it skips beforeChange callbacks as expected", () => {
      wrapper.instance().goToSlide(1, { skipBeforeChange: true });
      jest.runOnlyPendingTimers();
      expect(beforeChange).toHaveBeenCalledTimes(0);
      expect(afterChange).toHaveBeenCalledTimes(1);
    });

    it("it skips afterChange callbacks as expected", () => {
      wrapper.instance().goToSlide(1, { skipAfterChange: true });
      jest.runOnlyPendingTimers();
      expect(beforeChange).toHaveBeenCalledTimes(1);
      expect(afterChange).toHaveBeenCalledTimes(0);
    });
  });
});
