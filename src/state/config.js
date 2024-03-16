/*
    Defines the API route we are using.
*/

import axios from 'axios'
window.csrf_token = '{{ csrf_token() }}'
let xcsrf_token = window.$cookies.get('XCSRF-TOKEN')

var site_axios = axios.create({
    headers: {
        //'X-Requested-With': 'XMLHttpRequest',
        //'xsrfCookieName': 'XCSRF-TOKEN',
        //'X-CSRF-TOKEN': '7YC0Sxth7AYe4RFSjzaPf2ygLCecJhPbyXhz6vvF',
        Accept: 'application/json',
        //'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
    },
    timeout: 0,
    keepAlive: true,
})

const local = 'http://127.0.0.1:8000/'
const production = 'https://api.stage-hrbee.com/'
// SERVER
// var api_endpoint = 'https://api.hr-bee.com/';

// LOCAL
var api_endpoint = window.location.href.indexOf('localhost') > -1 ? local : production

export const API_CONFIG = {
    SITE_AXIOS: site_axios,
    API_ENDPOINT: api_endpoint,
}
