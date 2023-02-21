import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "reactstrap";
///import 'bootstrap/dist/css/bootstrap.css';
import { useState, useEffect } from "react";
import { Map, Marker } from "pigeon-maps"
import { Bar } from "react-chartjs-2";
import {
    Chart,
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";
import "./App.css"
Chart.register(ArcElement, CategoryScale, LinearScale, BarElement, Title,
    Tooltip,
    Legend);
const API_URL = "http://sefdb02.qut.edu.au:3001";
function logcheck() {
    console.log("----logcheck--");
    if (localStorage.getItem("token") === null) {
        console.log("token is null");
        return 0;
    }
    if (typeof localStorage.getItem("token") === 'object') {
        console.log("token is object 0");
    }
    if (typeof localStorage.getItem("token") === 'string') {
        console.log("token is string");
        if (localStorage.getItem("token") === 'undefined') {
            console.log("token is undefined 0");
            return 0;
        }
        else {
            console.log("token is good to go 1");
            return 1;
        }
    }
    console.log("---logcheck---");
}


export default function VolcanoPlus() {
    const [volcanoDataPlus, setVolcanoDataPlus] = useState({});
    const navigate = useNavigate();
    const [lat, setLat] = useState(0)
    const [long, setLong] = useState(0)
    const [searchParams] = useSearchParams();
    const name = searchParams.get("name");
    
    console.log(name);
    useEffect(() => {
        const url = `${API_URL}/volcano/${name}`;
        const token = localStorage.getItem("token");
        fetch(url, {
            method: "GET",

            headers: token !== null ? {
                "accept": "application/json",
                Authorization: `Bearer ${token}`
            } : {}
        })
            .then(res => res.json())
            .then(volcanoDataPlus => setVolcanoDataPlus(volcanoDataPlus));
    }, []);
 
    let latitude = parseFloat(volcanoDataPlus.latitude);
    let longitude = parseFloat(volcanoDataPlus.longitude);


    const options = {
        responsive: true,
        plugins: {
            
            title: {
                display: true,
                text: 'Population Density bar Graph',
            },
        },
    };
    let a1 = parseFloat(volcanoDataPlus.population_5km);
    let a2 = parseFloat(volcanoDataPlus.population_10km);
    let a3 = parseFloat(volcanoDataPlus.population_30km);
    let a4 = parseFloat(volcanoDataPlus.population_100km);
    const data = {
        labels: ["population_5km", "population_10km", "population_30km", "population_100km"],
        datasets: [
            {
                label:"Population Data",
                data: [a1, a2, a3, a4],
                backgroundColor: ['rgba(255, 9, 1, 0.5)', 'rgba(53, 162, 235, 0.5)', 'rgba(2, 200, 200, 0.5)', 'rgba(255, 99, 250, 0.5)'],
               /// backgroundColor: 'rgba(53, 162, 235, 0.5)',
            }
        ]
    };
    return (
        <div className="container">
            <h1> {volcanoDataPlus.name} </h1>
         
            <p>Country: {volcanoDataPlus.country}</p>
            <p>Region: {volcanoDataPlus.region}</p>
            <p>Subregion: {volcanoDataPlus.subregion}</p>
            <p>Last eruption: {volcanoDataPlus.last_eruption}</p>
            <p>Summit: {volcanoDataPlus.summit}m</p>
            <p>Elevation: {volcanoDataPlus.elevation}ft</p>

            <h1>Location on Map</h1>
            <Map height={300} defaultCenter={[lat, long]} defaultZoom={1}
                onBoundsChanged={({ lat, long }) => {
                    setLat(latitude)
                    setLong(longitude)
                }}             >
                <Marker width={50} color={"red"} anchor={[lat, long]} />
            </Map>
            <h1 >Population Density</h1>
                <div style={{ width: "1000px", margin: "0 auto" }}>
                    
                <Bar data={data} />
                <Button
                    color="info"
                    size="sm"
                    className="mt-3"
                    onClick={() => navigate("/volcano")}
                >
                    Back
      </Button>
                </div>
          
           
            
        </div>
    );
}
