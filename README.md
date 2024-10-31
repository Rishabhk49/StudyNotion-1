STUDYNOTION
StudyNotion is a comprehensive educational platform aimed at providing a seamless experience for students and educators alike. It offers a range of features that facilitate learning, collaboration, and resource sharing.

![image](https://github.com/user-attachments/assets/aa374b3c-1bd9-4fa9-9750-41aebf560e41)


DESCRIPTION
The StudyNotion project is designed to streamline the educational process. It allows users to access a variety of educational materials, collaborate on projects, and interact with educators, enhancing the learning experience. StudyNotion employs a monolithic architecture and leverages a tech stack involving React.js, Node.js, Express.js, MongoDB, Cloudinary, and Tailwind CSS.

TECHNOLOGY STACK
StudyNotion is built using the following technologies:

FRONTEND

FIGMA : Figma is a collaborative interface design tool that enables multiple users to work on designing clean and minimal user interfaces simultaneously. Its cloud-based approach makes it accessible for design teams to create, prototype, and collaborate on user interface designs.

REACT.JS : React.js is a widely used JavaScript library for building user interfaces. It allows for the creation of interactive and reusable UI components, enabling efficient rendering and managing of application state, leading to a seamless user experience.

CSS & TAILWIND : Both CSS (Cascading Style Sheets) and Tailwind CSS are styling frameworks used to create visually appealing and responsive user interfaces. CSS is the fundamental technology for styling web pages, while Tailwind CSS is a utility-first CSS framework that aids in building custom designs by composing utility classes.

REDUX : Redux is a predictable state container for JavaScript applications. It helps manage the application's state and centralizes the state logic, making it easier to maintain and manage state changes across different parts of the application.

CHART.JS : Chart.js is an open-source JavaScript charting library that allows developers to create interactive and visually appealing charts on web applications. It's easy to use and provides a variety of chart types, making data visualization more accessible and engaging for users.

BACKEND
NODE.JS : Node.js is a server-side runtime environment that allows the execution of JavaScript code outside a web browser. It is based on the V8 JavaScript engine and is designed to build scalable and fast network applications. In StudyNotion, Node.js serves as the foundational technology for the backend, facilitating the server operations, handling HTTP requests, and managing the overall application workflow.

EXPRESS.JS : Express.js is a minimal and flexible Node.js web application framework. It provides a robust set of features to build web applications and APIs. In the context of StudyNotion, Express.js simplifies routing, middleware implementation, and handling HTTP requests, allowing for efficient creation and management of backend APIs.

MONGODB : MongoDB is a popular NoSQL database that uses a flexible and JSON-like document structure. It's well-known for its scalability, flexibility, and high performance. StudyNotion leverages MongoDB to store and manage data efficiently, allowing for easy adaptation to changing data requirements and enabling seamless integration with the application.

CLOUDINARY : Cloudinary is a cloud-based media management solution that specializes in the storage, optimization, and delivery of images and videos. In StudyNotion, Cloudinary plays a crucial role in managing all media-related content, including images, videos, and documents. It provides functionalities for uploading, storage, and manipulation of media files, ensuring a reliable and scalable media management system.

ARCHITECTURE DIAGRAM
![image](https://github.com/user-attachments/assets/68bcf643-92fd-447e-a72b-084155aa7163)

SCHEMA DESIGN

![image](https://github.com/user-attachments/assets/baa14881-eac8-4ca8-9384-5ed42b9dd876)


FUNCTIONALITIES
The back end of StudyNotion provides a range of features and functionalities, including:

USER AUTHENTICATION & AUTHORIZATION: Students and instructors can sign up and log in using email addresses and passwords. The platform supports OTP (One-Time Password) verification and forgot password functionality for enhanced security.

COURSE MANAGEMENT: Instructors can create, read, update, and delete courses, manage course content, and media. Students can view and rate courses.

PAYMENT INTEGRATION: Students can purchase and enroll in courses by completing the checkout flow that includes Razorpay integration for payment handling.

CLOUD-BASED MEDIA MANAGEMENT: StudyNotion utilizes Cloudinary, a cloud-based media management service, to store and manage all media content, including images, videos, and documents.

MARKDOWN FORMATTING: Course content is stored in Markdown format, allowing easier display and rendering on the front end.


FRONTEND

The front end of StudyNotion is designed using Figma, a popular design tool that allows for the creation of clean and minimal user interfaces. It comprises various pages for Students, Instructors, and potential Admin functionalities:

STUDENT

HOMEPAGE: Brief introduction to the platform with links to the course list and user details.

COURSE LIST: Displays all available courses with descriptions and ratings.

WISHLIST: Shows courses added to the student's wishlist.

CART CHECKOUT: Allows users to complete the course purchase.

COOURSE CONTENT: Displays course material, including videos and related content.

USER DETAILS: Contains information about the student's account.

USER EDIT DETAILS: Enables students to edit their account details.


INSTRUCTOR

DASHBOARD: Overview of the instructor's courses, including ratings and feedback.

INSIGHTS: Detailed metrics of the instructor's courses.

COURSE MANAGEMENT PAGES: Creation, update, and deletion of courses, as well as managing content and pricing.

VIEW & EDIT PROFILE DETAILS: View and edit account details.

ADMIN (Future Scope)

DASHBOARD: Overview of the platform's courses, instructors, and students.

INSIGHTS: Detailed metrics of the platform, including user count, courses, and revenue.

INSTRUCTOR MANAGEMENT: Admin access to manage instructors, their account details, courses, and ratings.

MISCELLANEOUS Access to user and course management pages.
