import React from 'react';
import { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link, useNavigate
} from "react-router-dom";


import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import Login from "./Login";
import Register from "./Register";
import VolcanoPlus from "./VolcanoPlus";
import "./App.css"
const API_URL = "http://sefdb02.qut.edu.au:3001";

const table = {
    columns: [
       /// { headerName: "ID", field: "id" },
        { headerName: "Name", field: "name", sortable: true, filter: "agTextColumnFilter"},
       //// { headerName: "Country", field: "country" },
        { headerName: "Region", field: "region", sortable: true, filter: "agTextColumnFilter"},
        { headerName: "Subregion", field: "subregion", sortable: true, filter: "agTextColumnFilter" }
       
    ],
   
};


export default function App() {
    
    const [countryData, setCountryData] = useState(["hello no data available yet"]);
    const [selects, setSelects] = useState();
    const [logged, setLogged] = useState("Login");
    const [registered, setRegistered] = useState("Register");
    const [dselects, setDselects] = useState("All");
    const [volcanoData, setVolcanoData] = useState([{ id: 1, name: "", country: "", region: "", subregion: "  " }]);



    useEffect(() => {
        const url = `${API_URL}/countries`;
       
        fetch(url, {
            method: "GET"
            
            }
        )
            .then(res => res.json())
            .then(res => setCountryData(res));
    }, []);
    function refreshPage() {
        window.location.reload();
    }
    useEffect(() => {
        console.log("------");
        
        if (typeof localStorage.getItem("token") === 'object') {
            console.log("token is object");
            if (localStorage.getItem("token") === null) {
                console.log("token is null");
                setLogged("Login")
                setRegistered("Register")
               
            }
        }
        if (typeof localStorage.getItem("token") === 'string') {
            console.log("token is string");
            if (localStorage.getItem("token") === 'undefined') {
                console.log("token is undefined");
            }
            else {
                console.log("token is good to go");
                setLogged("Log Out")
                setRegistered("")
               
            }
        }
        console.log("------");
    });
    
    ////////////////////////////////////////////////////////////////////////////////
    function Home() {
        return (
            <div>
                <h2>Home</h2>
                <img src="img/volcano.jpg" alt=" volcano Icon" />
                
            </div>
        );
    }
    
    /////////////////////////////////////////////////////////////////////////////////
    function Volcano() {
        const navigate = useNavigate();
      
       
        let distanceChooser = function () {
            if (dselects === "All") {
                return `${API_URL}/volcanoes?country=${selects}`;
            }
            else {
                return `${API_URL}/volcanoes?country=${selects}&populatedWithin=${dselects}`;
            }

        }
        const getVolcanoDataPlus = function () {

            fetch(distanceChooser(), {
                method: "GET",
              
                } 
            )
                .then(res => res.json())
                
                .then(volcanoData => setVolcanoData(volcanoData));
          
        }
      
      
        return (

            <div
                className="ag-theme-balham"
                style={{
                    height: "300px",
                    width: "600px",
                    margin: "0 auto"
                }}
            >             
                <h2>Select Country:</h2>
                <select  value={selects} onChange={e => setSelects(e.target.value)}>
                    <option>~Select A Country~</option>
                    {countryData.map(x => <option key={x.toString()}> {x.toString()}</option>)}
                </select>
                
             
               
               
                <h2>Select Radius To Search For Volcanoes Around The Country {selects}</h2>
                <select value={dselects} onChange={e => setDselects(e.target.value)}>
                    <option>All</option>
                    <option>5km</option>
                    <option>10km</option>
                    <option>30km</option>
                    <option>100km</option>                    
                </select>
                <button onClick={getVolcanoDataPlus}>Get Volcano Data, {dselects} radius of the country</button>
                
               

                <h2></h2>
                <h2>{dselects} Volcanoes Populated within {selects}:</h2>
                <h2></h2>
                <AgGridReact
                    columnDefs={table.columns}
                    rowData={volcanoData}
                    pagination={true}
                    paginationPageSize={7}
                    rowSelection="single"


                    onRowClicked={(row) => navigate(`/volcanoplus?name=${volcanoData[row.rowIndex].id}`)}
                />
               
            </div>

        );
    }
    
    /////////////////////////////////////////////////////////////////////////////
    return (
        <Router>
            <div>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/volcano">Volcano Data</Link>
                    </li>
                    <li>
                        <Link to="/login">{logged}</Link>
                    </li>
                    <li>
                        <Link to="/register">{registered}</Link>
                    </li>
                   </ul>

                <hr />

                {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
                <Routes>
                    <Route exact path="/" element={<Home />}/>
                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<Login />} />
                    <Route path="/register" element={<Register />}/>
                    <Route path="/volcano" element={<Volcano />}/>
                    <Route path="/volcanoplus" element={<VolcanoPlus />}/>
                </Routes>
            </div>
        </Router>
    );
}

// You can think of these components as "pages"
// in your app.



