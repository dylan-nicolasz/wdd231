
const menuButton = document.querySelector("#menu-btn");
const primaryNav = document.querySelector("#primary-nav");

menuButton.addEventListener("click", () => {
    primaryNav.classList.toggle("open");
    menuButton.textContent = primaryNav.classList.contains("open") ? "❌" : "☰";
});



const currentYearSpan = document.querySelector("#currentyear");
if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
}

// Display last modified date
const lastModifiedParagraph = document.querySelector("#lastModified");
if (lastModifiedParagraph) {
    lastModifiedParagraph.textContent = `Last Modified: ${document.lastModified}`;
}


const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the basic concepts of program structure, data types, and algorithms.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to basic web design principles using HTML and CSS.',
        technology: ['HTML', 'CSS'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Students learn to write functions, handle exceptions, and work with files in Python.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 212,
        title: 'Programming with Data Structures',
        credits: 3,
        certificate: 'Web and Computer Programming',
        description: 'Covers data structures like stacks, queues, sets, maps, trees, and algorithm design.',
        technology: ['C#'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Focuses on creating dynamic web applications using JavaScript and DOM manipulation.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Web Frontend Development I',
        credits: 3,
        certificate: 'Web and Computer Programming',
        description: 'Advanced user experience design using modern web technologies and API Integration.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    }
];


const coursesContainer = document.querySelector("#courses-container");
const totalCreditsElement = document.querySelector("#total-credits");


function displayCourses(courseList) {
    coursesContainer.innerHTML = ""; // Clear existing output

    courseList.forEach(course => {
        const card = document.createElement("div");
        card.classList.add("course-card");
        
   
        if (course.completed) {
            card.classList.add("completed");
        }

        card.textContent = `${course.subject} ${course.number}`;
        coursesContainer.appendChild(card);
    });


    displayTotalCredits(courseList);
}


function displayTotalCredits(courseList) {
    const totalCredits = courseList.reduce((accumulator, course) => {
        return accumulator + course.credits;
    }, 0);

    totalCreditsElement.textContent = `The total credits for courses listed above is ${totalCredits}`;
}


document.querySelector("#all-btn").addEventListener("click", () => {
    displayCourses(courses);
});

document.querySelector("#cse-btn").addEventListener("click", () => {
    const cseCourses = courses.filter(course => course.subject === "CSE");
    displayCourses(cseCourses);
});

document.querySelector("#wdd-btn").addEventListener("click", () => {
    const wddCourses = courses.filter(course => course.subject === "WDD");
    displayCourses(wddCourses);
});

// Initial display load (renders 'All' courses on page startup)
displayCourses(courses);