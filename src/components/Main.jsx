import React from "react";

import "../styles/custom.css"
export const Main = ({ children }) => {  
    return( 
        
        <main className="flex-grow-1 margin-top-main">           
            {children}
        </main>            
    );
}

