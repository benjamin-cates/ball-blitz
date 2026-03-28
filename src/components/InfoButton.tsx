import React from 'react';

export const InfoButton: React.FC = () => {
    return (
        <div className="info-container">
            <div className="info-button">?</div>
            <div className="info-popup">
                <h3>Ball Blitz</h3>
                <p>
                    A physics-based ball merging game. Drop balls and merge matching ones to score points and grow your collection!
                </p>
                <a
                    href="https://github.com/benjamin-cates/ball-blitz"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    View on GitHub
                </a>
            </div>
        </div>
    );
};
