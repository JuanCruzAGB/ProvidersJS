// ? JuanCruzAGB repository
import Class from "../../JuanCruzAGB/js/Class.js";

/** @var {object} defaultProps Default props. */
let defaultProps = {
    url: '/api',
    method: 'GET',
};

/**
 * * FetchServiceProvider gives an excellent fetch service.
 * @export
 * @class FetchServiceProvider
 * @extends Class
 * @author Juan Cruz Armentia <juancarmentia@gmail.com>
 */
export class FetchServiceProvider extends Class {
    /**
     * * Creates an instance of FetchServiceProvider.
     * @param {object} [props] FetchServiceProvider properties:
     * @param {string} [props.url='/api'] Fetch URL.
     * @param {string} [props.method='GET'] Fetch method.
     * @memberof FetchServiceProvider
     */
    constructor (props = {
        url: '/api',
        method: 'GET',
    }) {
        super({ ...defaultProps, ...props });
    }

    /**
     * * Set the FetchServiceProvider response.
     * @param {object} [response] FetchServiceProvider response response:
     * @param {number} [response.code=404] FetchServiceProvider response response code.
     * @param {*} [response.data] FetchServiceProvider response data.
     * @param {string} [response.message=''] FetchServiceProvider response response message.
     * @memberof FetchServiceProvider
     */
    setResponse (response = {
        code: 404,
        data: [],
        message: '',
    }) {
        this.response = {};
        this.setResponseCode(response);
        this.setResponseData(response);
        this.setResponseMessage(response);
    }

    /**
     * * Set the FetchServiceProvider response response code.
     * @param {object} [response] FetchServiceProvider response response:
     * @param {number} [response.code=404] FetchServiceProvider response response code.
     * @memberof FetchServiceProvider
     */
    setResponseCode (response = {
        code: 404,
    }) {
        if (response.hasOwnProperty('code')) {
            this.response.code = response.code;
        } else {
            this.response.code = 404;
        }
    }

    /**
     * * Set the FetchServiceProvider response data.
     * @param {object} [response] FetchServiceProvider response response:
     * @param {*} [response.data] FetchServiceProvider response data.
     * @memberof FetchServiceProvider
     */
    setResponseData (response = {
        data: [],
    }) {
        if (response.hasOwnProperty('data')) {
            this.response.data = response.data;
        } else {
            this.response.data = [];
        }
    }

    /**
     * * Set the FetchServiceProvider response response message.
     * @param {object} [response] FetchServiceProvider response response:
     * @param {string} [response.message=''] FetchServiceProvider response response message.
     * @memberof FetchServiceProvider
     */
    setResponseMessage (response = {
        message: '',
    }) {
        if (response.hasOwnProperty('message')) {
            this.response.message = response.message;
        } else {
            this.response.message = '';
        }
    }

    /**
     * * Get data from an specific URL.
     * @async
     * @static
     * @param {string} URL Fetch URL to get data.
     * @param {*} headers Fetch URL headers.
     * @returns {FetchServiceProvider}
     * @memberof FetchServiceProvider
     */
    static async get (URL, headers = {}) {
        let instance = new this({
            url: URL,
            method: 'GET'
        });
        if (URL != null) {
            let withHeaders = false;
            for (const key in headers) {
                if (headers.hasOwnProperty(key)) {
                    withHeaders = true;
                    break;
                }
            }
            if (withHeaders) {
                await fetch(URL, {
                    headers: headers,
                    credentials: 'same-origin',
                    method: 'GET',
                }).then(response => response.json())
                    .then(data => {
                        instance.setResponse(data);
                    }).catch(error => console.error(error));
            } else {
                await fetch(URL).then(response => response.json())
                    .then(data => {
                        instance.setResponse(data);
                    }).catch(error => console.error(error));
            }
        } else {
            console.error('The URL is required');
        }
        return instance;
    }

    /**
     * * Send data from an specific URl.
     * @async
     * @static
     * @param {object} props FetchServiceProvider properties:
     * @param {string} props.url Fetch URL.
     * @param {string} props.method Fetch method.
     * @param {*} headers Fetch URL headers.
     * @param {FormData} formdata Data to send.
     * @returns {FetchServiceProvider}
     * @memberof FetchServiceProvider
     */
    static async send (props = {
        url: '',
        method: '',
    }, headers = {}, formdata = []) {
        let parsedFormData = {};
        for (const input of formdata) {
            parsedFormData[input[0]] = input[1];
        }
        let instance = new this({
            url: props.url,
            method: props.method
        });
        if (instance.props.url != '' && instance.props.method != 'GET') {
            await fetch(instance.props.url, {
                headers: headers,
                credentials: 'same-origin',
                method: instance.props.method,
                body: JSON.stringify(parsedFormData),
            }).then(response => response.json())
                .then(data => {
                    instance.setResponse(data);
                }).catch(error => console.error(error));
        } else {
            console.error('The URL & Method are required');
        }
        return instance;
    }
}