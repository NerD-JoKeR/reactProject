const XMLParser = require('react-xml-parser');

const basicAuthorizationToken = 'Basic a2FzcGk6a2FzcGk='

export function authenticate() {
    fetch('/ws', {
        method: 'post',
        headers: { 'Content-Type':'text/xml', 'Authorization': basicAuthorizationToken },
        body: '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ffinlife/ws">' +
                '<soapenv:Header/>' +
                '<soapenv:Body>' +
                '<ws:authorizationWSRequest>' +
                    '<ws:login>ffinlife_site</ws:login>' +
                    '<ws:password>1q3wr2</ws:password>' +
                '</ws:authorizationWSRequest>' +
                '</soapenv:Body>' +
            '</soapenv:Envelope>'
       }).then(async (response) => {
            const xml = await parseResponseToJson(response);
            const sessionId = xml.getElementsByTagName('ns2:sessionId')[0].value;
            console.log('SESSION ID', sessionId);
            sessionStorage.setItem('sessionId', sessionId);
       });
}

export async function callWebService(body){
    return fetch('/ws', {
        method: 'post',
        headers: { 'Content-Type':'text/xml', 'Authorization': basicAuthorizationToken },
        body: body
       }).then(async (response) => {
            const xml = await parseResponseToJson(response)
            console.log('Parsed XML: ', xml);
            return xml;
       });
}

export async function parseResponseToJson (response) {
    const text = await response.text();
    console.log('Response', text);

    let result = text.substring(text.indexOf('<SOAP'), text.indexOf('</SOAP-ENV:Envelope>') + 20);
    console.log('Clean Result', result);

    const xml = new XMLParser().parseFromString(result); 
    console.log('XML', xml);

    return xml;
}