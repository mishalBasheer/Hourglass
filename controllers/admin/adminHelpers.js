import Admin from "../../models/adminModel.js";

const adminLoginCheck = (adminData)=>{
    return new Promise (async(resolve,reject)=>{
        let response={};
        let admin= await Admin.findOne({email:adminData.email})
        if(admin){
            bcrypt.compare(adminData.password,admin.password).then((status)=>{
                if(status){
                    response.admin=admin;
                    response.status=true;
                    resolve(response);
                }else{
                    resolve({status:false});
                }
            })
        }else{
            resolve({status:false});
        }
    })
    
}

export {adminLoginCheck};