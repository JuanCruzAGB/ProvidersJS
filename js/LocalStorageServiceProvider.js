// ? JuanCruzAGB repository
import Class from "../../JuanCruzAGB/js/Class.js";

/** @var {object} defaultProps Default props. */
let defaultProps = {
    name: 'something',
};

/**
 * * LocalStorageServiceProvider gives an excellet LocalStorage Service.
 * @export
 * @class LocalStorageServiceProvider
 * @extends Class
 * @author Juan Cruz Armentia <juancarmentia@gmail.com
 */
export class LocalStorageServiceProvider extends Class {
    /**
     * * Creates an instance of LocalStorageServiceProvider.
     * @param {object} [props] LocalStorageServiceProvider properties:
     * @param {string} [props.name='something'] LocalStorage data name.
     * @param {*} [data=''] Data saved in the LocalStorage.
     * @memberof LocalStorageServiceProvider
     */
    constructor (props = {
        name: 'something',
    }, data = '') {
        super({ ...defaultProps, ...props });
        this.setData(data);
    }

    /**
     * * Set the LocalStorageServiceProvider data.
     * @param {*} [data=''] Data in the LocalStorage.
     * @memberof LocalStorageServiceProvider
     */
    setData (data = '') {
        this.data = data;
    }

    /**
     * * Get data from the LocalStorage.
     * @static
     * @param {string} name Name of the data to get.
     * @returns {LocalStorageServiceProvider}
     * @memberof LocalStorageServiceProvider
     */
    static get (name = '') {
        let instance = new this({
            name: name,
        });
        if (name && name != '' && this.has(name)) {
            instance.setData(JSON.parse(localStorage.getItem(name)));
        } else {
            console.error('The Name is required');
        }
        return instance;
    }

    /**
     * * Save data in the LocalStorage.
     * @static
     * @param {string} name Name of the data to save.
     * @param {*} data Data to save.
     * @param {boolean} overwrite If the LocalStorageServiceProvider must overwrite the data.
     * @returns {LocalStorageServiceProvider}
     * @memberof LocalStorageServiceProvider
     */
    static set (name = '', data = [], overwrite = false) {
        data = JSON.stringify(data);
        let instance = new this({
            name: name,
        }, data);
        if (name && name != '') {
            let previousData = false;
            if (name && name != '' && this.has(name)) {
                previousData = true;
            }
            if (previousData) {
                if (overwrite) {
                    localStorage.setItem(name, data);
                } else {
                    let msg = 'There is previous data in the LocalStorage';
                    instance.setState({ warning: msg });
                }
            } else {
                localStorage.setItem(name, data);
            }
        } else {
            console.error('The Name is required');
        }
        return instance;
    }

    /**
     * * Remove data from the LocalStorage.
     * @static
     * @param {string} name Name of the data to get.
     * @returns {LocalStorageServiceProvider}
     * @memberof LocalStorageServiceProvider
     */
    static remove (name = '') {
        let instance = new this({
            name: name,
        });
        if (name && name != '' && this.has(name)) {
            instance.setData(JSON.parse(localStorage.getItem(name)));
        } else {
            console.error('The Name is required');
        }
        return instance;
    }

    /**
     * * Check if LocalStorage has a data.
     * @static
     * @param {string} name Name of the data to check.
     * @returns {boolean}
     * @memberof LocalStorageServiceProvider
     */
    static has (name = '') {
        if (name && name != '') {
            if (localStorage.getItem(name) !== null) {
                return true;
            } else {
                return false;
            }
        } else {
            console.error('The Name attribute is required');
        }
    }
}