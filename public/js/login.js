//listens to the button click and then sends a fetch POST request with passed in data in the body
//depending on what is sent back ( for verification ) it will either redirect to the dashboard  or stay at login because you got login
//creditials incorrect
document.querySelector("#loginForm").addEventListener("click",e=>{
    e.preventDefault();
    const loginObj = {
        email:document.querySelector("#loginEmail").value,
        password:document.querySelector("#loginPassword").value
    }
    console.log(loginObj);
    fetch("/api/users/login",{
        method:"POST",
        body:JSON.stringify(loginObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
           location.href="/dashboard"
        } else {
            alert("Wrong Login combination!")
        }
    })
})