import React from 'react';
import { useRef, useState } from 'react';
import ImageAreas from "./ImageAreas";

import './FragmentPages.scss';

function FragmentPages({ images, pages, fragmentPages, fragmentPageAreas }) {
    const [zoom, setZoom] = useState(1);
    const [lastScrollHash, setLastScrollHash] = useState("");
    const fragmentPagesRef = useRef();

    const handleZoomIn = () => {
        setZoom(zoom + 0.1);
    }

    const handleZoomOut = () => {
        setZoom(zoom - 0.1);
    }

    const handleReset = () => {
        setZoom(1);
    }

    const findFirstSelectedPageIdx = () => {
        var selectedPageIdx = -1;
        for (var idx = 0; idx < pages.length; idx++) {
            const puid = pages[idx].id;
            if (fragmentPageAreas[puid] && fragmentPageAreas[puid].length) {
                selectedPageIdx = idx;
                break;
            }
        }
        return selectedPageIdx;
    }

    const findScrollareaNode = () => {
        for (var i = 0; i < fragmentPagesRef.current.childNodes.length; i++) {
            if (fragmentPagesRef.current.childNodes[i].className == 'scrollArea') {
                return fragmentPagesRef.current.childNodes[i];
            }
        }
        throw 'Cannot find scrollArea';
    }

    const findPageNode = (selectedPageIdx) => {
        var container = findScrollareaNode();
        var invariant = 0;
        for (var i = 0; i < container.childNodes.length; i++) {
            if (container.childNodes[i].className == "page") {
                if (invariant == selectedPageIdx) {
                    return container.childNodes[i];
                }
                invariant ++;
            }
        }
        throw "cannot find page " + selectedPageIdx;
    }

    const calculatePageHeight = () =>
        parseInt(500*zoom*297/210 + 20);

    const calculatePageWidth = () =>
        parseInt(500*zoom + 20);

    const hash = JSON.stringify(fragmentPageAreas);
    if (lastScrollHash != hash && fragmentPagesRef.current) {
        setLastScrollHash(hash);
        const selectedPageIdx = findFirstSelectedPageIdx();
        if (selectedPageIdx >= 0) {
            var page = findPageNode(selectedPageIdx);
            fragmentPagesRef.current.scrollTop = page.offsetTop - findScrollareaNode().offsetTop;
            if (Object.keys(fragmentPageAreas).length > 1) {
                fragmentPagesRef.current.scrollTop += parseInt(calculatePageHeight() / 2);
            }
        }
    }

    const fragmentPagesStyles = {
        height: calculatePageHeight() + "px",
        width: calculatePageWidth() + "px"
    }

    return <div>
        <div className='fragmentPages' ref={fragmentPagesRef} style={fragmentPagesStyles}>
            <div className='zoom'>
                <img src='https://images2.imgbox.com/22/21/4gO3I6ii_o.png?download=true' width='32' onClick={handleZoomIn} />
                <img src='https://images2.imgbox.com/1b/b2/L4tgMq2a_o.png?download=true' width='32' onClick={handleZoomOut} />
                <img src='https://images2.imgbox.com/f3/d5/paRxNKm0_o.png?download=true' width='32' onClick={handleReset} />
            </div>
            <div className='scrollArea'>
            {pages.map((p, idx) => {
                return <div className='page' key={"fragmentpage" + idx}>
                            <ImageAreas
                                title={`Page #${idx+1}`}
                                image={images[idx]}
                                width = {parseInt(500 * zoom)} areas={fragmentPageAreas[p.id] || [] }
                            />
                        </div>;
            })}
            </div>
        </div>
    </div>;
};

export default FragmentPages;
