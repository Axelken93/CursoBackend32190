import { request } from "http";

const options = {
    hostname: 'localhost',
    port: 8080,
    path: '/productos/index',
    method: 'GET'
}

const req = request(options, res => {
    let response = ''

    res.on('data', d => {
        response += d
    })

    res.on('end', () => {
        let data = JSON.parse(response)
        console.log(data);
    })
})

req.on('error', error => {
    console.log(error);
})

req.end()