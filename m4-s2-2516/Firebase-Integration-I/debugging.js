const deleteUser=(key)=>{
    fetch(`https://your-project-id.firebaseio.com/users/key/${key}.json`, {
      method: 'DELETE',
    })
    .then(response=>response.json())
    .then(()=>{
      console.log("User deleted successfully");
    })
    .catch(error=>console.error("Error deleting user:", error));
  };
  
// error occured in url when we want to delete any user so we have to pass that user id without passing a id we can not delete user