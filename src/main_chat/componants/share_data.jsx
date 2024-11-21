
export function Share_Set(kind,data) {
    return new Promise((resolve,reject)=>{
    if (kind === "set"){
        Share_Get(data)
        resolve("ok")
    }
    })
}

export function Share_Get(data) {
    return new Promise((resolve,reject)=>{
        resolve(data)
    })
}
