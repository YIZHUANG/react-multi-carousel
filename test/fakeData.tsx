import * as React from "react";


  const fakerData = Array(12)
    .fill(0)
    .map((item, index) => {
      return {
        image: 'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        headline: '123',
        description: '123'
      };
    });
export default fakerData;