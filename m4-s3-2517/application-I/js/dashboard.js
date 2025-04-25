import { auth, db } from "../firebase-config.js";
import {
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

import {
  doc,
  getDocs,
  getDoc,
  setDoc,
  collection,
  addDoc,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";


document.addEventListener("DOMContentLoaded",async()=>{
    const notesList=document.getElementById('notes-list');
    const noteInput=document.getElementById('note-input');
    const notebtn=document.getElementById('add-note-btn');

    let currentUser=null;

    onAuthStateChanged(auth,async(user)=>{
        if(user){
            currentUser=user
            document.getElementById('user-email').innerText=currentUser.email;

            // fetch user information
            const userDoc=await getDoc(doc(db,"users",user.uid));
            if(userDoc.exists()){
                const role=userDoc.data().role;
                document.getElementById('user-role').innerText=role;


                // loads notes
                loadNotes(user,role)
            }
        }else{
            // regirect user if not login 
            window.location.href='index.html'
        }
    })

    // load notes
    async function loadNotes(user,role) {
        notesList.innerHTML="";
        const notesref=collection(db,"notes");
        // fetch all the notes

        const querysnapshot=await getDocs(notesref);

        querysnapshot.forEach((doc)=>{
            const noteData=doc.data();
            displaynote(doc.id,noteData,user.uid,role)
        })
    }
    
    function displaynote(id,data,userId,role) {
        const noteDiv=document.createElement('div');
        noteDiv.classList.add('note');

        const noteconent=document.createElement('p');
        noteconent.innerText=`By:${data.content}`

        const noteower=document.createElement('small');
        noteower.innerText=`By:${data.userEmail}`

        noteDiv.append(noteconent,noteower)

        console.log()
        if(data.userId===userId || role==='admin'){
            const editbtn=document.createElement('button')
            editbtn.innerText="Edit"
            editbtn.classList.add('edit-btn');

            editbtn.onclick=()=>{
                const edittextarea=document.createElement('textarea');
                edittextarea.value=noteconent.innerText;

                const savebtn=document.createElement('button');
                savebtn.innerText="Save";
                savebtn.classList.add("save-btn");
                savebtn.onclick=async()=>{
                    const newContent=edittextarea.value.trim();

                    if(newContent != ""){
                        await setDoc(doc(db,'notes',id),{
                            ...data,content:newContent
                        })
                        noteconent.innerText=newContent;
                        noteDiv.replaceChild(newContent,edittextarea);
                        noteDiv.replaceChild(savebtn,editbtn);
                    }
                }
                noteDiv.replaceChild(edittextarea,noteconent)
                noteDiv.replaceChild(savebtn,editbtn)
            }
            const deleteBtn=document.createElement('button');
            deleteBtn.innerText='Delete';
            deleteBtn.classList.add('delete-btn');
            deleteBtn.onclick=async()=>{
                await deleteDoc(doc(db,'notes',id));
                noteDiv.remove();
            }
            
            
            noteDiv.appendChild(deleteBtn)
            noteDiv.appendChild(editbtn)
        }
        
        notesList.appendChild(noteDiv);
    }



    notebtn.addEventListener('click',async()=>{
        const content = noteInput.value.trim();

        if(content==="") return;

        await addDoc(collection(db,"notes"),{
            content,
            userId:currentUser.uid,
            userEmail:currentUser.email,
            createAt: new Date()
        })

        noteInput.value="";
        loadNotes(currentUser,document.getElementById("user-role").innerText)
    })
})