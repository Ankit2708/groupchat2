const Group=require('../models/group')
const User=require('../models/user')
const userGroup=require('../models/userGroup')
const createGroup=(req,res)=>{
    let groupname=req.body.groupname
    //let users=req.body.users
    req.user.createGroup({
        groupname:groupname,
        //users:req.user.id.toString()
    }).then(ress=>{
        // res.status(200).json('group added')
        userGroup.update({isAdmin:true},{where:{userId:req.user.id}})
        .then(result=>{
            res.status(200).json('group added')
        })

    }).catch(err=>{
        console.log(err)
    })
}
const getGroup=(req,res)=>{
    // Group.findAll().then(groups=>{
    //     res.status(200).json(groups)
    // }).catch(err=>{
    //     console.log(err)
    // })
    console.log(req.user.id)
    req.user.getGroups()
    .then(groups=>{
        res.status(200).json({groups})
    }).catch(err=>{
        console.log(err)
    })
}
// const addusertoGroup=async(req,res)=>{
//     const groupid=req.body.groupid
//     const useremail=req.body.user
//     let usertoadd;
//     await User.findOne({where:{email:useremail}}).then(userdata=>{
//         usertoadd=userdata.id
//     }).catch(err=>{
//         res.json(err)
//     })
//     console.log(usertoadd)
//     Group.findByPk(groupid).then((group=>{
//         let name=group.groupname
//         let ans= group.users.split(',')
//         ans.push(usertoadd)
//         let ans2=ans.join()
//         group.update({groupname:"name",users:ans2})
//         return res.status(200).json("user added")
//     })).catch(err=>{
//         res.status(404).json(err)
//     })
// }
const getIsAdmin =(req,res)=>{
    const groupid= req.query.grpId
    userGroup.findOne({where:{
        userId:req.user.id,
        groupid:groupid
    }})
    .then(user=>{
        res.status(200).json({user})
    }).catch(err=>{
        console.log(err)
    })
}
module.exports={createGroup,getGroup,getIsAdmin}