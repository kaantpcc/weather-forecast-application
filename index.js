import express from "express";
import bodyParser from "body-parser";
import axios from "axios";


const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));

let control;
let error = false;
const APIKey = "accdacdddd7e46c69f3162715242202";

app.get("/",(req,res)=>{
    control = false;
    res.render("index.ejs", {
        weather : control
    });
});

app.post("/search", async (req, res)=>{
    control = true;
    const cityName = req.body["locationName"];
    try {
        const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${APIKey}&q=${cityName}&days=6&hour=24`);
        const result = response.data;
        const dateTimeString = result.location.localtime;
        const timeRegex = /(\d{1,2}):\d{2}/;
        const match = dateTimeString.match(timeRegex);

        const url = result.forecast.forecastday[0].day.condition.icon;
        const fileName1 = url.substring(url.lastIndexOf("/") + 1);

        const url1 = result.forecast.forecastday[1].day.condition.icon;
        const fileName2 = url1.substring(url1.lastIndexOf("/") + 1);

        const url2 = result.forecast.forecastday[2].day.condition.icon;
        const fileName3 = url2.substring(url2.lastIndexOf("/") + 1);

        const url3 = result.forecast.forecastday[3].day.condition.icon;
        const fileName4 = url3.substring(url3.lastIndexOf("/") + 1);

        const url4 = result.forecast.forecastday[4].day.condition.icon;
        const fileName5 = url4.substring(url4.lastIndexOf("/") + 1);

        const url5 = result.forecast.forecastday[5].day.condition.icon;
        const fileName6 = url5.substring(url5.lastIndexOf("/") + 1);

        res.render("index.ejs",{
            weather : control,
            cityName : cityName,
            countryName : result.location.country,
            currentDate : result.forecast.forecastday[0].date,
            localTime : match[0],
            currentDayTemp : Math.floor(result.forecast.forecastday[0].day.avgtemp_c),
            currentDayCond : result.forecast.forecastday[0].day.condition.text,
            currentDayMax : Math.floor(result.forecast.forecastday[0].day.maxtemp_c),
            currentDayMin : Math.floor(result.forecast.forecastday[0].day.mintemp_c),
            currentDayWind : Math.floor(result.forecast.forecastday[0].day.maxwind_kph),
            currentDayHum : result.forecast.forecastday[0].day.avghumidity,
            currentDaySunrise : result.forecast.forecastday[0].astro.sunrise,
            currentDaySunset : result.forecast.forecastday[0].astro.sunset,
            currentDayImg : fileName1,
            firstDayImg : fileName2,
            secondDayImg : fileName3,
            thirdDayImg : fileName4,
            fourthDayImg : fileName5,
            fifthDayImg : fileName6,
            firstDayTemp : Math.floor(result.forecast.forecastday[1].day.avgtemp_c),
            firstDayCond : result.forecast.forecastday[1].day.condition.text,
            secondDayTemp : Math.floor(result.forecast.forecastday[2].day.avgtemp_c),
            secondDayCond : result.forecast.forecastday[2].day.condition.text,
            thirdDayTemp : Math.floor(result.forecast.forecastday[3].day.avgtemp_c),
            thirdDayCond : result.forecast.forecastday[3].day.condition.text,
            fourthDayTemp : Math.floor(result.forecast.forecastday[4].day.avgtemp_c),
            fourthDayCond : result.forecast.forecastday[4].day.condition.text,
            fifthDayTemp : Math.floor(result.forecast.forecastday[5].day.avgtemp_c),
            fifthDayCond : result.forecast.forecastday[5].day.condition.text,
        });
    } catch (error) {
        console.error("Hava durumu verisi alinamadi!");
    }
    
});

app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
});