/**
 * * Controls a fetch function.
 * @export
 * @class FetchServiceProvider
 */
export class FetchServiceProvider{
    /**
     * * Creates an instance of FetchServiceProvider.
     * @param {Object} properties FetchServiceProvider properties.
     * @param {String} properties.url Fetch URL.
     * @param {String} properties.method Fetch method.
     * @memberof FetchServiceProvider
     */
    constructor(properties = {
        url: undefined,
        method: 'GET',
    }){
        this.setProperties(properties);
    }

    /**
     * * Set the FetchServiceProvider properties.
     * @param {Object} properties FetchServiceProvider properties.
     * @param {String} properties.url Fetch URL.
     * @param {String} properties.method Fetch method.
     * @memberof FetchServiceProvider
     */
    setProperties(properties = {
        url: undefined,
        method: 'GET',
    }){
        this.properties = {};
        this.setURL(properties);
        this.setMethod(properties);
    }

    /**
     * * Set the Fetch URL.
     * @param {Object} properties FetchServiceProvider properties.
     * @param {String} properties.url Fetch URL.
     * @memberof FetchServiceProvider
     */
    setURL(properties = {
        url: undefined,
    }){
        if (properties.hasOwnProperty('url')) {
            this.properties.url = properties.url;
        } else {
            this.properties.url = undefined;
        }
    }

    /**
     * * Set the Fetch method.
     * @param {Object} properties FetchServiceProvider properties.
     * @param {String} properties.method Fetch method.
     * @memberof FetchServiceProvider
     */
    setMethod(properties = {
        method: 'GET',
    }){
        if (properties.hasOwnProperty('method')) {
            this.properties.method = properties.method.toUpperCase();
        } else {
            this.properties.method = 'GET';
        }
    }

    /**
     * * Set the FetchServiceProvider response.
     * @param {Object} status FetchServiceProvider response status.
     * @param {Number} status.code FetchServiceProvider response status code.
     * @param {*} status.data FetchServiceProvider response status data.
     * @param {String} status.message FetchServiceProvider response status message.
     * @memberof FetchServiceProvider
     */
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

    /**
     * * Returns the FetchServiceProvider response or an specific property.
     * @param {String} property Property name to get.
     * @returns {*} The response or a property.
     * @memberof FetchServiceProvider
     */
    getResponse(property = ''){
        switch (property) {
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

    /**
     * * Set the status code.
     * @param {Object} status FetchServiceProvider response status.
     * @param {Number} status.code FetchServiceProvider response status code.
     * @memberof FetchServiceProvider
     */
    setCode(status = {
        code: 404,
    }){
        if (status.hasOwnProperty('code')) {
            this.status.code = status.code;
        } else {
            this.status.code = 404;
        }
    }

    /**
     * * Set the status data.
     * @param {Object} status FetchServiceProvider response status.
     * @param {*} status.data FetchServiceProvider response status data.
     * @memberof FetchServiceProvider
     */
    setData(status = {
        data: [],
    }){
        if (status.hasOwnProperty('data')) {
            this.status.data = status.data;
        } else {
            this.status.data = [];
        }
    }

    /**
     * * Set the status message.
     * @param {Object} status FetchServiceProvider response status.
     * @param {String} status.message FetchServiceProvider response status message.
     * @memberof FetchServiceProvider
     */
    setMessage(status = {
        message: '',
    }){
        if (status.hasOwnProperty('message')) {
            this.status.message = status.message;
        } else {
            this.status.message = '';
        }
    }

    /**
     * * Get data with a fetch function.
     * @static
     * @param {String} URL URL to get data.
     * @param {Object} headers Fetch headers.
     * @returns {FetchServiceProvider} The FetchServiceProvider.
     * @memberof FetchServiceProvider
     */
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

    /**
     * * Set data with a fetch function.
     * @static
     * @param {Object} properties Fetch properties.
     * @param {String} properties.url Fetch URL.
     * @param {String} properties.method Fetch method.
     * @memberof FetchServiceProvider
     * @param {Object} headers Fetch headers.
     * @param {FormData} formdata Data to send.
     * @returns {FetchServiceProvider} The FetchServiceProvider.
     * @memberof FetchServiceProvider
     */
    static async setData(properties = {
        url: null,
        method: null,
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