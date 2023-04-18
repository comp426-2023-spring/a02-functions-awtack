#!/usr/bin/env node

// import all

import minimist from "minimist";
import fetch from "node-fetch";
import moment from "moment-timezone";

// process first args

const args = minimist(process.argv.slice(2));
const timezone = moment.tz.guess();

if(args.h) {


