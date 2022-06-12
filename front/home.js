const messagebtn=document.getElementById('addmsgbtn')
const messageinput=document.getElementById('messageinput')
messagebtn.addEventListener('click',()=>{
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