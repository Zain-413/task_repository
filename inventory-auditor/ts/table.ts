export class GenericTable<T>{

data:T[]

constructor(data:T[]){

this.data=data

}

render(){

console.log(this.data)

}

}