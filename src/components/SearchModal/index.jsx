import React, {useEffect, useRef, useState} from "react";
import './index.css';

const SearchModal = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'f') {
                event.preventDefault();
                setModalOpen(prevState => !prevState);
            }
        };
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    useEffect(() => {
        if (modalOpen) {
            inputRef.current.focus();
        }
    }, [modalOpen]);

    return(
        <div className="search-modal-header-nutton">
            <button className="header-search-button" onClick={() => setModalOpen(true)}>Поиск...</button>
            <div className={`search-modal-container ${modalOpen ? 'open' : 'close'}`}>
                <div className="search-modal">
                    <div className="search-modal-top">
                        <input ref={inputRef} placeholder="Поиск по правилам" className="modal-search-input" type="text"/>
                        <button onClick={() => setModalOpen(false)} className="modal-close-button">
                            <i className="icon close"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default SearchModal;