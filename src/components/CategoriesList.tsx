import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux";

import type { RootState } from "../redux/reducers";
import type { BoundingBox } from "./ImageCanvas"
import type { Image } from "./ImagesQueue";
import { SET_BOUNDING_BOX, SET_IMAGE_INDEX } from "../redux/actions";
import { useFetch } from "../hooks/useFetch";

type BodyRequest = {
  imageId: number;
  annotations: Array<{
    categoryId: number;
    boundingBoxes: Array<BoundingBox>
  }>
}

type Props = {
  mainImage: Image;
  imageIndex: number;
}

export const CategoriesList  = ({
  mainImage,
  imageIndex
}: Props) => {
  const dispatch = useDispatch();
  const boundingBox = useSelector((state: RootState) => state.appState.boundingBoxes);
  const [categoryIdSelected, setCategoryIdSelected] = useState<null | number>(null);
  const { data: categories, loading, error } = useFetch({
    endpoint: "https://f6fe9241e02b404689f62c585d0bd967.api.mockbin.io/categories",
  })

  const handleClick = (id: number) => {
    setCategoryIdSelected(id);
  }

  const sendRequest = async (body: BodyRequest, successMessage: string) => {
    try {
      const response = await fetch("https://eb1b6f8bfab448df91c68bd442d6a968.api.mockbin.io/annotations", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      });

      if (response.ok) {
        setCategoryIdSelected(null);
        dispatch({ type: SET_BOUNDING_BOX, payload: null });
        dispatch({ type: SET_IMAGE_INDEX, payload: imageIndex + 1 });
        alert(successMessage);
      }
      else {
        throw new Error("Error while submitting")
      }
    }
    catch(e) {
      alert(e instanceof Error ? e.message : e)
    }
  }

  const onConfirm = async () => {
    if (mainImage && boundingBox && categoryIdSelected) {
      sendRequest({
        imageId: mainImage.id,
        annotations: [
          {
            categoryId: categoryIdSelected,
            boundingBoxes: [boundingBox],
          }
        ]
      }, "Submitted correctly")
    }
  }

  const onDiscard = async () => {
    if (mainImage) {
      sendRequest({
        imageId: mainImage.id,
        annotations: [],
      }, "Discarded correctly")
    }
  }

  if (loading) {
    return <p>Loading categories...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <div className="sidebar">
      <ul className="options-list">
        {categories.map(c => (
          <li 
            className={c.id === categoryIdSelected ? "highlight" : ""} 
            key={c.id} 
            value={c.id} 
            onClick={() => handleClick(c.id)}
          >
            {c.name}
          </li>
        ))}
      </ul>
      <div className="buttons">
        <button onClick={onDiscard}>Discard</button>
        <button disabled={!categoryIdSelected || !boundingBox} onClick={onConfirm}>Confirm</button>
      </div>
    </div>
  )

}