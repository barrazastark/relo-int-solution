import React from 'react';
import { useSelector } from 'react-redux';
import "./App.css"
import { ImageCanvas } from "./components/ImageCanvas"
import { CategoriesList } from "./components/CategoriesList"
import { ImagesQueue } from "./components/ImagesQueue"
import type { RootState } from './redux/reducers';

function App() {

  const images = useSelector((state: RootState) => state.appState.images);
  const index = useSelector((state: RootState) => state.appState.imageIndex);
  const mainImage = images[index];

  return (
    <div className='main-content'>
      <h1>Image analyzer</h1>
      <div className='analyzer-container'>
          <ImageCanvas 
            imgSrc={mainImage?.url}
          />
          <CategoriesList mainImage={mainImage} imageIndex={index} />
      </div>
      <ImagesQueue />
    </div>
  );
}

export default App;
