// document.addEventListener('DOMContentLoaded',()=>{
//     getGroups()
//     createGroup()
// })
// function getGroups(){
//     const groupul=document.getElementById('groups')
//     const token=localStorage.getItem('token')
//     axios.get('http://localhost:3000/getgroups',{
//         headers:{"Authorization":token}
//     }).then(ress=>{
//         let data=ress.data
//         for(let i=0;i<data.length;i++){
//             groupul.innerHTML=groupul.innerHTML +`<li>
//             <a href="./home.html?groupid=${data[i].id}">
//             <p>${data[i].groupname}</p>
//             </a>
//             </li>`
//         }
//         console.log(ress)
//     })
// }
// function createGroup(){
//     const creategroupname=document.getElementById('creategroupname')
//     const creategroupbtn=document.getElementById('creategroupbtn')
//     creategroupbtn.addEventListener('click',()=>{
//         console.log(creategroupname.value)
//         const token=localStorage.getItem('token')
//         axios.post('http://localhost:3000/creategroup',{
//             groupname:creategroupname.value,
//         },{
//             headers:{"Authorization":token}
//         }).then(ress=>{
//             console.log(ress)
//         })
//     })



// }
const token=localStorage.getItem('token')
const grouplist=document.querySelector('#items')
document.addEventListener('DOMContentLoaded',(e)=>{
    e.preventDefault()
    axios.get('http://localhost:3000/getgroups',{
        headers:{"Authorization":token}
    }).then(ress=>{
        console.log(ress.data)
        //let data=ress.data
        let groups=ress.data.groups
        for(let i=0;i<groups.length;i++){
            let li=document.createElement('li')
            li.className='list-group-item'
            li.innerHTML=li.innerHTML+`
            <a  href="./home.html?grpId=${groups[i].id} ">
            ${groups[i].groupname}
            
           <p id="created">Created : ${groups[i].createdAt.slice(0,10)}</p>
           </a> `
           
            grouplist.appendChild(li)
        }
        
    })
})
let logoutBtn=document.querySelector('#logout')
logoutBtn.addEventListener('click',(e)=>{
    localStorage.clear()
    window.location.replace('./login.html')
})
const createGrpBtn=document.getElementById('submit-btn')
createGrpBtn.addEventListener('click',()=>{
    const grpName=(document.getElementById('group')).value
    if(grpName==''){
        grpName.placeholder='Please enter group name'
        grpName.classList.add('empty')
    }else{
        axios.post('http://localhost:3000/creategroup',{
            groupname:grpName
        },{
            headers:{"Authorization":token}
        }).then(ress=>{
            console.log(ress)
        })
    }
})
    

    
