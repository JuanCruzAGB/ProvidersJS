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
     * @param {object} [status] FetchServiceProvider response status:
     * @param {number} [status.code=404] FetchServiceProvider response status code.
     * @param {*} [status.data] FetchServiceProvider response data.
     * @param {string} [status.message=''] FetchServiceProvider response status message.
     * @memberof FetchServiceProvider
     */
    setResponse (status = {
        code: 404,
        data: [],
        message: '',
    }) {
        this.status = {};
        this.setResponseCode(status);
        this.setResponseData(status);
        this.setResponseMessage(status);
    }

    /**
     * * Set the FetchServiceProvider response status code.
     * @param {object} [status] FetchServiceProvider response status:
     * @param {number} [status.code=404] FetchServiceProvider response status code.
     * @memberof FetchServiceProvider
     */
    setResponseCode (status = {
        code: 404,
    }) {
        if (status.hasOwnProperty('code')) {
            this.status.code = status.code;
        } else {
            this.status.code = 404;
        }
    }

    /**
     * * Set the FetchServiceProvider response data.
     * @param {object} [status] FetchServiceProvider response status:
     * @param {*} [status.data] FetchServiceProvider response data.
     * @memberof FetchServiceProvider
     */
    setResponseData (status = {
        data: [],
    }) {
        if (status.hasOwnProperty('data')) {
            this.status.data = status.data;
        } else {
            this.status.data = [];
        }
    }

    /**
     * * Set the FetchServiceProvider response status message.
     * @param {object} [status] FetchServiceProvider response status:
     * @param {string} [status.message=''] FetchServiceProvider response status message.
     * @memberof FetchServiceProvider
     */
    setResponseMessage (status = {
        message: '',
    }) {
        if (status.hasOwnProperty('message')) {
            this.status.message = status.message;
        } else {
            this.status.message = '';
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