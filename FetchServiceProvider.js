export class FetchServiceProvider{
    constructor(properties = {
        url: undefined,
        method: 'GET',
    }){
        this.setProperties(properties);
    }

    setProperties(properties = {
        url: undefined,
        method: 'GET',
    }){
        this.properties = {};
        this.setURL(properties);
        this.setMethod(properties);
    }

    setResponse(status = {
        code: 404,
        data: [],
        message: undefined,
    }){
        this.status = {};
        this.setCode(status);
        this.setData(status);
        this.setMessage(status);
    }

    setURL(properties = {
        url: undefined,
    }){
        this.properties.url = properties.url;
    }

    setMethod(properties = {
        method: 'GET',
    }){
        this.properties.method = properties.method;
    }

    setCode(status = {
        code: 404,
    }){
        this.status.code = status.code;
    }

    setData(status = {
        data: [],
    }){
        this.status.data = status.data;
    }

    setMessage(status = {
        message: '',
    }){
        this.status.message = status.message;
    }

    getResponse(string = ''){
        switch (string) {
            case 'code':
                return this.status.code;
            case 'data':
                return this.status.data;
            case 'message':
                return this.status.message;
            default:
                return this.status;
        }
    }

    static async getData(URL, headers = {}){
        let instance = new this({
            url: URL,
            method: 'GET'
        });
        if(URL != null){
            let withHeaders = false;
            for(const key in headers){
                if(headers.hasOwnProperty(key)){
                    withHeaders = true;
                    break;
                }
            }
            if(withHeaders){
                await fetch(URL, {
                    headers: headers,
                    credentials: 'same-origin',
                    method: 'GET',
                }).then(response => response.json())
                    .then(data => {
                        instance.setResponse(data);
                    }).catch(error => console.error(error));
            }else{
                await fetch(URL).then(response => response.json())
                    .then(data => {
                        instance.setResponse(data);
                    }).catch(error => console.error(error));
            }
        }else{
            console.error('No pasaste los datos man...');
        }
        return instance;
    }

    static async setData(properties = {
        method: null,
        url: null
    }, headers = {}, formdata = []){
        let parsedFormData = {};
        for(const input of formdata){
            parsedFormData[input[0]] = input[1];
        }
        let instance = new this({
            url: properties.url,
            method: properties.method
        });
        if(properties.url != null && properties.method != null){
            await fetch(properties.url, {
                headers: headers,
                credentials: 'same-origin',
                method: properties.method,
                body: JSON.stringify(parsedFormData),
            }).then(response => response.json())
                .then(data => {
                    instance.setResponse(data);
                }).catch(error => console.error(error));
        }else{
            console.error('No pasaste los datos man...');
        }
        return instance;
    }
}