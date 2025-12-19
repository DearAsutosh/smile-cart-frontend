import { useState } from "react";

import classNames from "classnames";
// import { Left, Right } from "neetoicons";
// import { Button } from "neetoui";

const Carousel = ({ imageUrls, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // const handleNext = () => {
  //   setCurrentIndex((currentIndex + 1) % imageUrls.length);
  // };

  // const handlePrevious = () => {
  //   setCurrentIndex((currentIndex - 1 + imageUrls.length) % imageUrls.length);
  // };

  return (
    <div className="flex flex-col items-center">
      <img alt={title} src={imageUrls[currentIndex]} />
      <div className="mt-2 flex space-x-1 ">
        {imageUrls.map((_, index) => (
          <span
            key={index}
            className={classNames(
              "neeto-ui-border-black neeto-ui-rounded-full h-3 w-3 cursor-pointer border",
              { "neeto-ui-bg-black": index === currentIndex }
            )}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};
export default Carousel;
