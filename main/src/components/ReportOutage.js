import React, { useState, useEffect } from "react";

function ReportOutage(){
    return (
        <>
            <h1 id="Report-Title" class>Test Dialog box</h1>
            <form>
                <input type="text" placeholder="Field 1"/>
                <input type="text" placeholder="Field 2"/>
                <input type="text" placeholder="Field 3"/>
            </form>
        </>
    );
}

export default ReportOutage;