import React, {useEffect, useRef, useState} from "react";
import './index.css';
import {useRuleModal} from "../../utils/providers/RuleModalProvider";
import {rules} from "../../utils/rules";
import {Link, useNavigate} from "react-router-dom";

const SearchModal = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [searchPerformed, setSearchPerformed] = useState(false);
    const inputRef = useRef(null);
    const navigate = useNavigate();
    const { ruleModalOpen } = useRuleModal();
    useEffect(() => {
        const handleKeyDown = (event) => {
            if ((event.ctrlKey || event.metaKey) && (event.key.toLowerCase() === 'f' || event.key.toLowerCase() === 'ф')) {
                event.preventDefault();
                if (!ruleModalOpen) {
                    setModalOpen(prevState => !prevState);
                }
            }
        };
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [ruleModalOpen]);

    const handleResultClick = (link) => {
        navigate(link);
        setModalOpen(false);
    }

    const handleSearch = (searchTerm) => {
        if (searchTerm.trim() === '') {
            setSearchResults([]);
            setSearchPerformed(false); // Indicates no search query has been entered yet
            return;
        }
        setSearchPerformed(true); // A search has been performed

        const results = [];
        Object.entries(rules).forEach(([categoryName, categoryRules]) => {
            Object.entries(categoryRules).forEach(([ruleKey, ruleDetails]) => {
                const matchKeywords = ruleDetails.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()));
                const matchDescription = ruleDetails.short_description.toLowerCase().includes(searchTerm.toLowerCase());
                if (matchKeywords || matchDescription) {
                    results.push({ key: ruleKey, ...ruleDetails });
                }
            });
        });
        setSearchResults(results);
    };

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
                        <input
                            ref={inputRef}
                            placeholder="Поиск по правилам"
                            className="modal-search-input"
                            type="text"
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                        <button onClick={() => setModalOpen(false)}
                                className="modal-close-button">
                            <i className="icon close"></i>
                        </button>
                    </div>
                    <div className="search-results">
                        {!searchPerformed && (
                            <div className="search-message">Начните печатать для поиска</div>
                        )}
                        {searchPerformed && searchResults.length === 0 && (
                            <div className="search-message">Ничего не найдено</div>
                        )}
                        {searchResults.map(result => (
                            <button key={result.key} className="search-result-link"
                                    onClick={() => handleResultClick(`/rule/${result.key}`)}>
                                <span>{result.key}</span>
                                <span>{result.short_description}</span>
                            </button>
                        ))}
                    </div>

                </div>
            </div>
        </div>


    )
}

export default SearchModal;