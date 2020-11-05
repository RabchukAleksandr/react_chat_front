import React from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import classes from "../styles/imagecropp.module.css"
import Popup from "reactjs-popup";
import {Button} from "@material-ui/core"
import {Save} from '@material-ui/icons';

class ImageCropper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            src: this.props.imageData.file,
            crop: {
                unit: 'px',
                aspect: 1/1,
            },
        };
    }


    onImageLoaded = image => {
        this.imageRef = image
    }

    onCropChange = (crop) => {
        this.setState({ crop });
    }

    onCropComplete = crop => {
        this.makeClientCrop(crop);
    }
    async makeClientCrop(crop) {
        if (this.imageRef && crop.width && crop.height) {
            const croppedImageUrl = await this.getCroppedImg(
                this.imageRef,
                crop,
                'newFile.jpeg'
            );
            this.setState({ croppedImageUrl });
        }
    }
    getCroppedImg(image, crop,fileName) {
        const canvas = document.createElement("canvas");
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext("2d");

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        )

        const reader = new FileReader()
        canvas.toBlob(blob => {
            reader.readAsDataURL(blob)
            reader.onloadend = () => {
                this.dataURLtoFile(reader.result, 'cropped.jpg')
            }
        })

        return new Promise((resolve, reject) => {
            canvas.toBlob(blob => {
                if (!blob) {
                    //reject(new Error('Canvas is empty'));
                    console.error('Canvas is empty');
                    return;
                }
                blob.name = fileName;
                window.URL.revokeObjectURL(this.fileUrl);
                this.fileUrl = window.URL.createObjectURL(blob);
                resolve(this.fileUrl);
            }, 'image/jpeg');
        });
    }

    dataURLtoFile(dataurl, filename) {
        let arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);

        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        let croppedImage = new File([u8arr], filename, {type:mime});
        this.setState({croppedImage: croppedImage })
    }


    render() {
        const { crop, croppedImage,croppedImageUrl,src } = this.state;

        return (
            <>
                <Popup open={this.props.show} onClose={()=>{
                    this.props.onHide()
                    this.props.clearFileData()
                }}>
                <div>{src && (
                    <ReactCrop
                        className={classes.originalImage}
                        src={src}
                        crop={crop}
                        ruleOfThirds
                        onImageLoaded={this.onImageLoaded}
                        onComplete={this.onCropComplete}
                        onChange={this.onCropChange}
                        minHeight={100}
                        maxHeight={200}
                    />
                )}</div>
                <div>
                    {croppedImageUrl && (
                    <img className={classes.imagePreview} alt="Crop" src={croppedImageUrl} />
                )}</div>
                    <div>
                        <Button  variant="contained"
                                 disabled={!croppedImageUrl}
                                 style={{background:"#daadf1"}}
                                 size="small"
                                 startIcon={<Save/>}
                                 onClick={()=>{
                            this.props.passCroppedImage(croppedImage)
                            this.props.onHide()
                            this.props.clearFileData()
                        }}>Cropp</Button>
                    </div>
                    </Popup>
            </>
        );
    }
}
export default ImageCropper