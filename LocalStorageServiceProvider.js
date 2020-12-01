/**
 * * LocalStorageServiceProvider gives an excellet LocalStorage Service.
 * @export
 * @class LocalStorageServiceProvider
 */
export class LocalStorageServiceProvider{
    /**
     * * Creates an instance of LocalStorageServiceProvider.
     * @param {Object} properties LocalStorageServiceProvider properties:
     * @param {String} properties.name LocalStorage data name.
     * @param {*} data Data saved in the LocalStorage.
     * @memberof LocalStorageServiceProvider
     */
    constructor(properties = {
        name: '',
    }, data = undefined){
        this.setProperties(properties);
        this.setStatus();
        this.setData(data);
    }

    /**
     * * Set the LocalStorageServiceProvider properties.
     * @param {Object} properties LocalStorageServiceProvider properties:
     * @param {String} properties.name LocalStorage data name.
     * @memberof LocalStorageServiceProvider
     */
    setProperties(properties = {
        name: '',
    }){
        this.properties = {};
        this.setNameProperty(properties);
    }

    /**
     * * Returns the LocalStorageServiceProvider properties or an specific property.
     * @param {String} property Property name.
     * @returns {Object|*}
     * @memberof LocalStorageServiceProvider
     */
    getProperties(property = ''){
        if (property && property != '') {
            return this.properties[property];
        } else {
            return this.properties;
        }
    }

    /**
     * * Set the LocalStorage data name.
     * @param {Object} properties LocalStorageServiceProvider properties:
     * @param {String} properties.name LocalStorage data name.
     * @memberof LocalStorageServiceProvider
     */
    setNameProperty(properties = {
        name: '',
    }){
        if (properties.hasOwnProperty('name')) {
            this.properties.name = properties.name;
        } else {
            this.properties.name = '';
        }
    }

    /**
     * * Returns the LocalStorageServiceProvider data name.
     * @returns {String}
     * @memberof LocalStorageServiceProvider
     */
    getNameProperty(){
        return this.properties.name;
    }

    /**
     * * Set the LocalStorageServiceProvider status.
     * @memberof LocalStorageServiceProvider
     */
    setStatus(){
        this.status = {};
    }

    /**
     * * Returns the LocalStorageServiceProvider status or an specific property.
     * @param {String} property Status property name.
     * @returns {Object|*}
     * @memberof LocalStorageServiceProvider
     */
    getStatus(property = ''){
        if (property && property != '') {
            return this.status[property];
        } else {
            return this.status;
        }
    }

    /**
     * * Set the LocalStorageServiceProvider warning status.
     * @param {Object} status LocalStorageServiceProvider status.
     * @param {String} status.warning LocalStorageServiceProvider warning status message.
     * @memberof LocalStorageServiceProvider
     */
    setWarningStatus(status = {
        warning: '',
    }){
        if (status.hasOwnProperty('warning')) {
            this.status.warning = status.warning;
        } else {
            this.status.warning = '';
        }
    }

    /**
     * * Returns the LocalStorageServiceProvider warning status.
     * @returns {String}
     * @memberof LocalStorageServiceProvider
     */
    getWarningStatus(){
        return this.status.warning;
    }

    /**
     * * Set the LocalStorageServiceProvider data.
     * @param {*} data Data in the LocalStorage.
     * @memberof LocalStorageServiceProvider
     */
    setData(data = undefined){
        this.data = data;
    }

    /**
     * * Returns the LocalStorageServiceProvider data.
     * @returns {*}
     * @memberof LocalStorageServiceProvider
     */
    getData(){
        return this.data;
    }

    /**
     * * Get data from the LocalStorage.
     * @static
     * @param {string} name Name of the data to get.
     * @returns {LocalStorageServiceProvider}
     * @memberof LocalStorageServiceProvider
     */
    static getData(name = undefined){
        let instance = new this({
            name: name,
        });
        if(this.hasData(name)){
            instance.setData(JSON.parse(localStorage.getItem(name)));
        }else{
            console.error('The Name is required');
        }
        return instance;
    }

    /**
     * * Save data in the LocalStorage.
     * @static
     * @param {String} name Name of the data to save.
     * @param {*} data Data to save.
     * @param {Boolean} overwrite If the LocalStorageServiceProvider must overwrite the data.
     * @returns {LocalStorageServiceProvider}
     * @memberof LocalStorageServiceProvider
     */
    static saveData(name = '', data = undefined, overwrite = false){
        data = JSON.stringify(data);
        let instance = new this({
            name: name,
        }, data);
        if(name != undefined){
            let previousData = false;
            if(this.hasData(name)){
                previousData = true;
            }
            if(previousData){
                if(overwrite){
                    localStorage.setItem(name, data);
                }else{
                    let msg = 'There is previous data in the LocalStorage';
                    instance.setWarningStatus({
                        warning: msg,
                    });
                }
            }else{
                localStorage.setItem(name, data);
            }
        }else{
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
    static removeData(name = undefined){
        let instance = new this({
            name: name,
        });
        if(this.hasData(name)){
            instance.setData(JSON.parse(localStorage.getItem(name)));
        }else{
            console.error('The Name is required');
        }
        return instance;
    }

    /**
     * * Check if LocalStorage has a data.
     * @static
     * @param {String} name Name of the data to check.
     * @returns {Boolean}
     * @memberof LocalStorageServiceProvider
     */
    static hasData(name = ''){
        if(name && name != ''){
            if(localStorage.getItem(name) !== null){
                return true;
            }else{
                return false;
            }
        }else{
            console.error('The Name attribute is required');
        }
    }
}