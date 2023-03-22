

const editId = window.location.href.split('/').pop();


//listens to the button and sends a fetch PUT request at the indexed blog post to edit a existing data in our mysql table with data in the body
//sends the user back to the dashbaord afterwards
document.querySelector("#editForm").addEventListener("click",e=>{
    e.preventDefault();
    const loginObj = {
        title:document.querySelector("#editTitle").value,
        text:document.querySelector("#editText").value
    }
    console.log(loginObj);
    fetch("/api/blog/"+editId,{
        method:"PUT",
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

//listens to the delete button and sends a fetch DELETE request to delete the indexed blog post
//send the users back to dashboard after
document.querySelector("#deleteForm").addEventListener("click",e=>{
    fetch("/api/blog/"+editId,{
        method:"DELETE",
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