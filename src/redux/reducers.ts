import { combineReducers } from "redux";
import { SET_BOUNDING_BOX, SET_IMAGE_INDEX, SET_IMAGES } from "./actions";

import type { BoundingBox } from "../components/ImageCanvas";
import type { Image } from "../components/ImagesQueue";

// Define State Type
export interface AppState {
  boundingBoxes: BoundingBox | null;
  imageIndex: number;
  images: Image[];
  processedImages: number[];
}

// Initial State
const initialState: AppState = {
  boundingBoxes: null,
  imageIndex: 0,
  images: [],
  processedImages: [],
};

// Reducer
const appReducer = (state = initialState, action: any): AppState => {
  switch (action.type) {
    case SET_BOUNDING_BOX:
      return {
        ...state,
        boundingBoxes: action.payload,
      };
    case SET_IMAGES:
      return {
        ...state,
        images: action.payload,
      };
    case SET_IMAGE_INDEX:
      const nextIndex = action.payload;
      const prevIndex = action.payload - 1;

      return {
        ...state,
        imageIndex: nextIndex,
        processedImages: [...state.processedImages, prevIndex],
      };
    default:
      return state;
  }
};

// Combined Reducers
const rootReducer = combineReducers({
  appState: appReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
