export function auditCounter(){

let count=0

return function(){

count++

return count

}

}