import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";

import { SET_IMAGES } from "../redux/actions";
import { RootState } from "../redux/reducers";
import { useFetch } from "../hooks/useFetch";

export type Image = {
  id: number;
  url: string;
}

export const ImagesQueue = () => {
  const dispatch = useDispatch();
  const proccesedImages = useSelector((state: RootState) => state.appState.processedImages);
  const { data: images, loading, error } = useFetch({
    endpoint: "https://5f2f729312b1481b9b1b4eb9d00bc455.api.mockbin.io/unanalyzed-images",
  });
  const imagesInQueue = images.filter(i => !proccesedImages.includes(i.id) );

  useEffect(() => {
    if (images.length) {
      dispatch({ type: SET_IMAGES, payload: images });
    }
  }, [dispatch, images]);

  if (loading) {
    return <p>Loading images...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <div className="image-queue">
        <h2>Next images in queue:</h2>
        <ul className="queue-list">
          {imagesInQueue.map(i => (
            <li key={i.id} className="queue-item">
              <img src={i.url} alt={`Id: ${i.id}`} />
            </li>
          ))}
        </ul>
    </div>
  )
}