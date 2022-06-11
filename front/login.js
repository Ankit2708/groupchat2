const formm=document.getElementById('formelement')
document.addEventListener('DOMContentLoaded',()=>{
    token=localStorage.getItem('token')
    if(token){
        window.location.replace('home.html')
    }
})
formm.addEventListener('submit',e=>{
    e.preventDefault()
    const email=e.target.email.value;
    const password=e.target.password.value
    let userDetails={
        email,
        password
    }
})
axios.post('http://localhost:3000/login',userDetails).then(response=>{
    if(response.status===201){
        alert(response.data.message)
        localStorage.setItem("token",response.data.Accesstoken)
        window.location.replace('/home.html')
    }else{
        document.getElementById('password').value=""
    }
}).catch(err=>{
    alert('login failed try again')
})