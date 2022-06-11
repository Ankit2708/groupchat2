document.addEventListener('DOMContentLoaded',()=>{
    const signup=document.getElementById('signup')
    signup.addEventListener('click',(e)=>{
    
    const name=document.getElementById('name').value
    const email=document.getElementById('email').value
    const phoneNumber=document.getElementById('phoneNumber').value
    const password=document.getElementById('password').value
    let userDetails={
        name:name,
        email:email,
        phoneNumber:phoneNumber,
        password:password
    }
    axios.post('http://localhost:3000/signup',userDetails).then(result=>{
        if(result.status===201){
            alert('Successful signed up')
            window.location.replace="login.html"
        }else{
            throw new Error('Failed to login')
        }
        console.log(result)
        alert(result)
        //window.location.replace="login.html"
    })
})
})