import React from 'react';

interface TitleProps {
    heading: string;
    paragraph: string;
}

const Title: React.FC<TitleProps> = ({ heading, paragraph }) => {
    return (
        <>
            <h2 className="text-4xl font-black mb-4 second-text-color uppercase" style={{ fontFamily: 'var(--font-inter' }}>
                {heading}
            </h2>
            <p className="text-lg mb-8 " style={{ fontFamily: 'var(--font-inter' }}>
                {paragraph}
            </p>
        </>
    );
};

export default Title;