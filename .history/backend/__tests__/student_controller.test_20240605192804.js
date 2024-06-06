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
        const req = {
            body: {
                rollNum: '123',
                adminID: 'admin123',
                sclassName: 'Class 10',
                password: 'password123',
            },
        };

        const existingStudentMock = null; // Mocking no existing student
        const saveMock = jest.fn().mockResolvedValue(req.body); // Mocking the save method of Student model
        const studentInstanceMock = {
            ...req.body,
            save: saveMock,
        };
        Student.findOne.mockResolvedValue(existingStudentMock);
        Student.mockReturnValue(studentInstanceMock);

        const res = {
            send: jest.fn(),
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await studentRegister(req, res);

        expect(Student.findOne).toHaveBeenCalledWith({
            rollNum: req.body.rollNum,
            school: req.body.adminID,
            sclassName: req.body.sclassName,
        });
        expect(saveMock).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith(req.body);
    });

    // Write other test cases for studentRegister function
});

describe('studentLogIn', () => {
    it('should log in an existing student with correct credentials', async () => {
        // Implement test case to log in an existing student with correct credentials
    });

    // Write other test cases for studentLogIn function
});

// Write similar test blocks for other functions like getStudents, getStudentDetail, etc.
