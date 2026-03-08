export function debounce(func,delay){

let timer

return function(...args){

clearTimeout(timer)

timer=setTimeout(()=>{

func.apply(this,args)

},delay)

}

}


export function throttle(func,limit){

let waiting=false

return function(){

if(!waiting){

func.apply(this,arguments)

waiting=true

setTimeout(()=>waiting=false,limit)

}

}

}