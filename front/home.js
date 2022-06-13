const messagebtn=document.getElementById('addmsgbtn')
const messageinput=document.getElementById('messageinput')
document.addEventListener('DOMContentLoaded',()=>{
    axios.get('http://localhost:3000/getmessage').then(data=>{
        const dataa=data.data
        const message_cont_ul=document.getElementById('message_cont_ul')
        for(let i=0;i<dataa.length;i++){
            message_cont_ul.innerHTML=message_cont_ul.innerHTML+`<li>${dataa[i].username}:${dataa[i].msg}</li>`
        }
    })
})
messagebtn.addEventListener('click',(e)=>{
    e.preventDefault()
    const token =localStorage.getItem('token')
    let msg=messageinput.value;
    console.log(messageinput.value)
    messageinput.value=""
    axios.post('http://localhost:3000/addmessage',{msg:msg},
    {headers:{"Autorization":token}
    }).then(res=>{
        console.log(res)
    })
})