
//listens to the button and sends a fetch post request to create a new blog post with body data
//sends the user back to the dashboard afterwards
document.querySelector("#createForm").addEventListener("click",e=>{
    e.preventDefault();
    const loginObj = {
        title:document.querySelector("#createTitle").value,
        text:document.querySelector("#createText").value
    }
    console.log(loginObj);
    fetch("/api/blog",{
        method:"POST",
        body:JSON.stringify(loginObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
           location.href="/dashboard"
        } else {
            alert("trumpet sound")
        }
    })
})