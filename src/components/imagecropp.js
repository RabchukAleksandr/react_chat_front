// import React, {createRef, useEffect, useRef, useState} from "react";
// import Popup from 'reactjs-popup';
// import classes from "../styles/imagecropp.module.css"
// import ReactCrop from 'react-image-crop'
//
// import 'react-image-crop/dist/ReactCrop.css';
//
// const ImageCropp = ({show, onHide, imageData}) => {
//
//     const canvasRefImg = React.createRef()
//     const [crop, setCrop] = useState({
//         aspect: 1 / 1,
//         unit: 'px',
//     })
//     const image64toCanvasRef = (canvasRef, image64, pixelCrop, imgRef) => {
//         const canvas = canvasRef
//
//         canvas.width = pixelCrop.width
//         canvas.height = pixelCrop.height
//
//         const scaleX = imgRef.naturalWidth / imgRef.width;
//         const scaleY = imgRef.naturalHeight / imgRef.height;
//
//         const ctx = canvas.getContext('2d')
//         const image = new Image()
//         image.src = image64
//         image.onload = function () {
//             ctx.drawImage(
//                 image,
//                 pixelCrop.x * scaleX,
//                 pixelCrop.y * scaleY,
//                 pixelCrop.width * scaleX,
//                 pixelCrop.height * scaleY,
//                 0,
//                 0,
//                 pixelCrop.width,
//                 pixelCrop.height
//             )
//         }
//
//
//     }
//     function getCroppedImg(image, pixelCrop, fileName,canvasRef) {
//
//         const canvas = canvasRef
//         canvas.width = pixelCrop.width;
//         canvas.height = pixelCrop.height;
//         const ctx = canvas.getContext('2d');
//
//         ctx.drawImage(
//             image,
//             pixelCrop.x,
//             pixelCrop.y,
//             pixelCrop.width,
//             pixelCrop.height,
//             0,
//             0,
//             pixelCrop.width,
//             pixelCrop.height
//         );
//
//         return new Promise((resolve, reject) => {
//             canvas.toBlob(blob => {
//                 blob.name = fileName;
//                 resolve(blob);
//             }, 'image/jpeg');
//         });
//     }
//
//     const onImageLoaded = image => {
//         const imageRef= image;
//     }
//
//     const onCropComplete = (crop, pixelCrop) => {
//         const canvasRef = canvasRefImg.current
//         const image = imageData.file
//         const imgRef = imageRef.current
//         const fileName = "croppedimage"
//         image64toCanvasRef(canvasRef, image, crop,imgRef)
//         //getCroppedImg(image,pixelCrop,fileName,canvasRef)
//     }
//
//     const onCropChange = crop => {
//         setCrop(crop)
//     }
//
//
//     return (
//         <Popup open={show} onClose={onHide}>
//             <div>CROPP YOR IMAGE</div>
//
//             <div className={classes.originalImage}>{imageData &&
//             <ReactCrop
//                 src={imageData.file}
//                 crop={crop}
//                 onChange={onCropChange}
//                 onImageLoaded={onImageLoaded}
//                 onComplete={onCropComplete}/>}</div>
//             <div>
//                 <canvas ref={canvasRefImg}></canvas>
//                 <button>DONE</button>
//             </div>
//
//         </Popup>
//
//     )
// }


