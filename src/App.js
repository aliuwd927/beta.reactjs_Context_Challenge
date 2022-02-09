import { useState } from "react";
import { places } from "./data.js";
import { getImageUrl } from "./utils.js";
import { useContext } from "react";
import { imageSizeContext } from "./Context.js";

/*
  Remove the imageSize prop, and instead 
  pass it from the App component directly 
  to PlaceImage.

*/

export default function App() {
  const [isLarge, setIsLarge] = useState(false);
  //now reads deaful of 100
  const imageSize = useContext(imageSizeContext);
  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={isLarge}
          onChange={(e) => {
            setIsLarge(e.target.checked);
          }}
        />
        Use large images
      </label>
      <hr />
      <List imageSize={imageSize} isLarge={isLarge} />
    </>
  );
}

function List({ imageSize, isLarge }) {
  const listItems = places.map((place) => (
    <li key={place.id}>
      <imageSizeContext.Provider value={isLarge ? imageSize + 50 : imageSize}>
        <Place place={place} />
      </imageSizeContext.Provider>
    </li>
  ));
  return <ul>{listItems}</ul>;
}

function Place({ place }) {
  return (
    <>
      <PlaceImage place={place} />
      <p>
        <b>{place.name}</b>
        {": " + place.description}
      </p>
    </>
  );
}

function PlaceImage({ place }) {
  const imageSize = useContext(imageSizeContext);
  return (
    <img
      src={getImageUrl(place)}
      alt={place.name}
      width={imageSize}
      height={imageSize}
    />
  );
}
