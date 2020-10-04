export class LocalStorageServiceProvider{
    constructor(properties = {
        name: undefined,
    }, data = undefined){
        this.setProperties(properties);
        this.setData(data);
    }

    setProperties(properties = {
        name: undefined,
    }){
        this.properties = {};
        this.setName(properties);
    }

    setData(data = undefined){
        this.data = data;
    }

    setName(properties = {
        name: undefined,
    }){
        this.properties.name = properties.name;
    }

    checkData(){
        if(this.data){
            return true;
        }else{
            return false;
        }
    }

    static getData(name = undefined){
        let instance = new this({
            name: name,
        });
        if(localStorage.getItem(name)){
            instance.setData(localStorage.getItem(name));
        }else{
            console.error('No pasaste los datos man...');
        }
        return instance;
    }

    static setData(name = undefined, data){
        data = JSON.stringify(data);
        let instance = new this({
            name: name
        }, data);
        if(name != undefined){
            localStorage.setItem(name, data);
        }else{
            console.error('No pasaste los datos man...');
        }
        return instance;
    }
}