-- CreateEnum
CREATE TYPE "Mode" AS ENUM ('ONLINE', 'OFFLINE');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- CreateEnum
CREATE TYPE "SocietyStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "SocietyType" AS ENUM ('TECHNICAL', 'NON_TECHNICAL');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('STUDENT', 'ALUMNI');

-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('PENDING', 'SHORTLISTED', 'REJECTED', 'HIRED');

-- CreateEnum
CREATE TYPE "MentorType" AS ENUM ('FACULTY', 'ALUMNI');

-- CreateEnum
CREATE TYPE "ProgramStatus" AS ENUM ('ACTIVE', 'UPCOMING', 'COMPLETED');

-- CreateEnum
CREATE TYPE "ApplStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "StatusAsset" AS ENUM ('PENDING', 'INPROGRESS', 'COMPLETE');

-- CreateEnum
CREATE TYPE "Condition" AS ENUM ('New', 'Good', 'Needs_Repair');

-- CreateTable
CREATE TABLE "Achievement" (
    "achievementId" INT8 NOT NULL DEFAULT unique_rowid(),
    "userId" INT8 NOT NULL,
    "title" STRING NOT NULL,
    "description" STRING NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "organizedBy" STRING NOT NULL,
    "mode" "Mode" NOT NULL,
    "isTechnical" BOOL NOT NULL,
    "result" STRING NOT NULL,
    "certificate" STRING,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("achievementId")
);

-- CreateTable
CREATE TABLE "achievementImages" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "achievementId" INT8 NOT NULL,
    "imageUrl" STRING NOT NULL,

    CONSTRAINT "achievementImages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AchievementAnnouncement" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "userId" INT8 NOT NULL,
    "achievementId" INT8 NOT NULL,
    "mentorId" INT8 NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AchievementAnnouncement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationRequest" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "achievementId" INT8 NOT NULL,
    "studentId" INT8 NOT NULL,
    "mentorId" INT8 NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "userId" INT8 NOT NULL,
    "content" STRING NOT NULL,
    "status" "Status" NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Faculty" (
    "facultyId" INT8 NOT NULL DEFAULT unique_rowid(),
    "name" STRING NOT NULL,
    "department" STRING NOT NULL,
    "specialization" STRING NOT NULL,
    "joiningDate" TIMESTAMP(3) NOT NULL,
    "resigningDate" TIMESTAMP(3),
    "phone" STRING NOT NULL,
    "email" STRING NOT NULL,
    "position" STRING NOT NULL,
    "designation" STRING NOT NULL,
    "profilePictureUrl" STRING NOT NULL,
    "others" STRING NOT NULL,
    "isActiveFaculty" BOOL NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Faculty_pkey" PRIMARY KEY ("facultyId")
);

-- CreateTable
CREATE TABLE "User" (
    "userId" INT8 NOT NULL DEFAULT unique_rowid(),
    "societyId" INT8 NOT NULL,
    "firstName" STRING NOT NULL,
    "lastName" STRING NOT NULL,
    "email" STRING NOT NULL,
    "mobile" STRING NOT NULL,
    "enrollmentNumber" INT4 NOT NULL,
    "password" STRING NOT NULL,
    "section" STRING NOT NULL,
    "role" "Role" NOT NULL,
    "branch" STRING NOT NULL,
    "passingYear" INT4 NOT NULL,
    "fathersName" STRING NOT NULL,
    "mothersName" STRING NOT NULL,
    "hobby" STRING NOT NULL,
    "parentsPhone" STRING NOT NULL,
    "isApproved" BOOL NOT NULL DEFAULT false,
    "isVerified" BOOL NOT NULL DEFAULT false,
    "profilePictureUrl" STRING,
    "githubProfileUrl" STRING,
    "linkedInProfileUrl" STRING,
    "twitterProfileUrl" STRING,
    "gfgProfileUrl" STRING,
    "codingNinjaProfileUrl" STRING,
    "leetcodeProfileUrl" STRING,
    "codeforcesProfileUrl" STRING,
    "instagramProfileUrl" STRING,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "facultyId" INT8 NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Gallary" (
    "gallaryId" INT8 NOT NULL DEFAULT unique_rowid(),
    "imageUrl" STRING NOT NULL,
    "imageTitle" STRING NOT NULL,
    "imageDescription" STRING NOT NULL,
    "societyId" INT8,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Gallary_pkey" PRIMARY KEY ("gallaryId")
);

-- CreateTable
CREATE TABLE "Album" (
    "albumId" INT8 NOT NULL DEFAULT unique_rowid(),
    "albumName" STRING NOT NULL,
    "albumDescription" STRING NOT NULL,
    "albumThumbnail" STRING NOT NULL,

    CONSTRAINT "Album_pkey" PRIMARY KEY ("albumId")
);

-- CreateTable
CREATE TABLE "AlumniImages" (
    "imageId" INT8 NOT NULL DEFAULT unique_rowid(),
    "imageTitle" STRING NOT NULL,
    "imageDescription" STRING NOT NULL,
    "imageUrl" STRING NOT NULL,
    "albumId" INT8 NOT NULL,

    CONSTRAINT "AlumniImages_pkey" PRIMARY KEY ("imageId")
);

-- CreateTable
CREATE TABLE "ProfessionalInformation" (
    "professionalInformationId" INT8 NOT NULL DEFAULT unique_rowid(),
    "userId" INT8 NOT NULL,
    "companyName" STRING NOT NULL,
    "position" STRING NOT NULL,
    "CTC" STRING NOT NULL,
    "employmentType" STRING NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "isApproved" BOOL NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProfessionalInformation_pkey" PRIMARY KEY ("professionalInformationId")
);

-- CreateTable
CREATE TABLE "JobsPosting" (
    "jobsPostingId" INT8 NOT NULL DEFAULT unique_rowid(),
    "userId" INT8 NOT NULL,
    "jobTitle" STRING NOT NULL,
    "jobDescription" STRING NOT NULL,
    "companyName" STRING NOT NULL,
    "companyLocation" STRING NOT NULL,
    "jobMode" STRING NOT NULL,
    "jobType" STRING NOT NULL,
    "jobCategory" STRING NOT NULL,
    "expectedSalary" STRING NOT NULL,
    "applyLink" STRING NOT NULL,
    "requiredSkills" STRING NOT NULL,
    "qualifications" STRING NOT NULL,
    "responsibilities" STRING NOT NULL,
    "isActive" BOOL NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JobsPosting_pkey" PRIMARY KEY ("jobsPostingId")
);

-- CreateTable
CREATE TABLE "JobApplication" (
    "jobApplicationId" INT8 NOT NULL DEFAULT unique_rowid(),
    "jobPostingId" INT8 NOT NULL,
    "userId" INT8 NOT NULL,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'PENDING',
    "resumeUrl" STRING NOT NULL,
    "coverLetter" STRING,
    "appliedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "JobApplication_pkey" PRIMARY KEY ("jobApplicationId")
);

-- CreateTable
CREATE TABLE "InterviewExperience" (
    "interviewExperienceId" INT8 NOT NULL DEFAULT unique_rowid(),
    "userId" INT8 NOT NULL,
    "Title" STRING NOT NULL,
    "company" STRING NOT NULL,
    "description" STRING NOT NULL,
    "isApproved" BOOL NOT NULL DEFAULT false,
    "interviewBody" STRING NOT NULL,
    "interviewDate" TIMESTAMP(3) NOT NULL,
    "onCampus" BOOL NOT NULL,
    "refferal" BOOL NOT NULL,
    "anyTips" STRING,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InterviewExperience_pkey" PRIMARY KEY ("interviewExperienceId")
);

-- CreateTable
CREATE TABLE "Event" (
    "eventId" INT8 NOT NULL DEFAULT unique_rowid(),
    "eventName" STRING NOT NULL,
    "eventDescription" STRING NOT NULL,
    "eventDate" TIMESTAMP(3) NOT NULL,
    "eventType" STRING NOT NULL,
    "eventLocation" STRING NOT NULL,
    "eventImage" STRING NOT NULL,
    "eventMode" STRING NOT NULL,
    "category" STRING NOT NULL,
    "subcategory" STRING NOT NULL,
    "linkToRegister" STRING NOT NULL,
    "societyId" INT8,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("eventId")
);

-- CreateTable
CREATE TABLE "EventAttendee" (
    "eventAttendeeId" INT8 NOT NULL DEFAULT unique_rowid(),
    "eventId" INT8 NOT NULL,
    "userId" INT8 NOT NULL,
    "role" STRING NOT NULL,

    CONSTRAINT "EventAttendee_pkey" PRIMARY KEY ("eventAttendeeId")
);

-- CreateTable
CREATE TABLE "News" (
    "newsId" INT8 NOT NULL DEFAULT unique_rowid(),
    "newsTitle" STRING NOT NULL,
    "newsDescription" STRING NOT NULL,
    "newsImage" STRING NOT NULL,
    "newsDate" TIMESTAMP(3) NOT NULL,
    "isActive" BOOL NOT NULL DEFAULT true,
    "author" STRING NOT NULL,
    "societyId" INT8,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "News_pkey" PRIMARY KEY ("newsId")
);

-- CreateTable
CREATE TABLE "Notice" (
    "noticeId" INT8 NOT NULL DEFAULT unique_rowid(),
    "noticeTitle" STRING NOT NULL,
    "noticeDescription" STRING,
    "noticeDate" TIMESTAMP(3) NOT NULL,
    "noticeLink" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notice_pkey" PRIMARY KEY ("noticeId")
);

-- CreateTable
CREATE TABLE "MentorshipProgram" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "title" STRING NOT NULL,
    "mentorType" "MentorType" NOT NULL,
    "description" STRING NOT NULL,
    "category" STRING NOT NULL,
    "duration" STRING NOT NULL,
    "prerequisites" STRING,
    "schedule" STRING NOT NULL,
    "status" "ProgramStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "facultyMentorId" INT8,
    "alumniMentorId" INT8,

    CONSTRAINT "MentorshipProgram_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MentorshipApplication" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "userId" INT8 NOT NULL,
    "mentorshipId" INT8 NOT NULL,
    "status" "ApplStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MentorshipApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SocietyProfile" (
    "societyId" INT8 NOT NULL,
    "facultyId" INT8 NOT NULL,
    "societyType" STRING NOT NULL,
    "societyName" STRING NOT NULL,
    "societyHead" STRING NOT NULL,
    "dateOfRegistration" TIMESTAMP(3) NOT NULL,
    "societyDescription" STRING NOT NULL,
    "societyImage" STRING NOT NULL,
    "societyEmail" STRING NOT NULL,
    "societyHeadMobile" STRING NOT NULL,
    "societyWebsite" STRING NOT NULL,
    "isApproved" BOOL NOT NULL DEFAULT false,

    CONSTRAINT "SocietyProfile_pkey" PRIMARY KEY ("societyId")
);

-- CreateTable
CREATE TABLE "SocietyAchievement" (
    "societyAchievementId" INT8 NOT NULL,
    "societyId" INT8 NOT NULL,
    "title" STRING NOT NULL,
    "description" STRING NOT NULL,
    "dateAchieved" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SocietyAchievement_pkey" PRIMARY KEY ("societyAchievementId")
);

-- CreateTable
CREATE TABLE "SocietyTestimonial" (
    "userId" INT8 NOT NULL,
    "societyId" INT8 NOT NULL,
    "societyTestimonialId" INT8 NOT NULL,
    "description" STRING NOT NULL,

    CONSTRAINT "SocietyTestimonial_pkey" PRIMARY KEY ("societyTestimonialId")
);

-- CreateTable
CREATE TABLE "StudentAchievement" (
    "societyId" INT8 NOT NULL,
    "userId" INT8 NOT NULL,
    "achievementId" INT4 NOT NULL,
    "title" STRING NOT NULL,
    "description" STRING NOT NULL,
    "dateAchieved" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudentAchievement_pkey" PRIMARY KEY ("achievementId")
);

-- CreateTable
CREATE TABLE "StudentMarking" (
    "userId" INT8 NOT NULL,
    "societyId" INT8 NOT NULL,
    "markingId" INT8 NOT NULL DEFAULT unique_rowid(),
    "studentGrades" STRING NOT NULL,

    CONSTRAINT "StudentMarking_pkey" PRIMARY KEY ("markingId")
);

-- CreateTable
CREATE TABLE "SocietyMember" (
    "memberId" INT8 NOT NULL DEFAULT unique_rowid(),
    "userId" INT8 NOT NULL,
    "societyId" INT8 NOT NULL,
    "societyPosition" STRING NOT NULL,
    "domainExpertise" STRING NOT NULL,
    "memberType" STRING NOT NULL,
    "studentContributions" STRING NOT NULL,
    "isApproved" BOOL NOT NULL DEFAULT true,
    "isActiveMember" BOOL NOT NULL DEFAULT true,
    "dateJoined" TIMESTAMP(3) NOT NULL,
    "dateResigned" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SocietyMember_pkey" PRIMARY KEY ("memberId")
);

-- CreateTable
CREATE TABLE "SocietyRole" (
    "societyRoleId" INT8 NOT NULL DEFAULT unique_rowid(),
    "societyId" INT8 NOT NULL,
    "roleType" STRING NOT NULL,
    "roleName" STRING NOT NULL,
    "roleDescription" STRING NOT NULL,
    "lastDateToApply" TIMESTAMP(3) NOT NULL,
    "Responsibilities" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SocietyRole_pkey" PRIMARY KEY ("societyRoleId")
);

-- CreateTable
CREATE TABLE "Room" (
    "roomId" INT8 NOT NULL DEFAULT unique_rowid(),
    "roomType" STRING NOT NULL,
    "isActive" BOOL NOT NULL,
    "FloorNo" INT4 NOT NULL,
    "Condition" "Condition" NOT NULL,
    "Location" STRING NOT NULL,
    "isCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isModified" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("roomId")
);

-- CreateTable
CREATE TABLE "Equipment" (
    "equipmentId" INT8 NOT NULL DEFAULT unique_rowid(),
    "Location" STRING NOT NULL,
    "equipmentType" STRING NOT NULL,
    "warranty" STRING NOT NULL,
    "purchaseDate" TIMESTAMP(3) NOT NULL,
    "issueHistory" STRING NOT NULL,
    "condition" "Condition" NOT NULL,
    "qrCode" STRING NOT NULL,
    "isCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isModified" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOL NOT NULL,

    CONSTRAINT "Equipment_pkey" PRIMARY KEY ("equipmentId")
);

-- CreateTable
CREATE TABLE "Issue" (
    "issueId" INT8 NOT NULL DEFAULT unique_rowid(),
    "Location" STRING NOT NULL,
    "equipmentType" STRING NOT NULL,
    "warranty" STRING NOT NULL,
    "purchaseDate" TIMESTAMP(3) NOT NULL,
    "issueHistory" STRING NOT NULL,
    "condition" "Condition" NOT NULL,
    "qrCode" STRING NOT NULL,
    "isCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isModified" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOL NOT NULL,
    "Status" "StatusAsset" NOT NULL,

    CONSTRAINT "Issue_pkey" PRIMARY KEY ("issueId")
);

-- CreateTable
CREATE TABLE "EquipmentType" (
    "equipmentTypeId" INT8 NOT NULL DEFAULT unique_rowid(),
    "Types" STRING NOT NULL,
    "Quantity" INT4 NOT NULL,
    "Title" STRING NOT NULL,
    "Description" STRING NOT NULL,
    "isActive" BOOL NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EquipmentType_pkey" PRIMARY KEY ("equipmentTypeId")
);

-- CreateTable
CREATE TABLE "Remarks" (
    "remarkId" INT8 NOT NULL DEFAULT unique_rowid(),
    "remark" STRING NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Remarks_pkey" PRIMARY KEY ("remarkId")
);

-- CreateTable
CREATE TABLE "NotificationAsset" (
    "notificationId" INT8 NOT NULL DEFAULT unique_rowid(),
    "notificationTitle" STRING NOT NULL,
    "notificationDescription" STRING NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOL NOT NULL,

    CONSTRAINT "NotificationAsset_pkey" PRIMARY KEY ("notificationId")
);

-- CreateTable
CREATE TABLE "_SocietyUsers" (
    "A" INT8 NOT NULL,
    "B" INT8 NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Faculty_phone_key" ON "Faculty"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Faculty_email_key" ON "Faculty"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_mobile_key" ON "User"("mobile");

-- CreateIndex
CREATE UNIQUE INDEX "User_enrollmentNumber_key" ON "User"("enrollmentNumber");

-- CreateIndex
CREATE UNIQUE INDEX "SocietyProfile_societyEmail_key" ON "SocietyProfile"("societyEmail");

-- CreateIndex
CREATE UNIQUE INDEX "_SocietyUsers_AB_unique" ON "_SocietyUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_SocietyUsers_B_index" ON "_SocietyUsers"("B");

-- AddForeignKey
ALTER TABLE "Achievement" ADD CONSTRAINT "Achievement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "achievementImages" ADD CONSTRAINT "achievementImages_achievementId_fkey" FOREIGN KEY ("achievementId") REFERENCES "Achievement"("achievementId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("facultyId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gallary" ADD CONSTRAINT "Gallary_societyId_fkey" FOREIGN KEY ("societyId") REFERENCES "SocietyProfile"("societyId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlumniImages" ADD CONSTRAINT "AlumniImages_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("albumId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfessionalInformation" ADD CONSTRAINT "ProfessionalInformation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobsPosting" ADD CONSTRAINT "JobsPosting_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobApplication" ADD CONSTRAINT "JobApplication_jobPostingId_fkey" FOREIGN KEY ("jobPostingId") REFERENCES "JobsPosting"("jobsPostingId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobApplication" ADD CONSTRAINT "JobApplication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewExperience" ADD CONSTRAINT "InterviewExperience_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_societyId_fkey" FOREIGN KEY ("societyId") REFERENCES "SocietyProfile"("societyId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventAttendee" ADD CONSTRAINT "EventAttendee_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("eventId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventAttendee" ADD CONSTRAINT "EventAttendee_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "News" ADD CONSTRAINT "News_societyId_fkey" FOREIGN KEY ("societyId") REFERENCES "SocietyProfile"("societyId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MentorshipProgram" ADD CONSTRAINT "MentorshipProgram_facultyMentor_fkey" FOREIGN KEY ("facultyMentorId") REFERENCES "Faculty"("facultyId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MentorshipProgram" ADD CONSTRAINT "MentorshipProgram_alumniMentor_fkey" FOREIGN KEY ("alumniMentorId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MentorshipApplication" ADD CONSTRAINT "MentorshipApplication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MentorshipApplication" ADD CONSTRAINT "MentorshipApplication_mentorshipId_fkey" FOREIGN KEY ("mentorshipId") REFERENCES "MentorshipProgram"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocietyProfile" ADD CONSTRAINT "SocietyProfile_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("facultyId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocietyAchievement" ADD CONSTRAINT "SocietyAchievement_societyId_fkey" FOREIGN KEY ("societyId") REFERENCES "SocietyProfile"("societyId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocietyTestimonial" ADD CONSTRAINT "SocietyTestimonial_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocietyTestimonial" ADD CONSTRAINT "SocietyTestimonial_societyId_fkey" FOREIGN KEY ("societyId") REFERENCES "SocietyProfile"("societyId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentAchievement" ADD CONSTRAINT "StudentAchievement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentAchievement" ADD CONSTRAINT "StudentAchievement_societyId_fkey" FOREIGN KEY ("societyId") REFERENCES "SocietyProfile"("societyId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentMarking" ADD CONSTRAINT "StudentMarking_societyId_fkey" FOREIGN KEY ("societyId") REFERENCES "SocietyProfile"("societyId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentMarking" ADD CONSTRAINT "StudentMarking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocietyMember" ADD CONSTRAINT "SocietyMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocietyMember" ADD CONSTRAINT "SocietyMember_societyId_fkey" FOREIGN KEY ("societyId") REFERENCES "SocietyProfile"("societyId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocietyRole" ADD CONSTRAINT "SocietyRole_societyId_fkey" FOREIGN KEY ("societyId") REFERENCES "SocietyProfile"("societyId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SocietyUsers" ADD CONSTRAINT "_SocietyUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "SocietyProfile"("societyId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SocietyUsers" ADD CONSTRAINT "_SocietyUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
