/**
 * * URLServiceProvider controls the URL correctly.
 * @export
 * @class URLServiceProvider
 */
export class URLServiceProvider{
    /**
     * * Returns the URL #hash.
     * @static
     * @returns {String} If exist the URL hash parameter, else false.
     * @memberof URLServiceProvider
     */
    static findHashParameter(){
        let hash = /#/
        if(!hash.exec(window.location.href)){
            return false;
        }
        return window.location.href.split('#').pop().split('?').shift();
    }

    /**
     * * Returns an specific URL parameter.
     * @static
     * @param {String} parameterName Parameter name
     * @returns {String|Array} If a parameter name is given returns the parameter in case there is, else returns all the URL parameters.
     * @memberof URLServiceProvider
     */
    static findGetParameter(parameterName){
        var result = false;
        let parameters = window.location.href.split('?').pop().split('&');
        let auxParams = []
        for(let param of parameters){
            auxParams.push({key: param.split('=').shift(), value: param.split('=').pop()});
            if(param.split('=').shift() == parameterName){
                result = param.split('=').pop();
            }
        }
        if(parameterName){
            return result;
        }else{
            return auxParams;
        }
    }

    /**
     * * Returns the route pathname.
     * @static
     * @returns {String} the URL location pathname.
     * @memberof URLServiceProvider
     */
    static findOriginalRoute(){
        return window.location.pathname;
    }
}