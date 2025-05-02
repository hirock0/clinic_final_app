import React from 'react';

const Loading = ({style}: {style: string}) => {
    return (
        <div className={style}>
            <span className="loading loading-spinner loading-lg"></span>
        </div>
    );
};

export default Loading;