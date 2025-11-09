// Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Add comment to Firebase
function addComment(name,text){
  db.ref('comments').push({name,text});
}

// Fetch and display comments
const commentsList = document.getElementById('comments-list');
db.ref('comments').on('value', snapshot=>{
  commentsList.innerHTML='';
  snapshot.forEach(child=>{
    const data = child.val();
    const div = document.createElement('div');
    div.classList.add('comment');
    div.innerHTML = `<strong>${data.name}</strong>: ${data.text}`;
    commentsList.appendChild(div);
  });
});