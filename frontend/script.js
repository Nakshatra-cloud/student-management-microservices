const AUTH_URL = "http://localhost:3001";
const STUDENT_URL = "http://localhost:3002";


async function login() {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const message = document.getElementById("login-message");

    try {

        const response = await fetch(`${AUTH_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const data = await response.json();

        message.textContent = data.message;

    } catch (error) {

        message.textContent = "Auth Service is not available.";
        console.error(error);
    }
}


async function addStudent() {

    const name = document.getElementById("studentName").value;
    const email = document.getElementById("studentEmail").value;
    const course = document.getElementById("studentCourse").value;

    if (!name || !email || !course) {
        alert("Please fill all fields.");
        return;
    }

    try {

        const response = await fetch(`${STUDENT_URL}/students`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                course: course
            })
        });

        const data = await response.json();

        alert(data.message);

        document.getElementById("studentName").value = "";
        document.getElementById("studentEmail").value = "";
        document.getElementById("studentCourse").value = "";

        loadStudents();

    } catch (error) {

        alert("Student Service is not available.");
        console.error(error);
    }
}


async function loadStudents() {

    try {

        const response = await fetch(`${STUDENT_URL}/students`);

        const students = await response.json();

        const studentList = document.getElementById("studentList");

        studentList.innerHTML = "";

        if (students.length === 0) {
            studentList.textContent = "No students found.";
            return;
        }

        students.forEach(student => {

            const studentElement = document.createElement("p");

            studentElement.textContent =
                `${student.id}. ${student.name} - ${student.email} - ${student.course}`;

            studentList.appendChild(studentElement);
        });

    } catch (error) {

        console.error(error);

        document.getElementById("studentList").textContent =
            "Student Service is not available.";
    }
}


loadStudents();