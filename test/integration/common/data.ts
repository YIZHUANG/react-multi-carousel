/*
longData, shortData mainly for inifinite mode.
*/

const images = [
  "https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1549396535-c11d5c55b9df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1550133730-695473e544be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1550167164-1b67c2be3973?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1550338861-b7cfeaf8ffd8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1550223640-23097fc71cb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1550353175-a3611868086b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1550330039-a54e15ed9d33?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1549737328-8b9f3252b927?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1549833284-6a7df91c1f65?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1549985908-597a09ef0a7c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1550064824-8f993041ffd3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
];
const texts = [
  "Appending currency sign to a purchase form in your e-commerce site using plain JavaScript.",
  "Fixing CSS load order/style.chunk.css incorrect in Nextjs",
  "React Carousel with Server Side Rendering Support – Part 1",
  "React Carousel with Server Side Rendering Support – Part 2",
  "Flutter Xcode couldn’t find any iOS App Development provisioning profiles",
  "Flutter Xcode couldn’t find any iOS App Development provisioning profiles",
  "Flutter Xcode couldn’t find any iOS App Development provisioning profiles",
  "Flutter Xcode couldn’t find any iOS App Development provisioning profiles",
  "Flutter Xcode couldn’t find any iOS App Development provisioning profiles",
  "Flutter Xcode couldn’t find any iOS App Development provisioning profiles",
  "Flutter Xcode couldn’t find any iOS App Development provisioning profiles",
  "Flutter Xcode couldn’t find any iOS App Development provisioning profiles"
];
const longData = Array(12)
  .fill(0)
  .map((item, index) => {
    return {
      key: images[index],
      image: images[index],
      headline: "w3js.com - web front-end studio",
      description: texts[index]
    };
  });
const shortData = Array(5)
  .fill(0)
  .map((item, index) => {
    return {
      key: images[index],
      image: images[index],
      headline: "w3js.com - web front-end studio",
      description: texts[index]
    };
  });
export { longData, shortData };
