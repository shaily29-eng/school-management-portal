
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

// Mock bcrypt methods
jest.mock('bcrypt');
bcrypt.genSalt = jest.fn().mockResolvedValue('mockSalt');
bcrypt.hash = jest.fn().mockResolvedValue('mockHash');
bcrypt.compare = jest.fn().mockResolvedValue(true);

// Mock Student model methods
jest.mock('../models/studentSchema');
const mockStudentData = {
    _id: 'mockId',
    rollNum: '123',
    school: 'admin123',
    sclassName: 'Class 10',
    password: 'mockHash',
};
const mockStudentInstance = {
    ...mockStudentData,
    save: jest.fn().mockResolvedValue(mockStudentData),
    populate: jest.fn().mockResolvedValue(mockStudentData),
};
Student.findOne = jest.fn().mockResolvedValue(null);
Student.find = jest.fn().mockResolvedValue([mockStudentData]);
Student.findById = jest.fn().mockResolvedValue(mockStudentInstance);
Student.findByIdAndUpdate = jest.fn().mockResolvedValue(mockStudentData);
Student.findByIdAndDelete = jest.fn().mockResolvedValue(mockStudentData);
Student.deleteMany = jest.fn().mockResolvedValue({ deletedCount: 1 });
Student.updateOne = jest.fn().mockResolvedValue({ nModified: 1 });

// Mock Subject model methods
jest.mock('../models/subjectSchema');
Subject.findById = jest.fn().mockResolvedValue({ sessions: 10 });

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
        expect(bcrypt.genSalt).toHaveBeenCalled();
        expect(bcrypt.hash).toHaveBeenCalledWith(req.body.password, 'mockSalt');
        expect(Student).toHaveBeenCalledWith({
            ...req.body,
            password: 'mockHash',
        });
        expect(mockStudentInstance.save).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith(mockStudentData);
    });

    // Add more test cases for studentRegister function
});

describe('studentLogIn', () => {
    it('should log in an existing student with correct credentials', async () => {
        // Implement test case to log in an existing student with correct credentials
    });

    // Add more test cases for studentLogIn function
});

// Add similar describe blocks for other functions like getStudents, getStudentDetail, etc.
