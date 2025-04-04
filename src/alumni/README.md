# Alumni Management Project
---
---

## Alumni Management API

Working of API's for managing alumni profiles, events, professional information, and achievements etc are given below.

## Table of Contents
1. [Running the Application](#running-the-application)
2. [ENV FILE STRUCTURE](#env-file-structure)
3. [SCHEMA](#schema)
4. [API ENDPOINTS](#api-endpoints)
    - [Users API](#user-endpoints)
    - [Events API](#events-endpoints)
    - [Achievements API](#achievements-endpoints)
    - [Professional Information API](#professional-informations-endpoints)
    - [Interview Experience API](#interview-experience-endpoints)
    - [News API](#news-endpoints)
    - [Notice API](#notice-endpoints)
    - [Album API](#album-endpoints)
    - [Jobs Api](#jobs-posting-endpoints)
    - [Jobs Applications Api](#job-application-endpoints)
    - [Mentorship Program Api](#mentorship-programs)
    - [Mentorship Program Application Api](#mentorship-program-applications-endpoints)


## Running the Application

- Ensure you have Node.js and npm/yarn installed on your machine.
- Install all required dependencies for the NestJS project, including Prisma and its SQL connector
    ```
        npm install
    ```
- Run database migrations using Prisma to sync the schema with the database:
    ```
        npx prisma migrate dev
    ```
- Use the following command to start the server:

    ```
        nest start --watch
    ```

## .env File Structure
Create a `.env` file in the root directory of the project with the following structure:

```env

  # Database Configuration
  DATABASE_URL=mysql://<username>:<password>@localhost:<portnumber>/<dbName>
  PORT=port-number
  MAIL_USER = senders-email
  MAIL_PASSWORD = sender-email-password
  ADMIN_MAIL = admin-email
```

## SCHEMA

<details>
    <summary> Click to expand / collapse </summary>

  ```json
    model Faculty {
        facultyId         Int      @id @default(autoincrement())
        name              String
        department        String
        specialization    String
        joiningDate       DateTime
        resigningDate     DateTime
        phone             String   @unique
        email             String   @unique
        position          String
        designation       String
        profilePictureUrl String
        others String
        isActiveFaculty Boolean @default(true)
        users      User[]  @relation("FacultyUsers")
        createdAt  DateTime @default(now())
        updatedAt  DateTime @updatedAt
        facultySociety SocietyProfile[] @relation("SocietyFaculty")
        mentorshipPrograms MentorshipProgram[] @relation("FacultyToMentorship")
    }

    model User {
        userId                   Int                       @id @default(autoincrement())
        societyId                Int
        firstName                String
        lastName                 String
        email                    String                    @unique
        mobile                   String                    @unique
        enrollmentNumber         Int                    @unique
        password                 String
        section                  String
        role                     Role
        branch                   String
        passingYear              Int
        fathersName              String
        mothersName              String
        hobby                    String
        parentsPhone             String
        isApproved               Boolean                   @default(false)
        isVerified               Boolean                   @default(false)
        profilePictureUrl        String?
        githubProfileUrl         String?
        linkedInProfileUrl       String?
        twitterProfileUrl        String?
        gfgProfileUrl            String?
        codingNinjaProfileUrl    String?
        leetcodeProfileUrl       String?
        codeforcesProfileUrl     String?
        instagramProfileUrl      String?
        createdAt                DateTime                  @default(now())
        updatedAt                DateTime                  @updatedAt
        facultyId                Int
        faculty                  Faculty                @relation("FacultyUsers", fields: [facultyId], references: [facultyId])
        achievements             Achievement[]             @relation("UserAchievements")
        professionalInformations ProfessionalInformation[] @relation("UserProfessionalInformation")
        interviewExperiences     InterviewExperience[] @relation("UserInterviewExperience")
        eventsAttended           EventAttendee[] @relation("UserToEventAttendees")
        equipmentComplaints      EquipmentHistory[] @relation("UserToEquipment")
        societyTestimonials      SocietyTestimonial[] @relation("UserinSocietyTestimonial")
        societyMember            SocietyMember[] @relation("SocietyMember")
        societyUser              SocietyProfile[] @relation("SocietyUsers")
        jobPosting               JobsPosting[] @relation("UserJobsPosting")
        societyStudentAchievement StudentAchievement[] @relation("SocietyStudentAchievement")
        studentMarkings StudentMarking[] @relation("SocietyStudentMarking")
        jobsApplication JobApplication[] @relation("UserToJobsApplication")
        mentorshipPrograms MentorshipProgram[] @relation("UserToMentorship")
        mentorshipApplications MentorshipApplication[] @relation("UserMentorshipApplication")
    }

    model Album {
        albumId        Int      @id @default(autoincrement())
        albumName      String
        albumDescription String
        albumThumbnail String
        images AlumniImages[] @relation("AlbumImages")
    }
    model AlumniImages {
        imageId Int      @id @default(autoincrement())
        imageTitle String
        imageDescription String
        imageUrl String
        albumId Int 
        album Album @relation("AlbumImages", fields: [albumId], references: [albumId], onDelete: Cascade)
    } 

    model ProfessionalInformation {
        professionalInformationId Int       @id @default(autoincrement())
        userId                    Int
        companyName               String
        position                  String
        CTC                       String
        employmentType            String
        startDate                 DateTime
        endDate                   DateTime?
        isApproved                Boolean   @default(false)
        createdAt                 DateTime  @default(now())
        updatedAt                 DateTime  @updatedAt
        user                      User      @relation("UserProfessionalInformation", fields: [userId], references: [userId], onDelete: Cascade)
    }

    model JobsPosting {
        jobsPostingId Int @id @default(autoincrement())
        userId        Int
        jobTitle      String
        jobDescription String
        companyName String
        companyLocation String
        jobMode   String      // Remote , Onsite, Hybrid
        jobType       String  // Full-time, Part-time, Internship
        jobCategory   String  // Techincal, Non-tech etc..
        expectedSalary String
        applyLink String
        requiredSkills    String      // Comma-separated skills
        qualifications    String
        responsibilities  String
        isActive Boolean   @default(true)
        createdAt DateTime @default(now())
        updatedAt DateTime @updatedAt
        user User @relation("UserJobsPosting", fields: [userId], references: [userId], onDelete: Cascade)
        applications JobApplication[] @relation("JobsPostingApplications")
    }
    model JobApplication {
            jobApplicationId Int      @id @default(autoincrement())
            jobPostingId     Int
            userId           Int
            status           ApplicationStatus @default(PENDING) // Pending, Shortlisted, Rejected, Hired
            resumeUrl        String // Resume link
            coverLetter      String?
            appliedAt        DateTime @default(now())

            jobPosting       JobsPosting @relation("JobsPostingApplications",fields: [jobPostingId], references: [jobsPostingId], onDelete: Cascade)
            user             User        @relation("UserToJobsApplication",fields: [userId], references: [userId], onDelete: Cascade)
    }

    enum ApplicationStatus {
            PENDING
            SHORTLISTED
            REJECTED
            HIRED
    }

    model InterviewExperience {
        interviewExperienceId Int      @id @default(autoincrement())
        userId                Int
        Title                 String
        company               String
        description           String
        isApproved            Boolean  @default(false)
        interviewBody         String
        interviewDate         DateTime
        onCampus              Boolean
        refferal              Boolean
        anyTips               String?
        createdAt             DateTime @default(now())
        updatedAt             DateTime @updatedAt
        user                  User     @relation("UserInterviewExperience", fields: [userId], references: [userId], onDelete: Cascade)
    }

    model Event {
        eventId          Int             @id @default(autoincrement())
        eventName        String
        eventDescription String
        eventDate        DateTime
        eventType        String
        eventLocation    String
        eventImage       String
        eventMode        String
        category         String
        subcategory      String
        linkToRegister   String
        attendees        EventAttendee[] @relation("EventToAttendees")
        societyId        Int?
        society          SocietyProfile? @relation("EventsOfSociety",fields: [societyId], references: [societyId])
    }

    model EventAttendee {
        eventAttendeeId Int   @id @default(autoincrement())
        eventId         Int
        userId          Int
        role            String // e.g Speaker Attende Mentor etc.
        event           Event @relation("EventToAttendees", fields: [eventId], references: [eventId], onDelete: Cascade)
        user            User  @relation("UserToEventAttendees", fields: [userId], references: [userId], onDelete: Cascade)
    }

    model News {
        newsId          Int @id @default(autoincrement())
        newsTitle       String
        newsDescription String
        newsImage       String
        newsDate        DateTime
        isActive        Boolean @default(true)
        author          String
        societyId Int?
        society SocietyProfile? @relation("NewsSociety",fields: [societyId], references: [societyId])
        createdAt       DateTime @default(now())
        updatedAt       DateTime @updatedAt
    }

    model Notice {
        noticeId        Int @id @default(autoincrement())
        noticeTitle     String
        noticeDescription String?
        noticeDate      DateTime
        noticeLink      String
        createdAt       DateTime @default(now())
        updatedAt       DateTime @updatedAt
    }

    model MentorshipProgram {
        id              Int    @id @default(autoincrement())
        title           String
        mentorType      MentorType
        description     String
        category        String
        duration        String
        prerequisites   String?
        schedule        String
        status          ProgramStatus
        applications    MentorshipApplication[]
        createdAt       DateTime  @default(now())
        updatedAt       DateTime  @updatedAt

        // Mentor can be either Faculty or Alumni
        facultyMentorId Int?
        alumniMentorId  Int? 

        facultyMentor   Faculty?  @relation("FacultyToMentorship",fields: [facultyMentorId], references: [facultyId], onDelete: Cascade,  map: "MentorshipProgram_facultyMentor_fkey")
        alumniMentor    User?   @relation("UserToMentorship",fields: [alumniMentorId], references: [userId], onDelete: Cascade, map: "MentorshipProgram_alumniMentor_fkey")
    }

    // Enum to specify whether mentor is a Faculty or an Alumni
    enum MentorType {
        FACULTY
        ALUMNI
    }

    enum ProgramStatus {
        ACTIVE
        UPCOMING
        COMPLETED
    }

    model MentorshipApplication {
        id                Int    @id @default(autoincrement())
        userId            Int
        user              User      @relation("UserMentorshipApplication",fields: [userId], references: [userId],onDelete: Cascade)
        mentorshipId      Int
        mentorship        MentorshipProgram @relation(fields: [mentorshipId], references: [id], onDelete: Cascade)
        status            ApplStatus
        createdAt         DateTime @default(now())
        updatedAt         DateTime @updatedAt
    }

    enum ApplStatus {
        PENDING
        APPROVED
        REJECTED
    }

    model Achievement {
        achievementId     Int                @id @default(autoincrement())
        userId            Int
        title             String
        description       String
        startDate         DateTime
        endDate           DateTime
        organizedBy       String
        mode              Mode
        isTechnical       Boolean
        result            String
        certificate       String?
        status            Status             @default(PENDING)
        dateCreated       DateTime           @default(now())
        dateModified      DateTime           @updatedAt
        images            AchievementImage[]
        user              User               @relation("UserAchievements", fields: [userId], references: [userId], onDelete: Cascade)
    }

    model AchievementImage {
        id            Int         @id @default(autoincrement())
        achievementId Int
        imageUrl      String
        achievement   Achievement @relation(fields: [achievementId], references: [achievementId])

        @@map("achievementImages")
    }

    enum Role {
        STUDENT
        ALUMNI
    }
    enum Mode {
        ONLINE
        OFFLINE
    }
    enum Status {
        PENDING
        ACCEPTED
        REJECTED
    }
  ```
</details>

---
---

## API-ENDPOINTS
### USER Endpoints
#### Create a USER
- **URL**: `/users`
- **Method**: `POST`
- **Function**: `to create an user`
- **Parameter**: `No Parameter`
- **Request Body**: 
    ```json
    {
        "firstName": "Priya",
        "lastName": "Kumar",
        "email": "priya.kumar@example.com",
        "mobile": "9876543212",
        "branch": "Electronics",
        "enrollmentNumber": 87654321,
        "password": "StrongPassword456",
        "role": "ALUMNI",
        "section": "B",
        "passingYear": 2024,
        "fathersName": "Anil Kumar",
        "mothersName": "Rekha Kumar",
        "hobby": "Painting",
        "parentsPhone": "9876543213",
        "facultyId": 1,
        "societyId": 1
    }
    ```
- **Response**:
   - Success - 201 created
    ```json
    {
        "status":"success",
        "message":"User added successfully"
    }
    ```
   - Error - 409 Conflict
    ```json
    {
        "status": "error",
        "message": "User already exists!"
    }
   ```
   - Error - 400 Bad Request
   ```json
    {
        "message": "Expected ',' or '}' after property value in JSON at position 187 (line 7 column 30)", // any message related to error
        "error": "Bad Request",
        "statusCode": 400
    }
   ```
   - Error - 500 Internal Server Error
   ```json
   {
    "status": "error",
    "message": "Database connection failed" // Internal Server Error / any foriegn Key violation 
   }
   ```

#### Get All USERS
- **URL**: `/users`
- **Method**: `GET`
- **Function**: `to get all user`
- **Parameter**: `No Parameter`
- **Query Parameter**: `role={value}&page={value}`
    - `role is optional. value of role is "ALUMNI" or "STUDENT". default value is both.`
    - `page is optional. value of page is integer. default value is 1`
- **Request Body**: ` No Request Body`
- **Response**:
   - Success - 200 OK
    ```json
    {
        "status": "success",
        "items": [],
        "meta": {
            "totalItems": 0,
            "currentPage": 1,
            "totalPages": 0,
            "itemsPerPage": 10
        }
    }
    ```

#### Get A USER
- **URL**: `/users/{userid}`
- **Method**: `GET`
- **Function**: `to get details of an particular user by its ID`
- **Parameter**: `here userid is the id of user`
- **Request Body**: ` No Request Body`
- **Response**:
   - Success - 200 OK
    ```json
    {
        "status": "success",
        "item": {
            "userId": 1,
            "societyId": 1,
            "firstName": "Priya",
            "lastName": "Kumar",
            "email": "priya.kumar@example.com",
            "mobile": "9876543212",
            "enrollmentNumber": 87654321,
            "password": "StrongPassword456",
            "section": "B",
            "role": "ALUMNI",
            "branch": "Electronics",
            "passingYear": 2024,
            "fathersName": "Anil Kumar",
            "mothersName": "Rekha Kumar",
            "hobby": "Painting",
            "parentsPhone": "9876543213",
            "isApproved": false,
            "isVerified": false,
            "profilePictureUrl": null,
            "githubProfileUrl": null,
            "linkedInProfileUrl": null,
            "twitterProfileUrl": null,
            "gfgProfileUrl": null,
            "codingNinjaProfileUrl": null,
            "leetcodeProfileUrl": null,
            "codeforcesProfileUrl": null,
            "instagramProfileUrl": null,
            "createdAt": "2025-03-20T14:20:25.970Z",
            "updatedAt": "2025-03-20T14:20:25.970Z",
            "facultyId": 1,
            "achievements": [],
            "professionalInformations": [],
            "interviewExperiences": [],
            "eventsAttended": [],
            "societyMember": [],
            "jobPosting": []
        }
    }
    ```

#### Update an USER DETAILS
- **URL**: `/users/{userid}`
- **Method**: `PATCH`
- **Function**: `to get details of an particular user by its ID`
- **Parameter**: `here userid is the id of user`
- **Request Body**: `Any detail you want to change. Example is given below`
    ```json
    {
        "branch": "IT",
        "passingYear": 2025,
        "isApproved": true,
        "profilePictureUrl": "https://example.com/profile/jane",
        "githubProfileUrl": "https://github.com/janesmith",
        "linkedInProfileUrl": "https://linkedin.com/in/janesmith",
        "twitterProfileUrl": "https://twitter.com/janesmith",
        "gfgProfileUrl": "https://geeksforgeeks.org/user/janesmith",
        "codingNinjaProfileUrl": "https://codingninjas.com/user/janesmith",
        "leetcodeProfileUrl": "https://leetcode.com/janesmith",
        "codeforcesProfileUrl": "https://codeforces.com/profile/janesmith",
        "instagramProfileUrl": "https://instagram.com/janesmith"
    }
    ```
- **Response**:
   - Success - 200 OK
    ```json
    {
        "status": "success",
        "item": {
            "userId": 1,
            "societyId": 1,
            "firstName": "Priya",
            "lastName": "Kumar",
            "email": "priya.kumar@example.com",
            "mobile": "9876543212",
            "enrollmentNumber": 87654321,
            "password": "StrongPassword456",
            "section": "B",
            "role": "ALUMNI",
            "branch": "IT",
            "passingYear": 2025,
            "fathersName": "Anil Kumar",
            "mothersName": "Rekha Kumar",
            "hobby": "Painting",
            "parentsPhone": "9876543213",
            "isApproved": true,
            "isVerified": false,
            "profilePictureUrl": "https://example.com/profile/jane",
            "githubProfileUrl": "https://github.com/janesmith",
            "linkedInProfileUrl": "https://linkedin.com/in/janesmith",
            "twitterProfileUrl": "https://twitter.com/janesmith",
            "gfgProfileUrl": "https://geeksforgeeks.org/user/janesmith",
            "codingNinjaProfileUrl": "https://codingninjas.com/user/janesmith",
            "leetcodeProfileUrl": "https://leetcode.com/janesmith",
            "codeforcesProfileUrl": "https://codeforces.com/profile/janesmith",
            "instagramProfileUrl": "https://instagram.com/janesmith",
            "createdAt": "2025-03-20T14:20:25.970Z",
            "updatedAt": "2025-03-20T15:06:40.123Z",
            "facultyId": 1
        },
        "message": "User updated successfully"
    }
    ```

#### Delete A USER
- **URL**: `/users/{userid}`
- **Method**: `DELETE`
- **Function**: `to remove an particular user by its ID`
- **Parameter**: `here userid is the id of user`
- **Request Body**: ` No Request Body`
- **Response**:
   - Success - 200 OK
    ```json
    {
        "status": "success",
        "item": {
            "userId": 2,
            "societyId": 1,
            "firstName": "Priya",
            "lastName": "Kumar",
            "email": "priya1.kumar@example.com",
            "mobile": "98765439212",
            "enrollmentNumber": 876154321,
            "password": "StrongPassword456",
            "section": "B",
            "role": "ALUMNI",
            "branch": "Electronics",
            "passingYear": 2024,
            "fathersName": "Anil Kumar",
            "mothersName": "Rekha Kumar",
            "hobby": "Painting",
            "parentsPhone": "9876543213",
            "isApproved": false,
            "isVerified": false,
            "profilePictureUrl": null,
            "githubProfileUrl": null,
            "linkedInProfileUrl": null,
            "twitterProfileUrl": null,
            "gfgProfileUrl": null,
            "codingNinjaProfileUrl": null,
            "leetcodeProfileUrl": null,
            "codeforcesProfileUrl": null,
            "instagramProfileUrl": null,
            "createdAt": "2025-03-20T14:26:07.127Z",
            "updatedAt": "2025-03-20T14:26:07.127Z",
            "facultyId": 1
        },
        "message": "User deleted successfully"
    }
    ```

---
---

### Interview Experience Endpoints
#### Add new Experience
- **URL**: `/interview-experience`
- **Method**: `POST`
- **Function**: `to add a new Interview Experience`
- **Parameter**: `No Parameter`
- **Request Body**: 
    ```json
    {
        "userId": 1,
        "Title": "APP Developer Interview",
        "company": "Google",
        "description": "A challenging interview process involving Problem Solving Coding approach",
        "interviewBody": "The process began with a coding assessment on Hackerrank, followed by two technical rounds and a behavioral interview.",
        "interviewDate": "2024-04-10T09:00:00Z",
        "onCampus": true,
        "refferal": true,
        "anyTips": "Make good projects"
    }
    ```
- **Response**:
   - Success - 201 created
    ```json
    {
        "status": "success",
        "item": {
            "interviewExperienceId": 1,
            "userId": 1,
            "Title": "APP Developer Interview",
            "company": "Google",
            "description": "A challenging interview process involving Problem Solving Coding approach",
            "isApproved": false,
            "interviewBody": "The process began with a coding assessment on Hackerrank, followed by two technical rounds and a behavioral interview.",
            "interviewDate": "2024-04-10T09:00:00.000Z",
            "onCampus": true,
            "refferal": true,
            "anyTips": "Make good projects",
            "createdAt": "2025-03-21T13:31:28.449Z",
            "updatedAt": "2025-03-21T13:31:28.449Z"
        },
        "message": "Interview experience created successfully"
    }
    ```

#### Get All Interview Experience
- **URL**: `/interview-experience`
- **Method**: `GET`
- **Function**: `to get all interview experience approved by admin`
- **Parameter**: `No Parameter`
- **Query Parameter**: `role={value}&page={value}`
    - `role is optional. value of role is "ALUMNI" or "STUDENT". default value is both.`
    - `page is optional. value of page is integer. default value is 1`
- **Request Body**: ` No Request Body`
- **Response**:
   - Success - 200 OK
    ```json
    {
        "status": "success",
        "items": [
            {
                "interviewExperienceId": 1,
                "userId": 1,
                "Title": "Full-Stack Engineer Interview",
                "company": "Google",
                "description": "Updated description: The process emphasized teamwork and technical problem-solving.",
                "isApproved": true,
                "interviewBody": "Updated body: A thorough coding assessment followed by two technical and one HR round.",
                "interviewDate": "2024-04-10T09:00:00.000Z",
                "onCampus": true,
                "refferal": true,
                "anyTips": "Focus on team collaboration examples for behavioral interviews.",
                "createdAt": "2025-03-21T13:31:28.449Z",
                "updatedAt": "2025-03-21T13:36:15.798Z",
                "user": {
                    "firstName": "Priya",
                    "lastName": "Kumar",
                    "passingYear": 2025,
                    "branch": "IT",
                    "section": "B",
                    "email": "priya.kumar@example.com"
                }
            },
        ],
        "meta": {
            "totalItems": 1,
            "currentPage": 1,
            "totalPages": 1,
            "itemsPerPage": 10
        }
    }
    ```

#### Get A Interview Experience By id 
- **URL**: `/interview-experience/{id}`
- **Method**: `GET`
- **Function**: `to get details of an particular interview experience by its ID`
- **Parameter**: `here id is the id of particular interview experience`
- **Request Body**: ` No Request Body`
- **Response**:
   - Success - 200 OK
    ```json
    {
        "status": "success",
        "item": {
            "interviewExperienceId": 1,
            "userId": 1,
            "Title": "Full-Stack Engineer Interview",
            "company": "Google",
            "description": "Updated description: The process emphasized teamwork and technical problem-solving.",
            "isApproved": true,
            "interviewBody": "Updated body: A thorough coding assessment followed by two technical and one HR round.",
            "interviewDate": "2024-04-10T09:00:00.000Z",
            "onCampus": true,
            "refferal": true,
            "anyTips": "Focus on team collaboration examples for behavioral interviews.",
            "createdAt": "2025-03-21T13:31:28.449Z",
            "updatedAt": "2025-03-21T13:36:15.798Z",
            "user": {
                "firstName": "Priya",
                "lastName": "Kumar",
                "passingYear": 2025,
                "branch": "IT",
                "section": "B",
                "email": "priya.kumar@example.com"
            }
        }
    }
    ```

#### Get All Interview Experience of a particular user 
- **URL**: `/interview-experience/user/{id}`
- **Method**: `GET`
- **Function**: `to get details of all interview experience related to a user`
- **Parameter**: `here id is the id of particular User`
- **Query Parameter**: `page={value}` `Optional default value is 1`
- **Request Body**: ` No Request Body`
- **Response**:
   - Success - 200 OK
    ```json
    {
        "status": "success",
        "items": [
            {
                "interviewExperienceId": 1,
                "userId": 1,
                "Title": "Full-Stack Engineer Interview",
                "company": "Google",
                "description": "Updated description: The process emphasized teamwork and technical problem-solving.",
                "isApproved": true,
                "interviewBody": "Updated body: A thorough coding assessment followed by two technical and one HR round.",
                "interviewDate": "2024-04-10T09:00:00.000Z",
                "onCampus": true,
                "refferal": true,
                "anyTips": "Focus on team collaboration examples for behavioral interviews.",
                "createdAt": "2025-03-21T13:31:28.449Z",
                "updatedAt": "2025-03-21T13:36:15.798Z",
                "user": {
                    "firstName": "Priya",
                    "lastName": "Kumar",
                    "passingYear": 2025,
                    "branch": "IT",
                    "section": "B",
                    "email": "priya.kumar@example.com"
                }
            }
        ],
        "meta": {
            "totalItems": 1,
            "totalPages": 1,
            "currentPage": 1,
            "itemsPerPage": 10
        }
    }
    ```

#### Update an Interview Experience DETAILS
- **URL**: `/interview-experience/{id}`
- **Method**: `PUT`
- **Function**: `to update details of an particular interview experience by its ID`
- **Parameter**: `here id is the id of Interview Experience`
- **Request Body**: `Any detail you want to change. Example is given below`
    ```json
    {
        "Title": "Full-Stack Engineer Interview",
        "description": "Updated description: The process emphasized teamwork and technical problem-solving.",
        "interviewBody": "Updated body: A thorough coding assessment followed by two technical and one HR round.",
        "isApproved": true,
        "anyTips": "Focus on team collaboration examples for behavioral interviews."
    }
    ```
- **Response**:
   - Success - 200 OK
    ```json
    {
        "status": "success",
        "item": {
            "interviewExperienceId": 1,
            "userId": 1,
            "Title": "Full-Stack Engineer Interview",
            "company": "Google",
            "description": "Updated description: The process emphasized teamwork and technical problem-solving.",
            "isApproved": true,
            "interviewBody": "Updated body: A thorough coding assessment followed by two technical and one HR round.",
            "interviewDate": "2024-04-10T09:00:00.000Z",
            "onCampus": true,
            "refferal": true,
            "anyTips": "Focus on team collaboration examples for behavioral interviews.",
            "createdAt": "2025-03-21T13:31:28.449Z",
            "updatedAt": "2025-03-21T13:36:15.798Z"
        },
        "message": "Interview experience updated successfully"
    }
    ```

#### Delete A Interview Experience
- **URL**: `/interview-experience/{id}`
- **Method**: `DELETE`
- **Function**: `to remove an particular experience by its ID`
- **Parameter**: `here id is the id of particular Interview experience`
- **Request Body**: ` No Request Body`
- **Response**:
   - Success - 200 OK
    ```json
    {
        "status": "success",
        "item": {
            "interviewExperienceId": 1,
            "userId": 1,
            "Title": "Full-Stack Engineer Interview",
            "company": "Google",
            "description": "Updated description: The process emphasized teamwork and technical problem-solving.",
            "isApproved": true,
            "interviewBody": "Updated body: A thorough coding assessment followed by two technical and one HR round.",
            "interviewDate": "2024-04-10T09:00:00.000Z",
            "onCampus": true,
            "refferal": true,
            "anyTips": "Focus on team collaboration examples for behavioral interviews.",
            "createdAt": "2025-03-21T13:31:28.449Z",
            "updatedAt": "2025-03-21T13:36:15.798Z"
        },
        "message": "Interview experience deleted successfully"
    }
    ```

---
---

### Professional Informations Endpoints
#### Add new Professional Information
- **URL**: `/professional-information`
- **Method**: `POST`
- **Function**: `to add a new professional-information`
- **Parameter**: `No Parameter`
- **Request Body**: 
    ```json
    {
        "userId": 1,
        "companyName": "Infosys",
        "position": "Manager",
        "CTC": "7 LPA",
        "employmentType": "Senior SDE",
        "startDate": "2024-03-25T00:00:00Z",
        "endDate": "2024-07-14T00:00:00Z"
    }
    ```
- **Response**:
   - Success - 201 created
    ```json
    {
        "status": "success",
        "item": {
            "professionalInformationId": 1,
            "userId": 1,
            "companyName": "Infosys",
            "position": "Manager",
            "CTC": "7 LPA",
            "employmentType": "Senior SDE",
            "startDate": "2024-03-25T00:00:00.000Z",
            "endDate": "2024-07-14T00:00:00.000Z",
            "isApproved": false,
            "createdAt": "2025-03-21T14:12:09.207Z",
            "updatedAt": "2025-03-21T14:12:09.207Z"
        },
        "message": "Professional information created successfully"
    }
    ```

#### Get All Professional Experience
- **URL**: `/professional-information`
- **Method**: `GET`
- **Function**: `to get all professional-information approved by admin`
- **Parameter**: `No Parameter`
- **Query Parameter**: `role={value}&page={value}`
    - `role is optional. value of role is "ALUMNI" or "STUDENT". default value is both.`
    - `page is optional. value of page is integer. default value is 1`
- **Request Body**: ` No Request Body`
- **Response**:
   - Success - 200 OK
    ```json
    {
        "status": "success",
        "items": [
            {
                "professionalInformationId": 2,
                "userId": 1,
                "companyName": "Infosys",
                "position": "Manager",
                "CTC": "7 LPA",
                "employmentType": "Senior SDE",
                "startDate": "2024-08-25T00:00:00.000Z",
                "endDate": null,
                "isApproved": true,
                "createdAt": "2025-03-21T14:21:07.907Z",
                "updatedAt": "2025-03-21T14:25:17.708Z",
                "user": {
                    "firstName": "Priya",
                    "lastName": "Kumar",
                    "branch": "IT",
                    "passingYear": 2025,
                    "section": "B",
                    "email": "priya.kumar@example.com",
                    "githubProfileUrl": "https://github.com/janesmith",
                    "linkedInProfileUrl": "https://linkedin.com/in/janesmith"
                }
            }
        ],
        "meta": {
            "totalItems": 1,
            "totalPages": 1,
            "currentPage": 1,
            "itemsPerPage": 10
        }
    }
    ```

#### Get A Professional Experience By id 
- **URL**: `/professional-information/{id}`
- **Method**: `GET`
- **Function**: `to get details of an particular professional-information by its ID`
- **Parameter**: `here id is the id of particular professional-information`
- **Request Body**: ` No Request Body`
- **Response**:
   - Success - 200 OK
    ```json
    {
        "status": "success",
        "item": {
            "professionalInformationId": 2,
            "userId": 1,
            "companyName": "Infosys",
            "position": "Manager",
            "CTC": "7 LPA",
            "employmentType": "Senior SDE",
            "startDate": "2024-08-25T00:00:00.000Z",
            "endDate": null,
            "isApproved": false,
            "createdAt": "2025-03-21T14:21:07.907Z",
            "updatedAt": "2025-03-21T14:21:07.907Z",
            "user": {
                "firstName": "Priya",
                "lastName": "Kumar",
                "branch": "IT",
                "passingYear": 2025,
                "section": "B",
                "email": "priya.kumar@example.com",
                "githubProfileUrl": "https://github.com/janesmith",
                "linkedInProfileUrl": "https://linkedin.com/in/janesmith"
            }
        }
    }
    ```

#### Get All Professional Experience of a particular user 
- **URL**: `/professional-information/user/{id}`
- **Method**: `GET`
- **Function**: `to get details of all professional-information related to a user`
- **Parameter**: `here id is the id of particular User`
- **Request Body**: ` No Request Body`
- **Response**:
   - Success - 200 OK
    ```json
    {
        "status": "success",
        "items": [
            {
                "professionalInformationId": 1,
                "userId": 1,
                "companyName": "Infosys",
                "position": "Manager",
                "CTC": "7 LPA",
                "employmentType": "Senior SDE",
                "startDate": "2024-03-25T00:00:00.000Z",
                "endDate": "2024-07-14T00:00:00.000Z",
                "isApproved": false,
                "createdAt": "2025-03-21T14:12:09.207Z",
                "updatedAt": "2025-03-21T14:12:09.207Z",
                "user": {
                    "firstName": "Priya",
                    "lastName": "Kumar",
                    "branch": "IT",
                    "passingYear": 2025,
                    "section": "B",
                    "email": "priya.kumar@example.com",
                    "githubProfileUrl": "https://github.com/janesmith",
                    "linkedInProfileUrl": "https://linkedin.com/in/janesmith"
                }
            },
            {
                "professionalInformationId": 2,
                "userId": 1,
                "companyName": "Infosys",
                "position": "Manager",
                "CTC": "7 LPA",
                "employmentType": "Senior SDE",
                "startDate": "2024-08-25T00:00:00.000Z",
                "endDate": null,
                "isApproved": false,
                "createdAt": "2025-03-21T14:21:07.907Z",
                "updatedAt": "2025-03-21T14:21:07.907Z",
                "user": {
                    "firstName": "Priya",
                    "lastName": "Kumar",
                    "branch": "IT",
                    "passingYear": 2025,
                    "section": "B",
                    "email": "priya.kumar@example.com",
                    "githubProfileUrl": "https://github.com/janesmith",
                    "linkedInProfileUrl": "https://linkedin.com/in/janesmith"
                }
            }
        ],
        "meta": {
            "totalItems": 2,
            "totalPages": 1,
            "currentPage": 1,
            "itemsPerPage": 10
        }
    }
    ```

#### Get Current/Latest Professional Information of a particular user 
- **URL**: `/professional-information/current-company/{id}`
- **Method**: `GET`
- **Function**: `to get details of current/latest professional-information related to a user`
- **Parameter**: `here id is the id of particular User`
- **Request Body**: ` No Request Body`
- **Response**:
   - Success - 200 OK
    ```json
    {
        "status": "success",
        "item": {
            "professionalInformationId": 2,
            "userId": 1,
            "companyName": "Infosys",
            "position": "Manager",
            "CTC": "7 LPA",
            "employmentType": "Senior SDE",
            "startDate": "2024-08-25T00:00:00.000Z",
            "endDate": null,
            "isApproved": true,
            "createdAt": "2025-03-21T14:21:07.907Z",
            "updatedAt": "2025-03-21T14:25:17.708Z",
            "user": {
                "firstName": "Priya",
                "lastName": "Kumar",
                "branch": "IT",
                "passingYear": 2025,
                "section": "B",
                "email": "priya.kumar@example.com",
                "githubProfileUrl": "https://github.com/janesmith",
                "linkedInProfileUrl": "https://linkedin.com/in/janesmith"
            }
        }
    }
    ```

#### Update an Professional Information DETAILS
- **URL**: `/professional-information/{id}`
- **Method**: `PUT`
- **Function**: `to update details of an particular professional-information by its ID`
- **Parameter**: `here id is the id of professional-information`
- **Request Body**: `Any detail you want to change.An  Example is given below`
    ```json
    {
        "isApproved": true,
    }
    ```
- **Response**:
   - Success - 200 OK
    ```json
    {
        "status": "success",
        "item": {
            "professionalInformationId": 2,
            "userId": 1,
            "companyName": "Infosys",
            "position": "Manager",
            "CTC": "7 LPA",
            "employmentType": "Senior SDE",
            "startDate": "2024-08-25T00:00:00.000Z",
            "endDate": null,
            "isApproved": true,
            "createdAt": "2025-03-21T14:21:07.907Z",
            "updatedAt": "2025-03-21T14:25:17.708Z"
        },
        "message": "Professional information updated successfully"
    }
    ```

#### Delete A Professional Information
- **URL**: `/professional-information/{id}`
- **Method**: `DELETE`
- **Function**: `to remove an particular professional-information by its ID`
- **Parameter**: `here id is the id of particular professional-information`
- **Request Body**: ` No Request Body`
- **Response**:
   - Success - 200 OK
    ```json
    {
        "status": "success",
        "item": {
            "professionalInformationId": 1,
            "userId": 1,
            "companyName": "Infosys",
            "position": "Manager",
            "CTC": "7 LPA",
            "employmentType": "Senior SDE",
            "startDate": "2024-03-25T00:00:00.000Z",
            "endDate": "2024-07-14T00:00:00.000Z",
            "isApproved": false,
            "createdAt": "2025-03-21T14:12:09.207Z",
            "updatedAt": "2025-03-21T14:12:09.207Z"
        },
        "message": "Professional information deleted successfully"
    }
    ```

---
---

### News Endpoints
#### Add new News
- **URL**: `/news`
- **Method**: `POST`
- **Function**: `to add a new news`
- **Parameter**: `No Parameter`
- **Request Body**: 
    ```json
    {
        "newsTitle": "New Event on Alumni Networking",
        "newsDescription": "Join us for an exciting alumni networking event where alumni from various industries will gather to share experiences and opportunities. Don't miss out!",
        "newsImage": "https://example.com/images/networking-event.jpg",
        "newsDate": "2025-01-10T00:00:00.000Z",
        "author": "Event Management Team"
    }
    ```
- **Response**:
   - Success - 201 created
    ```json
    {
        "status": "success",
        "item": {
            "newsId": 1,
            "newsTitle": "New Event on Alumni Networking",
            "newsDescription": "Join us for an exciting alumni networking event where alumni from various industries will gather to share experiences and opportunities. Don't miss out!",
            "newsImage": "https://example.com/images/networking-event.jpg",
            "newsDate": "2025-01-10T00:00:00.000Z",
            "isActive": true,
            "author": "Event Management Team",
            "societyId": null,
            "createdAt": "2025-03-21T14:52:50.562Z",
            "updatedAt": "2025-03-21T14:52:50.562Z"
        },
        "message": "News created successfully"
    }
    ```

#### Get All News
- **URL**: `/news`
- **Method**: `GET`
- **Function**: `to get all news`
- **Parameter**: `No Parameter`
- **Query Parameter**: `page={value}`
    - `page is optional. value of page is integer. default value is 1`
- **Request Body**: ` No Request Body`
- **Response**:
   - Success - 200 OK
    ```json
    {
        "status": "success",
        "items": [
            {
                "newsId": 1,
                "newsTitle": "New Event on Alumni Networking",
                "newsDescription": "Join us for an exciting alumni networking event where alumni from various industries will gather to share experiences and opportunities. Don't miss out!",
                "newsImage": "https://example.com/images/networking-event.jpg",
                "newsDate": "2025-01-10T00:00:00.000Z",
                "isActive": true,
                "author": "Event Management Team",
                "societyId": null,
                "createdAt": "2025-03-21T14:52:50.562Z",
                "updatedAt": "2025-03-21T14:52:50.562Z"
            },
            {
                "newsId": 2,
                "newsTitle": "New Achievement ",
                "newsDescription": "John has Achieved a new position",
                "newsImage": "https://example.com/images/networking-event.jpg",
                "newsDate": "2025-02-10T00:00:00.000Z",
                "isActive": true,
                "author": "Achievement Team",
                "societyId": null,
                "createdAt": "2025-03-21T14:54:57.683Z",
                "updatedAt": "2025-03-21T14:54:57.683Z"
            }
        ],
        "meta": {
            "totalItems": 2,
            "totalPages": 1,
            "currentPage": 1,
            "itemsPerPage": 10
        }
    }
    ```

#### Get A News By id 
- **URL**: `/news/{id}`
- **Method**: `GET`
- **Function**: `to get details of an particular news by its ID`
- **Parameter**: `here id is the id of particular news`
- **Request Body**: ` No Request Body`
- **Response**:
   - Success - 200 OK
    ```json
    {
        "status": "success",
        "item": {
            "newsId": 1,
            "newsTitle": "New Event on Alumni Networking",
            "newsDescription": "Join us for an exciting alumni networking event where alumni from various industries will gather to share experiences and opportunities. Don't miss out!",
            "newsImage": "https://example.com/images/networking-event.jpg",
            "newsDate": "2025-01-10T00:00:00.000Z",
            "isActive": true,
            "author": "Event Management Team",
            "societyId": null,
            "createdAt": "2025-03-21T14:52:50.562Z",
            "updatedAt": "2025-03-21T14:52:50.562Z"
        }
    }
    ```

#### Update an News DETAILS
- **URL**: `/news/{id}`
- **Method**: `PUT`
- **Function**: `to update details of an particular news by its ID`
- **Parameter**: `here id is the id of news`
- **Request Body**: `Any detail you want to change.An  Example is given below`
    ```json
    {
        "isActive": false,
    }
    ```
- **Response**:
   - Success - 200 OK
    ```json
    {
        "status": "success",
        "item": {
            "newsId": 1,
            "newsTitle": "New Event on Alumni Networking",
            "newsDescription": "Join us for an exciting alumni networking event where alumni from various industries will gather to share experiences and opportunities. Don't miss out!",
            "newsImage": "https://example.com/images/networking-event.jpg",
            "newsDate": "2025-01-10T00:00:00.000Z",
            "isActive": false,
            "author": "Event Management Team",
            "societyId": null,
            "createdAt": "2025-03-21T14:52:50.562Z",
            "updatedAt": "2025-03-21T14:58:59.834Z"
        },
        "message": "News updated successfully"
    }
    ```

#### Delete A News
- **URL**: `/news/{id}`
- **Method**: `DELETE`
- **Function**: `to remove an particular news by its ID`
- **Parameter**: `here id is the id of particular news`
- **Request Body**: ` No Request Body`
- **Response**:
   - Success - 200 OK
    ```json
    {
        "status": "success",
        "item": {
            "newsId": 1,
            "newsTitle": "New Event on Alumni Networking",
            "newsDescription": "Join us for an exciting alumni networking event where alumni from various industries will gather to share experiences and opportunities. Don't miss out!",
            "newsImage": "https://example.com/images/networking-event.jpg",
            "newsDate": "2025-01-10T00:00:00.000Z",
            "isActive": false,
            "author": "Event Management Team",
            "societyId": null,
            "createdAt": "2025-03-21T14:52:50.562Z",
            "updatedAt": "2025-03-21T14:58:59.834Z"
        },
        "message": "News deleted successfully"
    }
    ```

---
---

### Notice Endpoints
#### Add new Notice
- **URL**: `/notice`
- **Method**: `POST`
- **Function**: `to add a new notice`
- **Parameter**: `No Parameter`
- **Request Body**: 
    ```json
    {
        "noticeTitle": "New Form Opened",
        "noticeDescription": "Abc Xyz jdscmmc....",
        "noticeDate": "2025-02-10T00:00:00.000Z",
        "noticeLink": "https://mcmmd.xyx.pdf"
    }
    ```
- **Response**:
   - Success - 201 created
    ```json
    {
        "status": "success",
        "item": {
            "noticeId": 1,
            "noticeTitle": "New Form Opened",
            "noticeDescription": "Abc Xyz jdscmmc....",
            "noticeDate": "2025-02-10T00:00:00.000Z",
            "noticeLink": "https://mcmmd.xyx.pdf",
            "createdAt": "2025-03-21T15:27:28.801Z",
            "updatedAt": "2025-03-21T15:27:28.801Z"
        },
        "message": "Notice added successfully"
    }
    ```

#### Get All Notices
- **URL**: `/notice`
- **Method**: `GET`
- **Function**: `to get all notice`
- **Parameter**: `No Parameter`
- **Query Parameter**: `page={value}`
    - `page is optional. value of page is integer. default value is 1`
- **Request Body**: ` No Request Body`
- **Response**:
   - Success - 200 OK
    ```json
    {
        "status": "success",
        "items": [
            {
                "noticeId": 2,
                "noticeTitle": "New Form Opened 2",
                "noticeDescription": "Abc Xyz jdscmmc....",
                "noticeDate": "2025-02-10T00:00:00.000Z",
                "noticeLink": "https://mcmmd.xyx.pdf",
                "createdAt": "2025-03-21T15:29:23.456Z",
                "updatedAt": "2025-03-21T15:29:23.456Z"
            },
            {
                "noticeId": 1,
                "noticeTitle": "New Form Opened",
                "noticeDescription": "Abc Xyz jdscmmc....",
                "noticeDate": "2025-02-10T00:00:00.000Z",
                "noticeLink": "https://mcmmd.xyx.pdf",
                "createdAt": "2025-03-21T15:27:28.801Z",
                "updatedAt": "2025-03-21T15:27:28.801Z"
            }
        ],
        "meta": {
            "totalItems": 2,
            "currentPage": 1,
            "totalPages": 1,
            "itemsPerPage": 10
        }
    }
    ```

#### Update an Notice DETAILS
- **URL**: `/notice/{id}`
- **Method**: `PUT`
- **Function**: `to update details of an particular notice by its ID`
- **Parameter**: `here id is the id of notice`
- **Request Body**: `Any detail you want to change.An  Example is given below`
    ```json
    {
        "noticeTitle": "Datesheet Practical Exam",
    }
    ```
- **Response**:
   - Success - 200 OK
    ```json
    {
        "status": "success",
        "item": {
            "noticeId": 2,
            "noticeTitle": "Datesheet Practical Exam",
            "noticeDescription": "Abc Xyz jdscmmc....",
            "noticeDate": "2025-02-10T00:00:00.000Z",
            "noticeLink": "https://mcmmd.xyx.pdf",
            "createdAt": "2025-03-21T15:29:23.456Z",
            "updatedAt": "2025-03-21T15:33:40.469Z"
        },
        "message": "Notice updated successfully"
    }
    ```

#### Delete A Notice
- **URL**: `/notice/{id}`
- **Method**: `DELETE`
- **Function**: `to remove an particular Notice by its ID`
- **Parameter**: `here id is the id of particular notice`
- **Request Body**: ` No Request Body`
- **Response**:
   - Success - 200 OK
    ```json
    {
        "status": "success",
        "item": {
            "noticeId": 2,
            "noticeTitle": "Datesheet Practical Exam",
            "noticeDescription": "Abc Xyz jdscmmc....",
            "noticeDate": "2025-02-10T00:00:00.000Z",
            "noticeLink": "https://mcmmd.xyx.pdf",
            "createdAt": "2025-03-21T15:29:23.456Z",
            "updatedAt": "2025-03-21T15:33:40.469Z"
        },
        "message": "Notice deleted successfully"
    }
    ```

---
---

### Events Endpoints
#### Add New Events
- **URL**: `/alumni/events`
- **Method**: `POST`
- **Function**: `to create a new event`
- **Parameter**: `No Parameter`
- **Request Body**: 
    ```json
    {
        "eventName": "Tech Meetup 2025",
        "eventDescription": "An event for tech enthusiasts to share ideas and network.",
        "eventDate": "2025-04-05T15:00:00",
        "eventType": "Conference",
        "eventLocation": "New Delhi, India",
        "eventImage": "https://example.com/images/tech-meetup.jpg",
        "eventMode": "Offline",
        "category": "Technology",
        "subcategory": "Networking",
        "linkToRegister": "https://example.com/register/tech-meetup"
    }
    ```
- **Response**:
   - Success - 201 created
    ```json
    {
        "status": "success",
        "item": {
            "eventId": 1,
            "eventName": "Tech Meetup 2025",
            "eventDescription": "An event for tech enthusiasts to share ideas and network.",
            "eventDate": "2025-04-05T15:00:00.000Z",
            "eventType": "Conference",
            "eventLocation": "New Delhi, India",
            "eventImage": "https://example.com/images/tech-meetup.jpg",
            "eventMode": "Offline",
            "category": "Technology",
            "subcategory": "Networking",
            "linkToRegister": "https://example.com/register/tech-meetup",
            "societyId": null
        },
        "message": "event created successfully"
    }
    ```
#### Get All Events
- **URL**: `/alumni/events`
- **Method**: `GET`
- **Function**: `to get all events`
- **Parameter**: `No Parameter`
- **Query Parameter**: `page={value}`
    - `page is optional. value of page is integer. default value is 1`
- **Request Body**: ` No Request Body`
- **Response**:
   - Success - 200 OK
    ```json
    {
        "status": "success",
        "items": [
            {
                "eventId": 1,
                "eventName": "Tech Meetup 2025",
                "eventDescription": "An event for tech enthusiasts to share ideas and network.",
                "eventDate": "2025-04-05T15:00:00.000Z",
                "eventType": "Conference",
                "eventLocation": "New Delhi, India",
                "eventImage": "https://example.com/images/tech-meetup.jpg",
                "eventMode": "Offline",
                "category": "Technology",
                "subcategory": "Networking",
                "linkToRegister": "https://example.com/register/tech-meetup",
                "societyId": null,
                "attendees": []
            },
            {
                "eventId": 2,
                "eventName": "Online Yoga Workshop",
                "eventDescription": "Join our online yoga session to refresh your mind and body.",
                "eventDate": "2025-03-28T10:00:00.000Z",
                "eventType": "Workshop",
                "eventLocation": "Virtual",
                "eventImage": "https://example.com/images/yoga-workshop.jpg",
                "eventMode": "Online",
                "category": "Health & Wellness",
                "subcategory": "Fitness",
                "linkToRegister": "https://example.com/register/yoga-workshop",
                "societyId": null,
                "attendees": []
            },
            {
                "eventId": 3,
                "eventName": "Art Exhibition 2025",
                "eventDescription": "Explore the best contemporary art from around the world.",
                "eventDate": "2025-06-15T12:00:00.000Z",
                "eventType": "Exhibition",
                "eventLocation": "Mumbai, India",
                "eventImage": "https://example.com/images/art-exhibition.jpg",
                "eventMode": "Offline",
                "category": "Art & Culture",
                "subcategory": "Painting",
                "linkToRegister": "https://example.com/register/art-exhibition",
                "societyId": null,
                "attendees": []
            }
        ],
        "meta": {
            "totalItems": 3,
            "currentPage": 1,
            "totalPages": 1,
            "itemsPerPage": 10
        }
    }
    ```

#### Get a Event
- **URL**: `/alumni/events/{id}`
- **Method**: `GET`
- **Function**: `to get detail of an event by its id`
- **Parameter**: `here id represent event id`
- **Request Body**: ` No Request Body`
- **Response**:
   - Success - 200 OK
    ```json
    {
        "status": "success",
        "item": {
            "eventId": 1,
            "eventName": "Tech Meetup 2025",
            "eventDescription": "An event for tech enthusiasts to share ideas and network.",
            "eventDate": "2025-04-05T15:00:00.000Z",
            "eventType": "Conference",
            "eventLocation": "New Delhi, India",
            "eventImage": "https://example.com/images/tech-meetup.jpg",
            "eventMode": "Offline",
            "category": "Technology",
            "subcategory": "Networking",
            "linkToRegister": "https://example.com/register/tech-meetup",
            "societyId": null,
            "attendees": []  // list of attendees
        }
    }
    ```
#### Add New Role/ Register
- **URL**: `/alumni/events/apply`
- **Method**: `POST`
- **Function**: `to register in event or to add a new role in event`
- **Parameter**: `No Parameter`
- **Request Body**: 
    ```json
    {
        "eventId": 1,
        "role": "attende", // Speaker Attende Mentor etc.
        "userId": 1
    }
    ```
- **Response**:
   - Success - 201 created
    ```json
    {
        "status": "success",
        "item": {
            "eventAttendeeId": 1,
            "eventId": 1,
            "userId": 1,
            "role": "attende"
        },
        "message": "Role added successfully"
    }
    ```

#### Get All Event Attendees/Roles
- **URL**: `/alumni/events/applied/{id}`
- **Method**: `GET`
- **Function**: `to get all attendees of an event`
- **Parameter**: `eventId`
- **Response**:
    - Success - 200 OK
    ```json
    {
        "status": "success",
        "item": [
            {
                "eventAttendeeId": 3,
                "eventId": 3,
                "userId": 1,
                "role": "attende",
                "user": {
                    "role": "ALUMNI",
                    "firstName": "Priya",
                    "lastName": "Kumar",
                    "branch": "IT",
                    "passingYear": 2025,
                    "linkedInProfileUrl": "https://linkedin.com/in/janesmith",
                    "githubProfileUrl": "https://github.com/janesmith",
                    "instagramProfileUrl": "https://instagram.com/janesmith"
                }
            },
            {
                "eventAttendeeId": 4,
                "eventId": 3,
                "userId": 2,
                "role": "attende",
                "user": {
                    "role": "STUDENT",
                    "firstName": "John",
                    "lastName": "Doe",
                    "branch": "CSE",
                    "passingYear": 2025,
                    "linkedInProfileUrl": "https://linkedin.com/in/johndoe",
                    "githubProfileUrl": "https://github.com/johndoe",
                    "instagramProfileUrl": "https://instagram.com/johndoe"
                }
            }
        ]
    }
    ```

#### Update Event Detail
- **URL**: `/alumni/events/{id}`
- **Method**: `PUT`
- **Function**: `to update event detail`
- **Parameter**: `eventId`
- **Request Body**: `it may contain any field of schema which you want to update`
    ```json
    {
        "eventLocation": "Virtual",
        "eventImage": "https://example.com/images/art-exhibition.jpg",
        "eventMode": "Online"
    }
    ```
- **Response**: `200 OK` 
    ```json
    {
        "status": "success",
        "item": {
            "eventId": 4,
            "eventName": "Art 2025",
            "eventDescription": "Explore the best contemporary art from around the world.",
            "eventDate": "2025-06-15T12:00:00.000Z",
            "eventType": "Exhibition",
            "eventLocation": "Virtual",
            "eventImage": "https://example.com/images/art-exhibition.jpg",
            "eventMode": "Online",
            "category": "Art & Culture",
            "subcategory": "Painting",
            "linkToRegister": "https://example.com/register/art-exhibition",
            "societyId": 1
        },
        "message": "Event updated successfully"
    }
    ```

#### Update Event Attende Detail
- **URL**: `/alumni/events/apply/{id}`
- **Method**: `PUT`
- **Function**: `to update event attende detail`
- **Parameter**: `eventAttendeId`
- **Request Body**: `it may genrally contain any  role field of schema`
    ```json
    {
        "role": "Speaker"
    }
    ```
- **Response**: `200 OK` 
    ```json
    {
        "status": "success",
        "item": {
            "eventAttendeeId": 4,
            "eventId": 3,
            "userId": 2,
            "role": "Speaker"
        },
        "message": "Role updated successfully"
    }
    ```

#### Delete Event
- **URL**: `/alumni/events/{id}`
- **Method**: `DELETE`
- **Function**: `to delete event`
- **Parameter**: `eventId`
- **Response**: `200 OK`
    ```json
    {
        "status": "success",
        "item": {
            "eventId": 1,
            "eventName": "Tech Meetup 2025",
            "eventDescription": "An event for tech enthusiasts to share ideas and network.",
            "eventDate": "2025-04-05T15:00:00.000Z",
            "eventType": "Conference",
            "eventLocation": "New Delhi, India",
            "eventImage": "https://example.com/images/tech-meetup.jpg",
            "eventMode": "Offline",
            "category": "Technology",
            "subcategory": "Networking",
            "linkToRegister": "https://example.com/register/tech-meetup",
            "societyId": null
        },
        "message": "event deleted successfully"
    }
    ```

#### Delete Event Attendee
- **URL**: `/alumni/events/apply/{attendeeId}`
- **Method**: `DELETE`
- **Function**: `to delete event attendee`
- **Parameter**: `attendeeId`
- **Response**: `200 OK`
    ```json
    {
        "status": "success",
        "item": {
            "eventAttendeeId": 1,
            "eventId": 1,
            "userId": 1,
            "role": "attende"
        },
        "message": "event deleted successfully"
    }
    ```

#### Get All Events By user id
- **URL**: `/alumni/events/user/{id}`
- **Method**: `GET`
- **Function**: `to get all event attend by user`
- **Parameter**: `userId`
- **Response**:
    - Success - 200 OK
    ```json
    {
        "status": "success",
        "item": [
            {
                "eventAttendeeId": 2,
                "eventId": 2,
                "userId": 1,
                "role": "attende",
                "event": {
                    "eventId": 2,
                    "eventName": "Online Yoga Workshop",
                    "eventDate": "2025-03-28T10:00:00.000Z",
                    "eventDescription": "Join our online yoga session to refresh your mind and body.",
                    "eventLocation": "Virtual",
                    "eventMode": "Online",
                    "eventType": "Workshop",
                    "eventImage": "https://example.com/images/yoga-workshop.jpg",
                    "category": "Health & Wellness",
                    "subcategory": "Fitness"
                }
            },
            {
                "eventAttendeeId": 3,
                "eventId": 3,
                "userId": 1,
                "role": "attende",
                "event": {
                    "eventId": 3,
                    "eventName": "Art Exhibition 2025",
                    "eventDate": "2025-06-15T12:00:00.000Z",
                    "eventDescription": "Explore the best contemporary art from around the world.",
                    "eventLocation": "Mumbai, India",
                    "eventMode": "Offline",
                    "eventType": "Exhibition",
                    "eventImage": "https://example.com/images/art-exhibition.jpg",
                    "category": "Art & Culture",
                    "subcategory": "Painting"
                }
            }
        ]
    }
    ```
---
---
### Achievements Endpoints
#### Add new achievement
- **URL**: `/alumni/achievements`
- **Method**: `POST`
- **Function**: `to add new achievements`
- **Parameter**: `No Parameters`
- **Request Body**: 
    ```json
    {
        "userId": 1,
        "title": "Cultural Fest Volunteer",
        "description": "Actively contributed as a volunteer during the college cultural fest.",
        "startDate": "2025-02-10T12:00:00Z",
        "endDate": "2025-02-12T12:00:00Z",
        "organizedBy": "College Events Committee",
        "mode": "OFFLINE",
        "isTechnical": false,
        "result": "Volunteer Certificate",
        "certificate": null,
        "status": "ACCEPTED"
    }
    ```
- **Response**: `201 Created`
    ```json
    {
        "status": "success",
        "item": {
            "achievementId": 1,
            "userId": 1,
            "title": "Cultural Fest Volunteer",
            "description": "Actively contributed as a volunteer during the college cultural fest.",
            "startDate": "2025-02-10T12:00:00.000Z",
            "endDate": "2025-02-12T12:00:00.000Z",
            "organizedBy": "College Events Committee",
            "mode": "OFFLINE",
            "isTechnical": false,
            "result": "Volunteer Certificate",
            "certificate": null,
            "status": "ACCEPTED",
            "dateCreated": "2025-03-22T15:14:19.800Z",
            "dateModified": "2025-03-22T15:14:19.800Z"
        },
        "message": "achievement created successfully"
    }
    ```

#### Get all achievements
- **URL**: `/alumni/achievements`
- **Method**: `GET`
- **Function**: `to get all achievements`
- **Parameter**: `No Parameters`
- **Query Parameters**: `role={value}&page={value}`
    - `role is optional. value of role is "ALUMNI" or "STUDENT". default value is both.`
    - `page is optional. value of page is integer. default value is 1`
- **Request Body**: `No Request Body`
- **Response**: `200 OK`
    ```json
    {
        "status": "success",
        "items": [
            {
                "achievementId": 1,
                "userId": 1,
                "title": "Cultural Fest Volunteer",
                "description": "Actively contributed as a volunteer during the college cultural fest.",
                "startDate": "2025-02-10T12:00:00.000Z",
                "endDate": "2025-02-12T12:00:00.000Z",
                "organizedBy": "College Events Committee",
                "mode": "OFFLINE",
                "isTechnical": false,
                "result": "Volunteer Certificate",
                "certificate": null,
                "status": "ACCEPTED",
                "dateCreated": "2025-03-22T15:14:19.800Z",
                "dateModified": "2025-03-22T15:14:19.800Z",
                "user": {
                    "firstName": "Priya",
                    "lastName": "Kumar",
                    "passingYear": 2025,
                    "branch": "IT",
                    "section": "B",
                    "email": "priya.kumar@example.com",
                    "linkedInProfileUrl": "https://linkedin.com/in/janesmith",
                    "githubProfileUrl": "https://github.com/janesmith",
                    "instagramProfileUrl": "https://instagram.com/janesmith"
                },
                "images": []
            }
        ],
        "meta": {
            "totalItems": 1,
            "totalPages": 1,
            "currentPage": 1,
            "itemsPerPage": 10
        }
    }
    ```

#### Get A achievement
- **URL**: `/alumni/achievements/{id}`
- **Method**: `GET`
- **Function**: `to get a achievement by its id`
- **Parameter**: `Achievement Id`
- **Request Body**: `No Request Body`
- **Response**: `200 OK`
    ```json
    {
        "status": "success",
        "item": {
            "achievementId": 1,
            "userId": 1,
            "title": "Cultural Fest Volunteer",
            "description": "Actively contributed as a volunteer during the college cultural fest.",
            "startDate": "2025-02-10T12:00:00.000Z",
            "endDate": "2025-02-12T12:00:00.000Z",
            "organizedBy": "College Events Committee",
            "mode": "OFFLINE",
            "isTechnical": false,
            "result": "Volunteer Certificate",
            "certificate": null,
            "status": "ACCEPTED",
            "dateCreated": "2025-03-22T15:14:19.800Z",
            "dateModified": "2025-03-22T15:14:19.800Z",
            "user": {
                "firstName": "Priya",
                "lastName": "Kumar",
                "enrollmentNumber": 87654321,
                "userId": 1,
                "passingYear": 2025,
                "branch": "IT",
                "section": "B",
                "email": "priya.kumar@example.com",
                "linkedInProfileUrl": "https://linkedin.com/in/janesmith",
                "githubProfileUrl": "https://github.com/janesmith",
                "instagramProfileUrl": "https://instagram.com/janesmith"
            },
            "images": []
        }
    }
    ```

#### Get all achievements of a user
- **URL**: `/alumni/achievements/user/{id}`
- **Method**: `GET`
- **Function**: `to get all achievements of a particular user`
- **Parameter**: `userID`
- **Request Body**: `No Request Body`
- **Response**: `200 OK`
    ```json
    [
        {
            "achievementId": 2,
            "userId": 2,
            "title": "Cultural Fest Volunteer",
            "description": "Actively contributed as a volunteer during the college cultural fest.",
            "startDate": "2025-02-10T12:00:00.000Z",
            "endDate": "2025-02-12T12:00:00.000Z",
            "organizedBy": "College Events Committee",
            "mode": "OFFLINE",
            "isTechnical": false,
            "result": "Volunteer Certificate",
            "certificate": null,
            "status": "ACCEPTED",
            "dateCreated": "2025-03-22T15:21:55.210Z",
            "dateModified": "2025-03-22T15:21:55.210Z",
            "user": {
                "firstName": "John",
                "lastName": "Doe",
                "passingYear": 2025,
                "branch": "CSE",
                "section": "A",
                "email": "john.doe@example.com",
                "enrollmentNumber": 1,
                "userId": 2,
                "linkedInProfileUrl": "https://linkedin.com/in/johndoe",
                "githubProfileUrl": "https://github.com/johndoe",
                "instagramProfileUrl": "https://instagram.com/johndoe"
            },
            "images": []
        },
        {
            "achievementId": 3,
            "userId": 2,
            "title": "Cultural Fest Volunteer",
            "description": "Actively contributed as a volunteer during the college cultural fest.",
            "startDate": "2025-02-10T12:00:00.000Z",
            "endDate": "2025-02-12T12:00:00.000Z",
            "organizedBy": "College Events Committee",
            "mode": "OFFLINE",
            "isTechnical": false,
            "result": "Volunteer Certificate",
            "certificate": null,
            "status": "ACCEPTED",
            "dateCreated": "2025-03-22T15:23:13.904Z",
            "dateModified": "2025-03-22T15:23:13.904Z",
            "user": {
                "firstName": "John",
                "lastName": "Doe",
                "passingYear": 2025,
                "branch": "CSE",
                "section": "A",
                "email": "john.doe@example.com",
                "enrollmentNumber": 1,
                "userId": 2,
                "linkedInProfileUrl": "https://linkedin.com/in/johndoe",
                "githubProfileUrl": "https://github.com/johndoe",
                "instagramProfileUrl": "https://instagram.com/johndoe"
            },
            "images": []
        }
    ]
    ```

#### Update achievement
- **URL**: `/alumni/achievements/{id}`
- **Method**: `PUT`
- **Function**: `to update achievement`
- **Parameter**: `achievementID`
- **Request Body**: 
    ```json
    {
        "title": "Hackathon Champion 2025",
        "description": "Secured the championship in the ABC Corp Hackathon.",
        "status": "ACCEPTED",
        "certificate": "https://example.com/certificates/hackathon-champion-2025.pdf"
    }
    ```
- **Response**: `200 OK`
    ```json
    {
        "status": "success",
        "item": {
            "achievementId": 1,
            "userId": 1,
            "title": "Hackathon Champion 2025",
            "description": "Secured the championship in the ABC Corp Hackathon.",
            "startDate": "2025-02-10T12:00:00.000Z",
            "endDate": "2025-02-12T12:00:00.000Z",
            "organizedBy": "College Events Committee",
            "mode": "OFFLINE",
            "isTechnical": false,
            "result": "Volunteer Certificate",
            "certificate": "https://example.com/certificates/hackathon-champion-2025.pdf",
            "status": "ACCEPTED",
            "dateCreated": "2025-03-22T15:14:19.800Z",
            "dateModified": "2025-03-22T15:29:10.021Z"
        },
        "message": "Achievement updated successfully"
    }
    ```

#### Delete achievement
- **URL**: `/alumni/achievements/{id}`
- **Method**: `DELETE`
- **Function**: `to delete an achievement`
- **Parameter**: `achievementID`
- **Request Body**: `No request Body`
- **Response**: `200 OK`
    ```json
    {
        "status": "success",
        "item": {
            "achievementId": 3,
            "userId": 2,
            "title": "Cultural Fest Volunteer",
            "description": "Actively contributed as a volunteer during the college cultural fest.",
            "startDate": "2025-02-10T12:00:00.000Z",
            "endDate": "2025-02-12T12:00:00.000Z",
            "organizedBy": "College Events Committee",
            "mode": "OFFLINE",
            "isTechnical": false,
            "result": "Volunteer Certificate",
            "certificate": null,
            "status": "ACCEPTED",
            "dateCreated": "2025-03-22T15:23:13.904Z",
            "dateModified": "2025-03-22T15:23:13.904Z"
        },
        "message": "Achievement deleted successfully"
    }
    ```
#### Add achievement Images
- **URL**: `/alumni/achievements/image`
- **Method**: `POST`
- **Function**: `to add an achievement image`
- **Parameter**: `No Parameter`
- **Request Body**:
    ```json
    {
        "achievmentId": 2,
        "imageUrl": "https://example.com/images/hackathon-winner-2025.jpg"
    }
    ```
- **Response**: `201 Created`
    ```json
    {
        "status": "success",
        "item": {
            "id": 3,
            "achievementId": 2,
            "imageUrl": "https://example.com/images/hackathon-winner-2025.jpg"
        },
        "message": "Achievement Image Added successfully"
    }
    ```
#### Get all achievement Images of an achievement
- **URL**: `/alumni/achievements/images/{id}`
- **Method**: `GET`
- **Function**: `to get all achievement images`
- **Parameter**: `achievementId`
- **Request Body**: `No Request Body`
- **Response**: `200 Ok`
    ```json
    {
        "status": "success",
        "items": [
            {
                "id": 1,
                "achievementId": 1,
                "imageUrl": "https://example.com/images/hackathon-winner-2025.jpg"
            },
            {
                "id": 2,
                "achievementId": 1,
                "imageUrl": "https://example.com/images/hackathon-winner-2025.jpg"
            }
        ]
    }
    ```
#### Update achievement Image
- **URL**: `/alumni/achievements/images/{id}`
- **Method**: `PUT`
- **Function**: `to update an achievement image`
- **Parameter**: `achievementImageId`
- **Request Body**:
    ```json
    {
        "imageUrl": "https://example.com/images/winner-2025.jpg"
    }
    ```
- **Response**: `200 OK`
    ```json
   {
        "status": "success",
        "item": {
            "id": 2,
            "achievementId": 1,
            "imageUrl": "https://example.com/images/winner-2025.jpg"
        },
        "message": "Achievement Image updated successfully"
    }
    ```
#### Delete achievement Images
- **URL**: `/alumni/achievements/image/{id}`
- **Method**: `DELETE`
- **Function**: `to delete an achievement image`
- **Parameter**: `achievementImageId`
- **Request Body**: `No Request Body`
- **Response**: `200 OK`
    ```json
    {
        "status": "success",
        "item": {
            "id": 3,
            "achievementId": 2,
            "imageUrl": "https://example.com/images/hackathon-winner-2025.jpg"
        },
        "message": "Achievement Image deleted successfully"
    }
    ```

#### Delete All achievement Images of an Achievement
- **URL**: `/alumni/achievements/images/{id}`
- **Method**: `DELETE`
- **Function**: `to delete all achievement images of an achievement`
- **Parameter**: `achievementId`
- **Request Body**: `No Request Body`
- **Response**: `200 OK`
    ```json
    {
        "status": "success",
        "item": {
            "count": 2
        },
        "message": "Achievement Images deleted successfully"
    }
    ```
---
---

### Album Endpoints
#### Create Album
- **URL**: `/albums`
- **Method**: `POST`
- **Function**: `to create a new album`
- **Parameter**: `No Parameters`
- **Request Body**:
    ```json
    {
        "albumName": "Summer Vacation 2024",
        "albumDescription": "A collection of memories from our summer trip.",
        "albumThumbnail": "https://example.com/img.summer-vacation.jpg"
    }

    ```
- **Response**: `201 Created`
    ```json
    {
        "status": "success",
        "item": {
            "albumId": 1,
            "albumName": "Summer Vacation 2024",
            "albumDescription": "A collection of memories from our summer trip.",
            "albumThumbnail": "https://example.com/img.summer-vacation.jpg"
        },
        "message": "Album created successfully"
    }
    ```

#### Add Image in Album
- **URL**: `/albums/images`
- **Method**: `POST`
- **Function**: `to add image in a album`
- **Parameter**: `No Parameters`
- **Request Body**:
    ```json
    {
        "imageTitle": "Beach",
        "imageDescription": "A beach during our vacation.",
        "imageUrl": "https://example.com/images/beach-sunset.jpg",
        "albumId": 2
    }
    ```
- **Response**: `201 Created`
    ```json
    {
        "status": "success",
        "item": {
            "imageId": 5,
            "imageTitle": "Beach",
            "imageDescription": "A beach during our vacation.",
            "imageUrl": "https://example.com/images/beach-sunset.jpg",
            "albumId": 2
        },
        "message": "Image Added successfully"
    }
    ```

#### Get All Album Details
- **URL**: `/albums`
- **Method**: `GET`
- **Function**: `to get all album details`
- **Query Parameter**: `page={value}`
    - `page`: `string` (optional) (default value is 1)
- **Response**: `200 OK`
    ```json
    {
        "status": "success",
        "items": [
            {
                "albumId": 1,
                "albumName": "Summer Vacation 2024",
                "albumDescription": "A collection of memories from our summer trip.",
                "albumThumbnail": "https://example.com/img.summer-vacation.jpg",
                "images": [
                    {
                        "imageId": 1,
                        "imageTitle": "Beach Sunset",
                        "imageDescription": "A beautiful sunset at the beach during our vacation.",                        "imageUrl": "https://example.com/images/beach-sunset.jpg",
                        "albumId": 1
                    },
                    {
                        "imageId": 2,
                        "imageTitle": "Beach Sunset",
                        "imageDescription": "A beautiful sunset at the beach during our vacation.",
                        "imageUrl": "https://example.com/images/beach-sunset.jpg",
                        "albumId": 1
                    },
                    {
                        "imageId": 3,
                        "imageTitle": "Beach Sunset",
                        "imageDescription": "A beautiful sunset at the beach during our vacation.",
                        "imageUrl": "https://example.com/images/beach-sunset.jpg",
                        "albumId": 1
                    }
                ],
                "totalImages": 3
            },
            {
                "albumId": 2,
                "albumName": "Winter Wonderland",
                "albumDescription": "Beautiful snowy landscapes and fun winter activities.",
                "albumThumbnail": "https://example.com/img.summer-vacation.jpg",
                "images": [
                    {
                        "imageId": 4,
                        "imageTitle": "Beach",
                        "imageDescription": "A beach during our vacation.",
                        "imageUrl": "https://example.com/images/beach-sunset.jpg",
                        "albumId": 2
                    },
                    {
                        "imageId": 5,
                        "imageTitle": "Beach",
                        "imageDescription": "A beach during our vacation.",
                        "imageUrl": "https://example.com/images/beach-sunset.jpg",
                        "albumId": 2
                    }
                ],
                "totalImages": 2
            }
        ],
        "meta": {
            "totalItems": 2,
            "currentPage": 1,
            "totalPages": 1,
            "itemsPerPage": 10
        }
    }
    ```

#### Update Album Detail
- **URL**: `/albums/{albumId}`
- **Method**: `PUT`
- **Function**: `to update new album`
- **Parameter**: `albumId`
- **Request Body**: 
    ```json
    {
        "albumName": "Summer Vacation 2023"
    }
    ```
- **Response**: `200 Ok`
    ```json
    {
        "status": "success",
        "item": {
            "albumId": 1,
            "albumName": "Summer Vacation 2023",
            "albumDescription": "A collection of memories from our summer trip.",
            "albumThumbnail": "https://example.com/img.summer-vacation.jpg"
        },
        "message": "album item updated successfully"
    }
    ```
#### Delete Album
- **URL**: `/albums/{albumId}`
- **Method**: `delete`
- **Function**: `to delete a album`
- **Parameter**: `albumId`
- **Request Body**: `No Request Body`
- **Response**: `200 Ok`
    ```json
    {
        "status": "success",
        "item": {
            "albumId": 2,
            "albumName": "Winter Wonderland",
            "albumDescription": "Beautiful snowy landscapes and fun winter activities.",
            "albumThumbnail": "https://example.com/img.summer-vacation.jpg"
        },
        "message": "Album item deleted successfully"
    }
    ```

#### Get Album Photos
- **URL**: `/albums/{albumId}/images`
- **Method**: `GET`
- **Function**: `to get all photos in an album`
- **Parameter**: `albumId`
- **Response**: `200 Ok`
    ```json
    {
        "status": "success",
        "items": [
            {
                "imageId": 1,
                "imageTitle": "Beach Sunset",
                "imageDescription": "A beautiful sunset at the beach during our vacation.",
                "imageUrl": "https://example.com/images/beach-sunset.jpg",
                "albumId": 1
            },
            {
                "imageId": 2,
                "imageTitle": "Beach Sunset",
                "imageDescription": "A beautiful sunset at the beach during our vacation.",
                "imageUrl": "https://example.com/images/beach-sunset.jpg",
                "albumId": 1
            },
            {
                "imageId": 3,
                "imageTitle": "Beach Sunset",
                "imageDescription": "A beautiful sunset at the beach during our vacation.",
                "imageUrl": "https://example.com/images/beach-sunset.jpg",
                "albumId": 1
            }
        ]
    }
    ```

#### Update Image Detail
- **URL**: `/albums/images/{imageId}`
- **Method**: `PUT`
- **Function**: `to update an image detail`
- **Parameter**: `imageId`
- **Request Body**: `image detail to update`
    ```json
    {
        "imageUrl": "sample1.png",
        "imageTitle": "updated Single"
    }
    ```
- **Response**: `200 Ok`
    ```json
    {
        "status": "success",
        "item": {
            "imageId": 2,
            "imageTitle": "updated Single",
            "imageDescription": "A beautiful sunset at the beach during our vacation.",
            "imageUrl": "sample1.png",
            "albumId": 1
        },
        "message": "Image item updated successfully"
    }
    ```

#### Delete Image
- **URL**: `/albums/{albumId}/images/{imageId}`
- **Method**: `DELETE`
- **Function**: `to delete an specific image of album`
- **Parameter**: `imageId and albumId`
- **Response**: `200 Ok`
    ```json
    {
        "status": "success",
        "message": "Image deleted successfully"
    }
    ```

#### Delete all Images of album
- **URL**: `/albums/{albumId}/images`
- **Method**: `DELETE`
- **Function**: `to delete all image of album`
- **Parameter**: `albumId`
- **Response**: `200 Ok`
    ```json
    {
        "status": "success",
        "message": "All Images deleted successfully"
    }
    ```
---
---

### Jobs Posting Endpoints
#### ADD Job Posting
- **URL**: `/job-postings`
- **Method**: `POST`
- **Function**: `to add a new job posting`
- **Parameter**: `No parameter`
- **Request Body**: 
    ```json
    {
        "jobTitle": "Frontend Devloper",
        "jobDescription": "Join our team to work on our industry based project for real world applications.",
        "companyName": "Josh Technology",
        "companyLocation": "Gurugram, delhi",
        "jobMode": "Offline",
        "jobType": "Full-Time",
        "jobCategory": "Devloper",
        "expectedSalary": "70000-85000",
        "requiredSkills": "HTML, CSS, JS, React, Bootstrap",
        "qualifications": "Bteh graduate 2026",
        "responsibilities": "Making responsive pages, handling integration",
        "applyLink": "https://datawizards.com/careers/data-scientist",
        "userId": 2
    }
    ```
- **Response**: `201 Created`
    ```json
    {
        "status": "success",
        "item": {
            "jobsPostingId": 5,
            "userId": 2,
            "jobTitle": "Frontend Devloper",
            "jobDescription": "Join our team to work on our industry based project for real world applications.",
            "companyName": "Josh Technology",
            "companyLocation": "Gurugram, delhi",
            "jobMode": "Offline",
            "jobType": "Full-Time",
            "jobCategory": "Devloper",
            "expectedSalary": "70000-85000",
            "applyLink": "https://datawizards.com/careers/data-scientist",
            "requiredSkills": "HTML, CSS, JS, React, Bootstrap",
            "qualifications": "Bteh graduate 2026",
            "responsibilities": "Making responsive pages, handling integration",
            "isActive": true,
            "createdAt": "2025-03-26T13:19:05.629Z",
            "updatedAt": "2025-03-26T13:19:05.629Z"
        },
        "message": "Job posting created successfully"
    }
    ```

#### Get All Jobs Posting
- **URL**: `/job-postings`
- **Method**: `GET`
- **Function**: `to get all job postings`
- **Parameter**: `No parameter`
- **Query Paramete**: `page={value}`
    - `page`: `string` (optional) (default value is 1)
- **Request Body**: `No request body`
- **Response**: `200 OK`
    ```json
    {
        "status": "success",
        "items": [
            {
                "jobsPostingId": 1,
                "userId": 2,
                "jobTitle": "Data Scientist",
                "jobDescription": "Join our data science team to work on machine learning models and data analysis.",
                "companyName": "Data Wizards LLC",
                "companyLocation": "New York, NY",
                "jobMode": "Remote",
                "jobType": "Full-Time",
                "jobCategory": "Data Science",
                "expectedSalary": "10000-35000",
                "applyLink": "https://datawizards.com/careers/data-scientist",
                "requiredSkills": "Python, Data Science",
                "qualifications": "Bteh graduate 2026",
                "responsibilities": "Managind Data",
                "isActive": true,
                "createdAt": "2025-03-26T13:13:40.363Z",
                "updatedAt": "2025-03-26T13:13:40.363Z",
                "user": {
                    "firstName": "John",
                    "lastName": "Doe",
                    "passingYear": 2025,
                    "branch": "CSE",
                    "userId": 2
                }
            },
            {
                "jobsPostingId": 3,
                "userId": 3,
                "jobTitle": "Data Scientist",
                "jobDescription": "Join our data science team to work on machine learning models and data analysis.",
                "companyName": "Data Wizards LLC",
                "companyLocation": "New York, NY",
                "jobMode": "Remote",
                "jobType": "Full-Time",
                "jobCategory": "Data Science",
                "expectedSalary": "10000-35000",
                "applyLink": "https://datawizards.com/careers/data-scientist",
                "requiredSkills": "Python, Data Science",
                "qualifications": "Bteh graduate 2026",
                "responsibilities": "Managind Data",
                "isActive": true,
                "createdAt": "2025-03-26T13:14:45.086Z",
                "updatedAt": "2025-03-26T13:14:45.086Z",
                "user": {
                    "firstName": "Jane",
                    "lastName": "Doe",
                    "passingYear": 2024,
                    "branch": "ECE",
                    "userId": 3
                }
            }
        ],
        "meta": {
            "totalItems": 2,
            "totalPages": 1,
            "currenPage": 1,
            "itemsPerPage": 10
        }
    }
    ```
#### Get a Job Posting by ID
- **URL**: `/job-postings/{id}`
- **Method**: `GET`
- **Function**: `to get job posting by id`
- **Parameter**: `jobPostingId`
- **Request Body**: `No request body`
- **Response**: `200 OK`
    ```json
    {
        "status": "success",
        "item": {
            "jobsPostingId": 1,
            "userId": 2,
            "jobTitle": "Data Scientist",
            "jobDescription": "Join our data science team to work on machine learning models and data analysis.",
            "companyName": "Data Wizards LLC",
            "companyLocation": "New York, NY",
            "jobMode": "Remote",
            "jobType": "Full-Time",
            "jobCategory": "Data Science",
            "expectedSalary": "10000-35000",
            "applyLink": "https://datawizards.com/careers/data-scientist",
            "requiredSkills": "Python, Data Science",
            "qualifications": "Bteh graduate 2026",
            "responsibilities": "Managind Data",
            "isActive": true,
            "createdAt": "2025-03-26T13:13:40.363Z",
            "updatedAt": "2025-03-26T13:13:40.363Z",
            "user": {
                "firstName": "John",
                "lastName": "Doe",
                "passingYear": 2025,
                "branch": "CSE",
                "userId": 2
            }
        }
    }
    ```
#### Get all jobs postings by user ID
- **URL**: `/job-postings/user/{id}`
- **Method**: `GET`
- **Function**: `to get all job postings by user id`
- **Parameter**: `userId`
- **Query Parameters**: `page={value}`
    - `page`: `string` (optional) (default value is 1)
- **Request Body**: `No request body`
- **Response**: `200 OK`
    ```json
    {
        "status": "success",
        "items": [
            {
                "jobsPostingId": 3,
                "userId": 3,
                "jobTitle": "Data Scientist",
                "jobDescription": "Join our data science team to work on machine learning models and data analysis.",
                "companyName": "Data Wizards LLC",
                "companyLocation": "New York, NY",
                "jobMode": "Remote",
                "jobType": "Full-Time",
                "jobCategory": "Data Science",
                "expectedSalary": "10000-35000",
                "applyLink": "https://datawizards.com/careers/data-scientist",
                "requiredSkills": "Python, Data Science",
                "qualifications": "Bteh graduate 2026",
                "responsibilities": "Managind Data",
                "isActive": true,
                "createdAt": "2025-03-26T13:14:45.086Z",
                "updatedAt": "2025-03-26T13:14:45.086Z",
                "user": {
                    "firstName": "Jane",
                    "lastName": "Doe",
                    "passingYear": 2024,
                    "branch": "ECE",
                    "userId": 3
                }
            },
            {
                "jobsPostingId": 4,
                "userId": 3,
                "jobTitle": "Data Scientist",
                "jobDescription": "Join our data science team to work on machine learning models and data analysis.",
                "companyName": "Data Wizards LLC",
                "companyLocation": "New York, NY",
                "jobMode": "Remote",
                "jobType": "Full-Time",
                "jobCategory": "Data Science",
                "expectedSalary": "10000-35000",
                "applyLink": "https://datawizards.com/careers/data-scientist",
                "requiredSkills": "Python, Data Science",
                "qualifications": "Bteh graduate 2026",
                "responsibilities": "Managind Data",
                "isActive": true,
                "createdAt": "2025-03-26T13:14:51.090Z",
                "updatedAt": "2025-03-26T13:14:51.090Z",
                "user": {
                    "firstName": "Jane",
                    "lastName": "Doe",
                    "passingYear": 2024,
                    "branch": "ECE",
                    "userId": 3
                }
            }
        ],
        "meta": {
            "totalItems": 2,
            "totalPages": 1,
            "currentPage": 1,
            "itemsPerPage": 10
        }
    }
    ```

#### Update Job Postings
- **URL**: `/job-postings/{id}`
- **Method**: `PUT`
- **Parameter**: `jobPostingId`
- **Function**: `to update a job posting by its id`
- **Request Body**: 
    ```json
    {
        "jobTitle": "Senior Software Engineer",
        "expectedSalary": "110000-180000"
    }
    ```
- **Response**: 
    ```json
    {
        "status": "success",
        "item": {
            "jobsPostingId": 3,
            "userId": 3,
            "jobTitle": "Senior Software Engineer",
            "jobDescription": "Join our data science team to work on machine learning models and data analysis.",
            "companyName": "Data Wizards LLC",
            "companyLocation": "New York, NY",
            "jobMode": "Remote",
            "jobType": "Full-Time",
            "jobCategory": "Data Science",
            "expectedSalary": "110000-180000",
            "applyLink": "https://datawizards.com/careers/data-scientist",
            "requiredSkills": "Python, Data Science",
            "qualifications": "Bteh graduate 2026",
            "responsibilities": "Managind Data",
            "isActive": true,
            "createdAt": "2025-03-26T13:14:45.086Z",
            "updatedAt": "2025-03-26T13:32:26.647Z"
        },
        "message": "Job posting updated successfully"
    }
    ```

#### Delete Job Posting
- **URL**: `/job-postings/{id}`
- **Method**: `DELETE`
- **Parameter**: `jobPostingId`
- **Function**: `to delete a job posting by its id`
- **Response**: `200 Ok`
    ```json
    {
        "status": "success",
        "item": {
            "jobsPostingId": 4,
            "userId": 3,
            "jobTitle": "Data Scientist",
            "jobDescription": "Join our data science team to work on machine learning models and data analysis.",
            "companyName": "Data Wizards LLC",
            "companyLocation": "New York, NY",
            "jobMode": "Remote",
            "jobType": "Full-Time",
            "jobCategory": "Data Science",
            "expectedSalary": "10000-35000",
            "applyLink": "https://datawizards.com/careers/data-scientist",
            "requiredSkills": "Python, Data Science",
            "qualifications": "Bteh graduate 2026",
            "responsibilities": "Managind Data",
            "isActive": true,
            "createdAt": "2025-03-26T13:14:51.090Z",
            "updatedAt": "2025-03-26T13:14:51.090Z"
        },
        "message": "Job posting deleted successfully"
    }
    ```

### Job Application Endpoints
#### Create Job Application
- **URL**: `/job-applications`
- **Method**: `POST`
- **Parameter**: `No Parameters`
- **Function**: `to create a new job application`
- **Request Body**: 
    ```json
    {
        "jobPostingId": 3,
        "userId": 3,
        "resumeUrl": "https://drive.google.com/resume-mohit.pdf"
    }
    ```
- **Response**: `201 Created`
    ```json
    {
        "status": "success",
        "item": {
            "jobApplicationId": 3,
            "jobPostingId": 3,
            "userId": 3,
            "status": "PENDING",
            "resumeUrl": "https://drive.google.com/resume-mohit.pdf",
            "coverLetter": null,
            "appliedAt": "2025-03-26T13:39:50.251Z"
        },
        "message": "Job application submitted successfully"
    }
    ```
#### Get Job Application By Id
- **URL**: `/job-applications/:id`
- **Method**: `GET`
- **Parameter**: `id` (Job Application ID)
- **Function**: `to get a job application by id`
- **Response**: `200 OK`
    ```json
    {
        "status": "success",
        "item": {
            "jobApplicationId": 1,
            "jobPostingId": 1,
            "userId": 2,
            "status": "PENDING",
            "resumeUrl": "https://drive.google.com/resume-mohit.pdf",
            "coverLetter": null,
            "appliedAt": "2025-03-26T13:39:25.840Z",
            "user": {
                "userId": 2,
                "firstName": "John",
                "lastName": "Doe",
                "branch": "CSE",
                "passingYear": 2025,
                "email": "john.doe@example.com"
            },
            "jobPosting": {
                "jobsPostingId": 1,
                "userId": 2,
                "jobTitle": "Data Scientist",
                "jobDescription": "Join our data science team to work on machine learning models and data analysis.",
                "companyName": "Data Wizards LLC",
                "companyLocation": "New York, NY",
                "jobMode": "Remote",
                "jobType": "Full-Time",
                "jobCategory": "Data Science",
                "expectedSalary": "10000-35000",
                "applyLink": "https://datawizards.com/careers/data-scientist",
                "requiredSkills": "Python, Data Science",
                "qualifications": "Bteh graduate 2026",
                "responsibilities": "Managind Data",
                "isActive": true,
                "createdAt": "2025-03-26T13:13:40.363Z",
                "updatedAt": "2025-03-26T13:13:40.363Z"
            }
        }
    }
    ```

#### Get all Application of a job Posting
- **URL**: `/job-applications/job/:id`
- **Method**: `GET`
- **Parameter**: `id` (Job Posting ID)
- **Function**: `to get all job applications of a job posting by id`
- **Response**: `200 OK`
    ```json
    {
        "status": "success",
        "items": [
            {
                "jobApplicationId": 2,
                "jobPostingId": 3,
                "userId": 2,
                "status": "PENDING",
                "resumeUrl": "https://drive.google.com/resume-mohit.pdf",
                "coverLetter": null,
                "appliedAt": "2025-03-26T13:39:39.720Z",
                "user": {
                    "userId": 2,
                    "firstName": "John",
                    "lastName": "Doe",
                    "branch": "CSE",
                    "passingYear": 2025,
                    "email": "john.doe@example.com"
                },
                "jobPosting": {
                    "jobsPostingId": 3,
                    "userId": 3,
                    "jobTitle": "Senior Software Engineer",
                    "jobDescription": "Join our data science team to work on machine learning models and data analysis.",
                    "companyName": "Data Wizards LLC",
                    "companyLocation": "New York, NY",
                    "jobMode": "Remote",
                    "jobType": "Full-Time",
                    "jobCategory": "Data Science",
                    "expectedSalary": "110000-180000",
                    "applyLink": "https://datawizards.com/careers/data-scientist",
                    "requiredSkills": "Python, Data Science",
                    "qualifications": "Bteh graduate 2026",
                    "responsibilities": "Managind Data",
                    "isActive": true,
                    "createdAt": "2025-03-26T13:14:45.086Z",
                    "updatedAt": "2025-03-26T13:32:26.647Z"
                }
            },
            {
                "jobApplicationId": 3,
                "jobPostingId": 3,
                "userId": 3,
                "status": "PENDING",
                "resumeUrl": "https://drive.google.com/resume-mohit.pdf",
                "coverLetter": null,
                "appliedAt": "2025-03-26T13:39:50.251Z",
                "user": {
                    "userId": 3,
                    "firstName": "Jane",
                    "lastName": "Doe",
                    "branch": "ECE",
                    "passingYear": 2024,
                    "email": "jane.doe@example.com"
                },
                "jobPosting": {
                    "jobsPostingId": 3,
                    "userId": 3,
                    "jobTitle": "Senior Software Engineer",
                    "jobDescription": "Join our data science team to work on machine learning models and data analysis.",
                    "companyName": "Data Wizards LLC",
                    "companyLocation": "New York, NY",
                    "jobMode": "Remote",
                    "jobType": "Full-Time",
                    "jobCategory": "Data Science",
                    "expectedSalary": "110000-180000",
                    "applyLink": "https://datawizards.com/careers/data-scientist",
                    "requiredSkills": "Python, Data Science",
                    "qualifications": "Bteh graduate 2026",
                    "responsibilities": "Managind Data",
                    "isActive": true,
                    "createdAt": "2025-03-26T13:14:45.086Z",
                    "updatedAt": "2025-03-26T13:32:26.647Z"
                }
            }
        ]
    }
    ```
#### Get all Application of a User
- **URL**: `/job-applications/user/:id`
- **Method**: `GET`
- **Parameter**: `id` (User ID)
- **Description**: `Get all job applications of a user.`
- **Response**: `200 OK` 
    ```json
    {
        "status": "success",
        "items": [
            {
                "jobApplicationId": 3,
                "jobPostingId": 3,
                "userId": 3,
                "status": "PENDING",
                "resumeUrl": "https://drive.google.com/resume-mohit.pdf",
                "coverLetter": null,
                "appliedAt": "2025-03-26T13:39:50.251Z",
                "jobPosting": {
                    "jobsPostingId": 3,
                    "userId": 3,
                    "jobTitle": "Senior Software Engineer",
                    "jobDescription": "Join our data science team to work on machine learning models and data analysis.",
                    "companyName": "Data Wizards LLC",
                    "companyLocation": "New York, NY",
                    "jobMode": "Remote",
                    "jobType": "Full-Time",
                    "jobCategory": "Data Science",
                    "expectedSalary": "110000-180000",
                    "applyLink": "https://datawizards.com/careers/data-scientist",
                    "requiredSkills": "Python, Data Science",
                    "qualifications": "Bteh graduate 2026",
                    "responsibilities": "Managind Data",
                    "isActive": true,
                    "createdAt": "2025-03-26T13:14:45.086Z",
                    "updatedAt": "2025-03-26T13:32:26.647Z"
                }
            }
        ]
    }
    ```

#### Update Job Application
- **URL**: `/job-applications/:id`
- **Method**: `PATCH`
- **Parameter**: `id` (Job Application ID)
- **Description**: `Update the details of a job application.`
- **Request Body**: 
    ```json
    {
        "coverLetter": "https://drive.google.com/resume-mohit-cover-letter.pdf"
    }
    ```
- **Response**: `200 OK`
    ```json
    {
        "status": "success",
        "item": {
            "jobApplicationId": 1,
            "jobPostingId": 1,
            "userId": 2,
            "status": "PENDING",
            "resumeUrl": "https://drive.google.com/resume-mohit.pdf",
            "coverLetter": "https://drive.google.com/resume-mohit-cover-letter.pdf",
            "appliedAt": "2025-03-26T13:39:25.840Z"
        },
        "message": "Application updated successfully"
    }
    ```
#### Update Job Application Status
- **URL**: `job-applications/:id/status`
- **Method**: `PATCH`
- **Parameter**: `id` (Job Application ID)
- **Description**: `Update the status of a job application.`
- **Request Body**:
    ```json
    { "status": "HIRED"}
    ```
- **Response**: `200 OK`
    ```json
    {
        "status": "success",
        "item": {
            "jobApplicationId": 1,
            "jobPostingId": 1,
            "userId": 2,
            "status": "HIRED",
            "resumeUrl": "https://drive.google.com/resume-mohit.pdf",
            "coverLetter": "https://drive.google.com/resume-mohit-cover-letter.pdf",
            "appliedAt": "2025-03-26T13:39:25.840Z"
        },
        "message": "Application status updated"
    }
    ```

#### Delete Job Application
- **URL**: `/job-applications/:id`
- **Method**: `DELETE`
- **Parameter**: `id` (Job Application ID)
- **Description**: `Delete a job application by ID.`
- **Response**: `200 OK`
    ```json
    {
        "status": "success",
        "item": {
            "jobApplicationId": 3,
            "jobPostingId": 3,
            "userId": 3,
            "status": "PENDING",
            "resumeUrl": "https://drive.google.com/resume-mohit.pdf",
            "coverLetter": null,
            "appliedAt": "2025-03-26T13:39:50.251Z"
        },
        "message": "Application deleted successfully"
    }
    ```
### Mentorship Programs
#### ADD NEW
- **URL**: `/mentorship-program`
- **Method**: `POST`
- **Description**: `Create a new mentorship program`
- **Request Body**: `JSON object`
    - Mentor could be a faculty or alumni 
    - for faculty use `facultyMentorId`
    - for alumni use `alumniMentorId`
    ```json 
    {
        "title": "Mentorship_1",
        "mentorType": "ALUMNI",   // ALUMNI, FACULTY
        "description": "this is a program for the juniors",
        "category": "Technical",
        "duration": "3 Months",
        "prerequisites": "NO",
        "schedule": "Jun 2025 - Aug 2025",
        "status": "UPCOMING",
        "alumniMentorId": 2     // facultyMentorId: 1 
    }
    ```
- **Response**: `201 Created`
    ```json
    {
        "status": "success",
        "item": {
            "id": 5,
            "title": "Mentorship_1",
            "mentorType": "ALUMNI",
            "description": "this is a program for the juniors",
            "category": "Technical",
            "duration": "3 Months",
            "prerequisites": "NO",
            "schedule": "Jun 2025 - Aug 2025",
            "status": "UPCOMING",
            "createdAt": "2025-03-31T14:10:18.884Z",
            "updatedAt": "2025-03-31T14:10:18.884Z",
            "facultyMentorId": null,
            "alumniMentorId": 2
        },
        "message": "Mentorship program created successfully"
    }
    ```

#### GET ALL
- **URL**: `/mentorship-program`
- **Method**: `GET`
- **Description**: `Get all mentorship programs`
- **Query Parameters**: `page={value}`
    - `page`: `string` (optional) (default value is 1)
- **Response**: `200 OK`
    ```json
    {
        "status": "success",
        "items": [
            {
                "id": 2,
                "title": "Mentorship_1",
                "mentorType": "FACULTY",
                "description": "this is a program for the juniors",
                "category": "Technical",
                "duration": "3 Months",
                "prerequisites": "NO",
                "schedule": "Jun 2025 - Aug 2025",
                "status": "UPCOMING",
                "createdAt": "2025-03-31T14:09:02.157Z",
                "updatedAt": "2025-03-31T14:09:02.157Z",
                "facultyMentorId": 1,
                "alumniMentorId": null,
                "facultyMentor": {
                    "facultyId": 1,
                    "name": "Dr. John Smith",
                    "department": "Computer Science",
                    "email": "john.smith@example.com",
                    "designation": "Professor",
                    "phone": "1234567890",
                    "profilePictureUrl": "https://example.com/profile.jpg"
                },
                "alumniMentor": null
            },
            {
                "id": 5,
                "title": "Mentorship_1",
                "mentorType": "ALUMNI",
                "description": "this is a program for the juniors",
                "category": "Technical",
                "duration": "3 Months",
                "prerequisites": "NO",
                "schedule": "Jun 2025 - Aug 2025",
                "status": "UPCOMING",
                "createdAt": "2025-03-31T14:10:18.884Z",
                "updatedAt": "2025-03-31T14:10:18.884Z",
                "facultyMentorId": null,
                "alumniMentorId": 2,
                "facultyMentor": null,
                "alumniMentor": {
                    "userId": 2,
                    "firstName": "John",
                    "lastName": "Doe",
                    "email": "john.doe@example.com"
                }
            }
        ],
        "meta": {
            "totalItems": 2,
            "totalPages": 1,
            "currentPage": 1,
            "itemsPerPage": 10
        }
    }
    ```

#### Get By Program Id
- **URL**: `/mentorship-program/{Id}`
- **Method**: `GET`
- **Description**: Get a mentorship program by its id.
- **Parameter**: `Id` - The id of the mentorship program.
- **Response**: `200 OK`
    ```json
    {
        "status": "success",
        "item": {
            "id": 5,
            "title": "Mentorship_1",
            "mentorType": "ALUMNI",
            "description": "this is a program for the juniors",
            "category": "Technical",
            "duration": "3 Months",
            "prerequisites": "NO",
            "schedule": "Jun 2025 - Aug 2025",
            "status": "UPCOMING",
            "createdAt": "2025-03-31T14:10:18.884Z",
            "updatedAt": "2025-03-31T14:10:18.884Z",
            "facultyMentorId": null,
            "alumniMentorId": 2,
            "facultyMentor": null,
            "alumniMentor": {
                "userId": 2,
                "firstName": "John",
                "lastName": "Doe",
                "email": "john.doe@example.com",
                "mobile": "9876543210",
                "passingYear": 2025,
                "profilePictureUrl": "https://example.com/profile/johndoe.jpg"
            }
        }
    }
    ```
#### Get By mentor Id
- **URL**: `/mentorship-program/:MentorType/:id`
- **Method**: `GET`
- **Description**: Get a mentorship program by its mentor id.
- **Parameter**: `MentorType` - The type of mentor (ALUMNI or FACULTY), `id` - The id of the mentor.
- **Response**: `200 OK`
    ```json
    {
        "status": "success",
        "items": [
            {
                "id": 5,
                "title": "Mentorship_1",
                "mentorType": "ALUMNI",
                "description": "this is a program for the juniors",
                "category": "Technical",
                "duration": "3 Months",
                "prerequisites": "NO",
                "schedule": "Jun 2025 - Aug 2025",
                "status": "UPCOMING",
                "createdAt": "2025-03-31T14:10:18.884Z",
                "updatedAt": "2025-03-31T14:10:18.884Z",
                "facultyMentorId": null,
                "alumniMentorId": 2,
                "facultyMentor": null,
                "alumniMentor": {
                    "userId": 2,
                    "firstName": "John",
                    "lastName": "Doe",
                    "email": "john.doe@example.com"
                }
            }
        ]
    }
    ```
#### Update a Program
- **URL**: `/mentorship-program/:id`
- **Method**: `PUT`
- **Description**: Update a mentorship program by its id.
- **Parameter**: `id` - The id of the Program
- **Request Body**: `JSON` - The updated program details
    ```json
    {
        "title": "Program 1",
        "status": "ACTIVE"
    }
    ```
- **Response**: `200 OK`
    ```json
    {
        "status": "success",
        "item": {
            "id": 2,
            "title": "Program 1",
            "mentorType": "FACULTY",
            "description": "this is a program for the juniors",
            "category": "Technical",
            "duration": "3 Months",
            "prerequisites": "NO",
            "schedule": "Jun 2025 - Aug 2025",
            "status": "ACTIVE",
            "createdAt": "2025-03-31T14:09:02.157Z",
            "updatedAt": "2025-03-31T14:30:13.392Z",
            "facultyMentorId": 1,
            "alumniMentorId": null
        },
        "message": "Mentorship program updated successfully"
    }
    ```
#### Delete a Program
- **URL**: `/mentorship-program/:id`
- **Method**: `DELETE`
- **Description**: Delete a mentorship program by its id.
- **Parameter**: `id` - The id of the Program
- **Response**: `200 OK`
    ```json
    {
        "status": "success",
        "item": {
            "id": 6,
            "title": "Mentorship_1",
            "mentorType": "ALUMNI",
            "description": "this is a program for the juniors",
            "category": "Technical",
            "duration": "3 Months",
            "prerequisites": "NO",
            "schedule": "Jun 2025 - Aug 2025",
            "status": "UPCOMING",
            "createdAt": "2025-03-31T14:31:32.306Z",
            "updatedAt": "2025-03-31T14:31:32.306Z",
            "facultyMentorId": null,
            "alumniMentorId": 2
        },
        "message": "Mentorship program deleted successfully"
    }
    ```

### Mentorship Program Applications ENDPOINTS
#### Add New Application
- **URL**: `/mentorship-applications`
- **Method**: `POST`
- **Description**: Add a new mentorship program application.
- **Parameter**: `No Parameter`
    ```json
    {
        "userId": 3,
        "mentorshipId": 1,
        "status": "PENDING"
    }
    ```
- **Response**: `201 Created`
    ```json
    {
        "status": "success",
        "item": {
            "id": 2,
            "userId": 3,
            "mentorshipId": 1,
            "status": "PENDING",
            "createdAt": "2025-03-31T15:12:27.292Z",
            "updatedAt": "2025-03-31T15:12:27.292Z"
        },
        "message": "mentorship application submitted successfully"
    }
    ```

#### Get All Applications of a Mentorship Program
- **URL**: `/mentorship-applications/{mentorshipId}`
- **Method**: `GET`
- **Description**: Get all applications of a mentorship program.
- **Parameter**: `mentorshipId` (integer)
- **Response**: `200 OK`
    ```json
    {
        "status": "success",
        "items": [
            {
                "id": 1,
                "userId": 2,
                "mentorshipId": 1,
                "status": "PENDING",
                "createdAt": "2025-03-31T15:11:44.637Z",
                "updatedAt": "2025-03-31T15:11:44.637Z",
                "user": {
                    "userId": 2,
                    "firstName": "John",
                    "lastName": "Doe",
                    "branch": "CSE",
                    "passingYear": 2025,
                    "email": "john.doe@example.com"
                },
                "mentorship": {
                    "id": 1,
                    "title": "Mentorship_1",
                    "mentorType": "ALUMNI",
                    "description": "this is a program for the juniors",
                    "category": "Technical",
                    "duration": "3 Months",
                    "prerequisites": "NO",
                    "schedule": "Jun 2025 - Aug 2025",
                    "status": "ACTIVE",
                    "createdAt": "2025-03-31T15:08:30.106Z",
                    "updatedAt": "2025-03-31T15:10:33.660Z",
                    "facultyMentorId": null,
                    "alumniMentorId": 2
                }
            },
            {
                "id": 2,
                "userId": 3,
                "mentorshipId": 1,
                "status": "PENDING",
                "createdAt": "2025-03-31T15:12:27.292Z",
                "updatedAt": "2025-03-31T15:12:27.292Z",
                "user": {
                    "userId": 3,
                    "firstName": "Jane",
                    "lastName": "Doe",
                    "branch": "ECE",
                    "passingYear": 2024,
                    "email": "jane.doe@example.com"
                },
                "mentorship": {
                    "id": 1,
                    "title": "Mentorship_1",
                    "mentorType": "ALUMNI",
                    "description": "this is a program for the juniors",
                    "category": "Technical",
                    "duration": "3 Months",
                    "prerequisites": "NO",
                    "schedule": "Jun 2025 - Aug 2025",
                    "status": "ACTIVE",
                    "createdAt": "2025-03-31T15:08:30.106Z",
                    "updatedAt": "2025-03-31T15:10:33.660Z",
                    "facultyMentorId": null,
                    "alumniMentorId": 2
                }
            }
        ]
    }
    ```
#### Get All Applications of a User
- **URL**: `/mentorship-applications/user/:userId`
- **Method**: `GET`
- **Description**: This endpoint is used to get all the applications of a user.
- **Parameter**: `userId` - The ID of the user.
- **Response**: `200 Ok`
    ```json
    {
        "status": "success",
        "items": [
            {
                "id": 2,
                "userId": 3,
                "mentorshipId": 1,
                "status": "PENDING",
                "createdAt": "2025-03-31T15:12:27.292Z",
                "updatedAt": "2025-03-31T15:12:27.292Z",
                "mentorship": {
                    "id": 1,
                    "title": "Mentorship_1",
                    "mentorType": "ALUMNI",
                    "description": "this is a program for the juniors",
                    "category": "Technical",
                    "duration": "3 Months",
                    "prerequisites": "NO",
                    "schedule": "Jun 2025 - Aug 2025",
                    "status": "ACTIVE",
                    "createdAt": "2025-03-31T15:08:30.106Z",
                    "updatedAt": "2025-03-31T15:10:33.660Z",
                    "facultyMentorId": null,
                    "alumniMentorId": 2
                }
            }
        ]
    }
    ```

#### Get a Specific Application 
- **URL**: `/mentorship-applications/:applicationId`
- **Method**: `GET`
- **Description**: This endpoint is used to get a specific application by its ID.
- **Parameter**: `applicationId` - The ID of the application.
- **Response**: `200 Ok`
    ```json
    {
        "status": "success",
        "item": {
            "id": 1,
            "userId": 2,
            "mentorshipId": 1,
            "status": "PENDING",
            "createdAt": "2025-03-31T15:11:44.637Z",
            "updatedAt": "2025-03-31T15:11:44.637Z",
            "user": {
                "userId": 2,
                "firstName": "John",
                "lastName": "Doe",
                "branch": "CSE",
                "passingYear": 2025,
                "email": "john.doe@example.com"
            },
            "mentorship": {
                "id": 1,
                "title": "Mentorship_1",
                "mentorType": "ALUMNI",
                "description": "this is a program for the juniors",
                "category": "Technical",
                "duration": "3 Months",
                "prerequisites": "NO",
                "schedule": "Jun 2025 - Aug 2025",
                "status": "ACTIVE",
                "createdAt": "2025-03-31T15:08:30.106Z",
                "updatedAt": "2025-03-31T15:10:33.660Z",
                "facultyMentorId": null,
                "alumniMentorId": 2
            }
        }
    }
    ```
#### Update Status of Application
- **URL**: `/mentorship-applications/:applicationId/status`
- **Method**: `PUT`
- **Description**: This endpoint is used to update an application by its ID.
- **Parameter**: `applicationId` - The ID of the application.
- **Body**: 
    ```json
    { 
        "status": "APPROVED" // or "REJECTED" or "PENDING" 
    }
    ```
- **Response**: `200 Ok`
    ```json
    {
        "status": "success",
        "item": {
            "id": 1,
            "userId": 2,
            "mentorshipId": 1,
            "status": "APPROVED",
            "createdAt": "2025-03-31T15:11:44.637Z",
            "updatedAt": "2025-03-31T15:27:07.724Z"
        },
        "message": "Application status updated"
    }
    ```

#### Delete Application 
- **URL**: `/mentorship-applications/:applicationId`
- **Method**: `DELETE`
- **Description**: This endpoint is used to delete an application by its ID.
- **Parameter**: `applicationId` - The ID of the application.
- **Response**: `200 Ok`
    ```json
    {
        "status": "success",
        "item": {
            "id": 2,
            "userId": 3,
            "mentorshipId": 1,
            "status": "PENDING",
            "createdAt": "2025-03-31T15:12:27.292Z",
            "updatedAt": "2025-03-31T15:12:27.292Z"
        },
        "message": "Application deleted successfully"
    }
    ```