class ConvertRequest {
    convert(type, data) {
        switch(type) {
            case "light": return this.convertLight(data); break;
            case "temp-humid": return this.convertTempHumid(data); break;
            case "magnetic": return this.convertMagnetic(data); break;
            case "gas": return this.convertGas(data); break;
            case "relay": return this.convertRelay(data); break;
        }
    }
    convertLight(data) {
        return {
            "id": data.key,
            "name": data.name.split(' ')[0],
            "data": data.state,
            "unit": ""
        }
    }
    convertTempHumid(data) {
        return {
            "id": data.key,
            "name": data.name.split(' ')[0],
            "data": data.state,
            "unit": ""
        }
    }
    convertMagnetic(data) {
        return {
            "id": data.key,
            "name": data.name.split(' ')[0],
            "data": data.state,
            "unit": ""
        }
    }
    convertGas(data) {
        return {
            "id": data.key,
            "name": data.name.split(' ')[0],
            "data": data.state,
            "unit": ""
        }
    }
    convertRelay(data) {
        return {
            "id": data.key,
            "name": "RELAY",
            "data": data.state,
            "unit": ""
        }
    }
}

export default new ConvertRequest();