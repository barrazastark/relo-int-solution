import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";

import { SET_BOUNDING_BOX } from "../redux/actions";
import { RootState } from "../redux/reducers";

type Props = {
  imgSrc?: string | null;
}

export type BoundingBox = {
  topLeftX: number;
  topLeftY: number;
  width: number;
  height: number;
}

export const ImageCanvas = ({
  imgSrc
}: Props) => {
  const boundingBox = useSelector((state: RootState) => state.appState.boundingBoxes);
  const dispatch = useDispatch();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false)
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [currentPoint, setCurrentPoint] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx || !imgSrc) {
      return;
    }

    const img = new Image();
    img.src = imgSrc;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // Redraw existing boundingbox
      if (boundingBox) {
        ctx.strokeStyle = "red";
        ctx.beginPath();
        ctx.rect(boundingBox.topLeftX, boundingBox.topLeftY, boundingBox.width, boundingBox.height);
        ctx.stroke();
      }
        
    };
  }, [imgSrc, boundingBox]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx || !imgSrc) {
      return;
    }

    const img = new Image();
    img.src = imgSrc;

    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);

      // Redraw existing boundingbox
        if (boundingBox) {
          ctx.strokeStyle = "red";
          ctx.beginPath();
          ctx.rect(boundingBox.topLeftX, boundingBox.topLeftY, boundingBox.width, boundingBox.height);
          ctx.stroke();
        }
     

      if (isDrawing) {
        const rectWidth = currentPoint.x - startPoint.x;
        const rectHeight = currentPoint.y - startPoint.y;
        ctx.strokeStyle = "red";
        ctx.beginPath();
        ctx.rect(startPoint.x, startPoint.y, rectWidth, rectHeight);
        ctx.stroke();
      }
    };
  }, [isDrawing, startPoint, currentPoint, imgSrc, boundingBox]);

  

  const handleMouseDown = (e: React.MouseEvent) => {
    setStartPoint({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
    setCurrentPoint({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
    setIsDrawing(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDrawing) {
      setCurrentPoint({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
    }
  };

  const handleMouseUp = () => {
    if (isDrawing) {
      const rectWidth = currentPoint.x - startPoint.x;
      const rectHeight = currentPoint.y - startPoint.y;
      const boundingBox = {
        topLeftX: startPoint.x,
        topLeftY: startPoint.y,
        width: rectWidth,
        height: rectHeight
      }
      dispatch({ type: SET_BOUNDING_BOX, payload: boundingBox})
      setIsDrawing(false);
    }
  };

  return (
    <div className="image-container">
      <canvas 
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      />
    </div>
  )
}