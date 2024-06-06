const bcrypt = require('bcrypt');
const {
    studentRegister,
    studentLogIn,
    getStudents,
    getStudentDetail,
    deleteStudents,
    deleteStudent,
    updateStudent,
    studentAttendance,
    deleteStudentsByClass,
    updateExamResult,
    clearAllStudentsAttendanceBySubject,
    clearAllStudentsAttendance,
    removeStudentAttendanceBySubject,
    removeStudentAttendance,
} = require('../controllers/student-controller');
const Student = require('../models/studentSchema');
const Subject = require('../models/subjectSchema');

jest.mock('bcrypt');
jest.mock('../models/studentSchema');
jest.mock('../models/subjectSchema');

describe('studentRegister', () => {
    it('should register a new student', async () => {
        // Implement test case to register a new student
    });

    it('should send error if student already exists', async () => {
        // Implement test case to send error if student already exists
    });

    it('should handle errors during registration', async () => {
        // Implement test case to handle errors during registration
    });
});

describe('studentLogIn', () => {
    it('should log in an existing student with correct credentials', async () => {
        // Implement test case to log in an existing student with correct credentials
    });

    it('should send error if student not found during login', async () => {
        // Implement test case to send error if student not found during login
    });

    it('should send error if password is incorrect during login', async () => {
        // Implement test case to send error if password is incorrect during login
    });

    it('should send error if email and password are not provided during login', async () => {
        // Implement test case to send error if email and password are not provided during login
    });
});

// Add similar describe blocks for other functions like getStudents, getStudentDetail, etc.
