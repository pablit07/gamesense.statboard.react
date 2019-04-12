import React from 'react';


const PageContainer = ({title, contents}) => {
    return (
        <div className="background">
        <h6 className="pageTitle">GameSense StatBoard</h6>
            <div className="reactTable">
                <div className="reportTitle">
                    <h3>{title}</h3>
                </div>
                {contents}

            </div>
        </div>);
}

export default PageContainer;