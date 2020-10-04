/**
 * * URLServiceProvider controls the URL correctly.
 * @export
 * @class URLServiceProvider
 */
export class URLServiceProvider{
    /**
     * * Returns the URL #hash.
     * @static
     * @returns
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
     * @param {*} parameterName
     * @returns
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
     * * Returns the route without the #hash.
     * @static
     * @memberof URLServiceProvider
     */
    static findOriginalRoute(){
        return window.location.pathname;
    }
}