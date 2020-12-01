/**
 * * FetchServiceProvider gives an excellent fetch service.
 * @export
 * @class FetchServiceProvider
 */
export class FetchServiceProvider{
    /**
     * * Creates an instance of FetchServiceProvider.
     * @param {Object} properties FetchServiceProvider properties:
     * @param {String} properties.url Fetch URL.
     * @param {String} properties.method Fetch method.
     * @memberof FetchServiceProvider
     */
    constructor(properties = {
        url: '',
        method: 'GET',
    }){
        this.setProperties(properties);
    }

    /**
     * * Set the FetchServiceProvider properties.
     * @param {Object} properties FetchServiceProvider properties:
     * @param {String} properties.url Fetch URL.
     * @param {String} properties.method Fetch method.
     * @memberof FetchServiceProvider
     */
    setProperties(properties = {
        url: '',
        method: 'GET',
    }){
        this.properties = {};
        this.setURLProperty(properties);
        this.setMethodProperty(properties);
    }

    /**
     * * Returns the FetchServiceProvider properties or an specific property.
     * @param {String} property Property name.
     * @returns {Object|*}
     * @memberof FetchServiceProvider
     */
    getProperties(property = ''){
        if (property && property != '') {
            return this.properties[property];
        } else {
            return this.properties;
        }
    }

    /**
     * * Set the FetchServiceProvider URL.
     * @param {Object} properties FetchServiceProvider properties:
     * @param {String} properties.url Fetch URL.
     * @param {String} properties.method Fetch method.
     * @memberof FetchServiceProvider
     */
    setURLProperty(properties = {
        url: '',
    }){
        if (properties.hasOwnProperty('url')) {
            this.properties.url = properties.url;
        } else {
            this.properties.url = '';
        }
    }

    /**
     * * Returns the FetchServiceProvider URL.
     * @returns {String}
     * @memberof FetchServiceProvider
     */
    getURLProperty(){
        return this.properties.url;
    }

    /**
     * * Set the FetchServiceProvider method.
     * @param {Object} properties FetchServiceProvider properties:
     * @param {String} properties.method Fetch method.
     * @memberof FetchServiceProvider
     */
    setMethodProperty(properties = {
        method: 'GET',
    }){
        if (properties.hasOwnProperty('method')) {
            this.properties.method = properties.method;
        } else {
            this.properties.method = 'GET';
        }
    }

    /**
     * * Returns the FetchServiceProvider method.
     * @returns {String}
     * @memberof FetchServiceProvider
     */
    getMethodProperty(){
        return this.properties.method;
    }

    /**
     * * Set the FetchServiceProvider response.
     * @param {Object} status FetchServiceProvider response status:
     * @param {Number} status.code FetchServiceProvider response status code.
     * @param {*} status.data FetchServiceProvider response data.
     * @param {String} status.message FetchServiceProvider response status message.
     * @memberof FetchServiceProvider
     */
    setResponse(status = {
        code: 404,
        data: [],
        message: undefined,
    }){
        this.status = {};
        this.setResponseCode(status);
        this.setResponseData(status);
        this.setResponseMessage(status);
    }

    /**
     * * Returns the FetchServiceProvider response status or an specific status property.
     * @param {String} property Status property name.
     * @returns {Object|*}
     * @memberof FetchServiceProvider
     */
    getResponse(property = ''){
        if (property && property != '') {
            return this.status[property];
        } else {
            return this.status;
        }
    }

    /**
     * * Set the FetchServiceProvider response status code.
     * @param {Object} status FetchServiceProvider response status:
     * @param {Number} status.code FetchServiceProvider response status code.
     * @memberof FetchServiceProvider
     */
    setResponseCode(status = {
        code: 404,
    }){
        if (status.hasOwnProperty('code')) {
            this.status.code = status.code;
        } else {
            this.status.code = 404;
        }
    }

    /**
     * * Returns the FetchServiceProvider response status code.
     * @returns {String}
     * @memberof FetchServiceProvider
     */
    getResponseCode(){
        return this.status.code;
    }

    /**
     * * Set the FetchServiceProvider response data.
     * @param {Object} status FetchServiceProvider response status:
     * @param {*} status.data FetchServiceProvider response data.
     * @memberof FetchServiceProvider
     */
    setResponseData(status = {
        data: [],
    }){
        if (status.hasOwnProperty('data')) {
            this.status.data = status.data;
        } else {
            this.status.data = [];
        }
    }

    /**
     * * Returns the FetchServiceProvider response data.
     * @returns {String}
     * @memberof FetchServiceProvider
     */
    getResponseData(){
        return this.status.data;
    }

    /**
     * * Set the FetchServiceProvider response status message.
     * @param {Object} status FetchServiceProvider response status:
     * @param {String} status.message FetchServiceProvider response status message.
     * @memberof FetchServiceProvider
     */
    setResponseMessage(status = {
        message: '',
    }){
        if (status.hasOwnProperty('message')) {
            this.status.message = status.message;
        } else {
            this.status.message = '';
        }
    }

    /**
     * * Returns the FetchServiceProvider response status message.
     * @returns {String}
     * @memberof FetchServiceProvider
     */
    getResponseMessage(){
        return this.status.message;
    }

    /**
     * * Get data from an specific URL.
     * @async
     * @static
     * @param {String} URL Fetch URL to get data.
     * @param {*} headers Fetch URL headers.
     * @returns {FetchServiceProvider}
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
            console.error('The URL is required');
        }
        return instance;
    }

    /**
     * * Send data from an specific URl.
     * @async
     * @static
     * @param {Object} properties FetchServiceProvider properties:
     * @param {String} properties.url Fetch URL.
     * @param {String} properties.method Fetch method.
     * @param {*} headers Fetch URL headers.
     * @param {FormData} formdata Data to send.
     * @returns {FetchServiceProvider}
     * @memberof FetchServiceProvider
     */
    static async sendData(properties = {
        url: '',
        method: '',
    }, headers = {}, formdata = []){
        let parsedFormData = {};
        for(const input of formdata){
            parsedFormData[input[0]] = input[1];
        }
        let instance = new this({
            url: properties.url,
            method: properties.method
        });
        if(instance.getURLProperty() != '' && instance.getMethodProperty() != 'GET'){
            await fetch(instance.getURLProperty(), {
                headers: headers,
                credentials: 'same-origin',
                method: instance.getMethodProperty(),
                body: JSON.stringify(parsedFormData),
            }).then(response => response.json())
                .then(data => {
                    instance.setResponse(data);
                }).catch(error => console.error(error));
        }else{
            console.error('The URL & Method are required');
        }
        return instance;
    }
}