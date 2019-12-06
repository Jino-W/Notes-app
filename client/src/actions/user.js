import axios from '../config/axios'

export const startUserRegister=(data, props)=>{
    return ()=>{axios.post('/users/register',data)
        .then(response=>{
            if(!response.data._id){
                alert('User already exists!!')
            }else{
                props.history.push('/users/login')
            }
        })
    }
    
}

export const startUserLogin=(data, props)=>{
    return ()=>{axios.post('/users/login',data)
    .then(response=>{
        if(response.data.hasOwnProperty('errors')){
            alert(response.data.errors)
        }else{
            const token=response.data.token
            localStorage.setItem('authToken',token)
            props.history.push('/')
            window.location.reload()
        }
    })
    .catch(err=>{
        alert(err)
    })
}
}




// export const startUserLogout=()=>{
//     return ()=>{
//         axios.delete('/users/logout', {
//             headers:{
//                 "x-auth" : localStorage.getItem("authToken")
//             }
//         })
//             .then(response=>{
//                 localStorage.removeItem("authToken")
//                 window.location.href = "/"   
//             })
//             .catch(err=>{
//                 alert(err)
//             })
//         }
// }