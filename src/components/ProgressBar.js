import React from 'react';

const ProgressBar = ({currentPercent, label}) => {
    return (<div className="progress" role="progressbar" aria-label="Animated striped example"
                 aria-valuenow={currentPercent} aria-valuemin="0" aria-valuemax="100">
            <div className="progress-bar progress-bar-striped progress-bar-animated"
                 style={{width: `${currentPercent}%`}}>{label}</div>
        </div>
    );
};

export default ProgressBar;