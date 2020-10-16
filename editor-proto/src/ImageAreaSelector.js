import React, { useState, useRef, useEffect } from 'react';

function ImageAreaSelector({ imgUrl, width, areas, onNewAreaAdded, onDeleteArea }) {
    // var [height, setHeight] = useState(100);
    var [image, setImage] = useState(null);
    var [imageLoaded, setImageLoaded] = useState(false);
    var [isMouseDown, setIsMouseDown] = useState(false);
    var [selectionX, setSelectionX] = useState(0);
    var [selectionY, setSelectionY] = useState(0);
    var [selectionWidth, setSelectionWidth] = useState(0);
    var [selectionHeight, setSelectionHeight] = useState(0);
    var [highlightedArea, setHighlightedArea] = useState(-1);
    var canvasRef = useRef(null);

    if (!image) {
        image = new Image();
        image.src=imgUrl;
        image.onload = () => {
            setImageLoaded(true);
        }
        setImage(image);
    }

    var coeffOrigImageToScreenCoords = (width * 1.0 / image.width);

    var height = 100;
    const render = () => {
        if (canvasRef && canvasRef.current && image && image.width && image.height && imageLoaded) {
            var context = canvasRef.current.getContext("2d");
            height = parseInt(image.height * coeffOrigImageToScreenCoords);
            context.drawImage(image, 0, 0, image.width, image.height, 0, 0, width, height);

            areas.forEach((a, idx) => {
                context.fillStyle = idx == highlightedArea ? 'rgba(255, 255, 0, 0.7)' : 'rgba(255, 255, 0, 0.5)';
                context.fillRect(a.x*coeffOrigImageToScreenCoords, a.y*coeffOrigImageToScreenCoords, a.width*coeffOrigImageToScreenCoords, a.height*coeffOrigImageToScreenCoords);
            });

            if (isMouseDown) {
                context.fillStyle = 'rgba(255, 255, 255, 0.5)';
                context.fillRect(selectionX, selectionY, selectionWidth, selectionHeight);
            }
        }
    };
    render();

    function getCursorPosition(canvas, event) {
        const rect = canvas.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        return [x, y]
    }

    const handleMouseMove = (e) => {
        var [x, y] = getCursorPosition(canvasRef.current, e);
        if (isMouseDown) {
            setSelectionWidth(x - selectionX);
            setSelectionHeight(y - selectionY);
        }
    }

    const handleMouseDown = (e) => {
        var [x, y] = getCursorPosition(canvasRef.current, e);
        setIsMouseDown(true);
        setSelectionX(x);
        setSelectionY(y);
        setSelectionHeight(0);
        setSelectionWidth(0);
    }

    const handleMouseUp = (e) => {
        if (height > 10 && width > 10) {
            onNewAreaAdded({
                x: parseInt(selectionX / coeffOrigImageToScreenCoords),
                y: parseInt(selectionY / coeffOrigImageToScreenCoords),
                width: parseInt(selectionWidth / coeffOrigImageToScreenCoords),
                height: parseInt(selectionHeight / coeffOrigImageToScreenCoords)
            })
        }
        setIsMouseDown(false);
    }

    const handleMouseOut = (e) => {
        setIsMouseDown(false);
    }

    const handleMouseOverArea = (areaIdx) => {
        setHighlightedArea(areaIdx);
    }

    const handleMouseOutArea = (areaIdx) => {
        setHighlightedArea(-1);
    }

    const handleDelete = (areaIdx) => {
        if (window.confirm("Delete the area?")) {
            onDeleteArea(areaIdx);
        }
    }

    useEffect(() => {
        render();
    });

    return (
        <div className="fragment_area_selector">
            <div className="canvas">
                <canvas width={width} height={height} ref={canvasRef} onMouseMove={handleMouseMove} onMouseOut={handleMouseOut} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
                </canvas>
            </div>
            <div className="area_controls">
            {areas.map((area, idx) => {
                return (<div className="item"
                             onMouseOver={(() => handleMouseOverArea(idx)).bind(this)}
                             onMouseOut={(() => handleMouseOutArea(idx)).bind(this)}
                            >
                            <div onClick={() => handleDelete(idx)}>Area {idx+1}<img src="https://github.com/stillwaiting/emptybars/raw/main/Delete-Button.png" width={16} /></div>
                    </div>)
            })}
            </div>

        </div>
    );
}

export default ImageAreaSelector;