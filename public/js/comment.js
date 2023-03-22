const blogId = window.location.href.split('/').pop();

document.querySelector("#postComment").addEventListener("click",e=>{
    e.preventDefault();
    const loginObj = {
        text:document.querySelector("#createComment").value, 
        BlogId: blogId
    }
    console.log(loginObj);
    fetch("/api/comment",{
        method:"POST",
        body:JSON.stringify(loginObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
           location.href="/post/" + blogId
        } else {
            alert("trumpet sound")
        }
    })
})