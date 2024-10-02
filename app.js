document.getElementById('fileInput').addEventListener('change', previewFile);

function previewFile() {
    const file = document.getElementById('fileInput').files[0]; // Get the file
    const preview = document.getElementById('preview'); // Select preview element
    preview.innerHTML = ''; // Clear preview area

    const fileType = file.type; // Get the file type
    let reader = new FileReader();

    // Show preview based on file type
    reader.onloadend = function () {
        if (fileType.includes('image')) {
            preview.innerHTML = `<img src="${reader.result}" alt="Image Preview" />`;
        } else if (fileType.includes('audio')) {
            preview.innerHTML = `<audio controls src="${reader.result}"></audio>`;
        } else if (fileType.includes('video')) {
            preview.innerHTML = `<video controls><source src="${reader.result}" type="${fileType}" /></video>`;
        } else if (fileType.includes('pdf')) {
            preview.innerHTML = `<embed src="${reader.result}" type="application/pdf" />`;
        }
    };

    if (file) {
        reader.readAsDataURL(file); // Read file for preview
    }
}

// Handle form submission (file upload)
document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting normally
    const file = document.getElementById('fileInput').files[0];
    if (file) {
        alert("File upload successful! (Currently simulated)");
        // You can later integrate a real API to send this file
    } else {
        alert("Please upload a file.");
    }
});
// Function to upload and manipulate image via Cloudinary
function uploadToCloudinary(file) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'your_upload_preset');  // Cloudinary preset

    // Send file to Cloudinary API using fetch
    fetch('https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log("File uploaded successfully:", data);
        // Display manipulated image
        document.getElementById('fileDetails').innerHTML = `
            <h3>Uploaded Image</h3>
            <img src="${data.secure_url}" alt="Cloudinary Image" />
        `;
    })
    .catch(error => console.error("Error uploading to Cloudinary:", error));
}

// Modify the form submission handler to use the Cloudinary API
document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const file = document.getElementById('fileInput').files[0];
    if (file) {
        uploadToCloudinary(file);  // Call Cloudinary upload function
    } else {
        alert("Please upload a file.");
    }
});
function login(username, password) {
    if (username === 'user' && password === 'pass') {
        localStorage.setItem('authenticated', true);
        alert('Login successful');
    } else {
        alert('Invalid credentials');
    }
}

function checkAuth() {
    if (localStorage.getItem('authenticated')) {
        alert('You are logged in');
    } else {
        alert('Please log in');
    }
}

// Call checkAuth on page load
checkAuth();
