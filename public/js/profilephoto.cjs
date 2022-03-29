// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAT_gK2usAsru2XZkjAaJuSATyP2ehMqoE",
    authDomain: "page-2bfd5.firebaseapp.com",
    projectId: "page-2bfd5",
    storageBucket: "page-2bfd5.appspot.com",
    messagingSenderId: "1043631656822",
    appId: "1:1043631656822:web:46d2011a2c66a74ad2b457",
    measurementId: "G-KEZN6KB0HQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



$("uploadphoto").click(function () {
    console.log("i am in");
    uploadImage();
});

function uploadImage() {
    console.log("Uploading...");
    const ref = firebase.storage().ref();
    const file = document.querySelector("#myImage").files[0];

    const name = new Date() + '_' + file.name;

    const metadata = {
        contentType: file.type
    }

    const task = ref.child(name).put(file, metadata);

    task.then(snapshot => snapshot.ref.getDownloadURL())
        .then(url => {
            console.log(url)
            alert("Image Upload Successful ")

            const imageElement = document.querySelector('#uploadImage');
            imageElement.src = url;

        })

}
