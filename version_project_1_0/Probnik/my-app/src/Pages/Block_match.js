import React from 'react';
import '../index.css';


const Block_match = ({ Time, Team1, Team2, Score1, Score2, LogoTeam1, LogoTeam2}) => {
    return (
    <div className="u-border-2 u-border-grey-75 u-container-layout u-valign-top u-container-layout-4">
        <p className="u-align-center u-text u-text-5"> {Time}</p>
        <img className="u-image u-image-contain u-image-default u-image-1" src={LogoTeam1} alt="" data-image-width="240" data-image-height="321"></img>
        <p className="u-align-center u-text u-text-6">{Team1}</p>
        <p className="u-align-center u-text u-text-7">{Score1}</p>
        <img className="u-image u-image-contain u-image-default u-image-2" src={LogoTeam2} alt="" data-image-width="361" data-image-height="360"></img>
        <p className="u-align-center u-text u-text-8">{Team2}</p>
        <p className="u-align-center u-text u-text-9">{Score2}</p>
    </div>
);
};
export default Block_match;