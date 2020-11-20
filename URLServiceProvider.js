/**
 * * URLServiceProvider gives an excellent URL service.
 * @export
 * @class URLServiceProvider
 */
export class URLServiceProvider{
    /**
     * * Returns the URL #hash parameter if exist.
     * @static
     * @returns {String|false}
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
     * * Returns the URL parameters or an specific parameter.
     * @static
     * @param {String} paramenter Parameter name.
     * @returns {Array|String}
     * @memberof URLServiceProvider
     */
    static findGetParameter(paramenter = ''){
        var result = false;
        let parameters = window.location.href.split('?').pop().split('&');
        let auxParams = []
        for(let param of parameters){
            auxParams.push({key: param.split('=').shift(), value: param.split('=').pop()});
            if (/=/.exec(param)) {
                if(param.split('=').shift() == paramenter){
                    result = param.split('=').pop();
                }
            } else {
                if(param == paramenter){
                    result = true;
                }
            }
        }
        if(paramenter != ''){
            return result;
        }else{
            return auxParams;
        }
    }

    /**
     * * Returns the route path name without the #hash.
     * @static
     * @returns {String}
     * @memberof URLServiceProvider
     */
    static findOriginalRoute(){
        return window.location.pathname;
    }
}