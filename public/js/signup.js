//listen to the button click and then sends a fetch POST request with passed in body data to create a new account in our database
//then it redirects dashboard page

document.querySelector("#signupForm").addEventListener("click",e=>{
    e.preventDefault();
    const signupObj = {
        email:document.querySelector("#signupEmail").value,
        password:document.querySelector("#signupPassword").value
    }
    fetch("/api/users",{
        method:"POST",
        body:JSON.stringify(signupObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
           location.href="/dashboard"
        } else {
            alert("Email already exist!")
        }
    })
})