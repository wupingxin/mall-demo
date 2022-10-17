import axios from "axios";

//创建axios实例
const service = axios.create({
    baseURL: "https://www.fastmock.site/mock/bf1fcb3c2e2945669c2c8d0ecb8009b8/api",
    timeout: 5000,
    headers: {
        "Content-type" : "application/json;charset=utf-8"
    }
})

//请求拦截
service.interceptors.request.use((config) => {
    config.headers = config.headers || {}   // 如果header找不到或没有创建，则在使用之前赋一个config里的header或一个空对象。  该代码是为了后续如果没有创建header而执行的方法
    if(localStorage.getItem("token")){
        config.headers.token = localStorage.getItem("token") || ""   //token只支持string和null的类型，在未登陆的情况下取不到token的值赋给它一个空字符串
    }

    // 请求拦截处理之后要将config return出去， 返回给service内部，完成请求后续的一系列操作
    return config
})

//响应拦截
service.interceptors.response.use((res) => {
    // 请求成功的回调
    const code : number = res.data.code
    if(code != 200){
        return Promise.resolve(res.data)
    }
    return res.data
},(err) => {
    console.log(err)
})

export default service