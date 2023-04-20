#!/usr/bin/env node

// import all

import minimist from "minimist";
import fetch from "node-fetch";
import moment from "moment-timezone";

// process first args

const args = minimist(process.argv.slice(2));
const tizo = args.z || moment.tz.guess();
const day = args.d;
    
const lati = args.n || args.s * -1;
const longi = args.e || args.w *-1;


const request = await fetch('https://api.open-meteo.com/v1/forecast?latitude=' + lati + '&longitude=' + longi+ '&daily=precipitation_hours&timezone=' + tizo);
const response = await request.json();


// Getting help
if('h' in args){
    // If help
    let help = `Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -t TIME_ZONE
    -h            Show this help message and exit.
    -n, -s        Latitude: N positive; S negative.
    -e, -w        Longitude: E positive; W negative.
    -t            Time zone: uses tz.guess() from moment-timezone by default.
    -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.
    -j            Echo pretty JSON from open-meteo API and exit.`
    console.log(help);
    process.exit(0);
}
if('j' in args){
    console.log(response);
    process.exit(0);
}

const daily_rain = response.daily.precipitation_hours[day]

if(day==0){
    if(daily_rain > 0){
        console.log('Today is Rhianna time(get your Umbrella) you might need galoshes');
        process.exit(0);
    }
    else{
        console.log('Its probably pretty dry today, dont get out the galoshes');
        process.exit(0);
    }
}
else if(day==1){
    if(daily_rain > 0){
        console.log('Tomorrow is a good day for Gene Kelly(he will be singing in the rain) you might need galoshes');
        process.exit(0);
    }
    else{
        console.log('Its probably dry tomorrow, dont get out the galoshes');
        process.exit(0);
    }
}
else{
    if(daily_rain>0){
        console.log('You wont catch me outside without galoshes in'+day+'days');
        process.exit(0);
    }
    else{
        console.log('it will be a good day for sneakers(not galoshes) in'+day+'days');
        process.exit(0);
    }
}


