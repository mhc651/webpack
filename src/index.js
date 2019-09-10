import _ from 'lodash';
import './style/index.css'
import './style/a.scss'
import axios from  'axios'
function createDomElement(){
    var dom = document.createElement("div")
    dom.innerHTML = _.join(['aicoder.com',' 好! ','线下实习的'],'')
    dom.className = 'box'
    return dom
}
var divDom = createDomElement()
document.body.appendChild(divDom)
let aaa = 23
let bbb = 90
let ccc = 100
let [aone,bone,cone] = [1,2,3]
let getData=()=>{
    let kko = 98000
    alert(kko);
}
console.log("aaaval",aaa)
console.log("aone",aone)
