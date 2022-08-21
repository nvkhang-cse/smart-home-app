import messHandler from '../mqtt/messHandler';
export default async function getData(key){
    return messHandler.getData(key);
}