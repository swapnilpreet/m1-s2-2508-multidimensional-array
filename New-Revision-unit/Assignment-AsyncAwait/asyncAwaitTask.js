function fetchUser(){
    const response=new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve({ id: 1, name: "Jane Doe" });
        },1500)
    })
    return response;
}

function fetchPosts(userId){
    const data=[
        { postId: 101, title: "Post One" },
        { postId: 102, title: "Post Two" }
    ]
    const response=new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(data)
        },2000)
    })
    return response;
}

async function getUserAndPosts(){
    let obj={}
    try {
        const user = await fetchUser();
        const posts = await fetchPosts(user.id);

        if(!user || !posts){
            throw new Error("Failed to get Data")
        }else{
            obj={
                user:user,
                posts:posts
            }
            console.log(obj);
            console.log("All data fetched successfully");
            
        }
    } catch (error) {
        console.log(error)
    }
}
getUserAndPosts()