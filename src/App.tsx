import React, { FC, useState } from "react";
import Contry from "./Components/Country-list/Country";
import Todo from "./Components/Todo-list/Todo";

const App: FC = () => {
    const [activeTab, setActiveTab] = useState<boolean>(true);
    return (
        <div className="container">
            <div className="list-tabs"> 
                <div className={`item-tab ${activeTab ? 'active-tab': '' }`} onClick={()=>{setActiveTab(true)}}>
                    TODO LIST
                </div>
                <div className={`item-tab ${!activeTab ? 'active-tab': '' }`} onClick={()=>{setActiveTab(false)}}>
                    COUNTRY LIST
                </div>
            </div>
            <div className="content-body-tabs">
                {activeTab ? (<Todo/>):(<Contry />) }
            </div>
        </div>
    );
}

export default App;