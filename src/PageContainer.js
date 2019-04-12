import React from 'react';


const PageContainer = ({contents}) => {
    return (
        <div className="background">
        <h6 className="pageTitle">GameSense StatBoard</h6>
            <div className="reactTable">
                <div className="reportTitle">
                    <h3>Coach Report</h3>
                </div>
                {contents}

            </div>
        </div>);
}

export default PageContainer;