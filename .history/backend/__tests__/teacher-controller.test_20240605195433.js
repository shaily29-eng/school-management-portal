// not working
const bcrypt = require('bcrypt');
const Teacher = require('../models/teacherSchema.js');
const Subject = require('../models/subjectSchema.js');
const {
    teacherRegister,
    teacherLogIn,
    getTeachers,
    getTeacherDetail,
    updateTeacherSubject,
    deleteTeacher,
    deleteTeachers,
    deleteTeachersByClass,
    teacherAttendance
} = require('../controllers/teacher-controller');

jest.mock('bcrypt');
jest.mock('../models/teacherSchema.js');
jest.mock('../models/subjectSchema.js');

describe('teacherRegister', () => {
    it('should register a new teacher', async () => {
        const req = {
            body: {
                // Mock request body data here
                name: 'John Doe',
                email: 'john@example.com',
                password: 'password123',
                role: 'Teacher',
                school: 'School123',
                teachSubject: 'Subject123',
                teachSclass: 'Class10'
            }
        };

        const existingTeacherByEmail = null; // Mocking no existing teacher
        const saveMock = jest.fn().mockResolvedValue(req.body); // Mocking the save method of Teacher model
        const teacherInstanceMock = {
            ...req.body,
            save: saveMock
        };
        Teacher.findOne.mockResolvedValue(existingTeacherByEmail);
        Teacher.mockReturnValue(teacherInstanceMock);

        const mockSavedTeacher = { ...req.body, _id: 'mockTeacherId' }; // Mocked saved teacher data
        const mockUpdatedSubject = { _id: 'Subject123', teacher: 'mockTeacherId' }; // Mocked updated subject data
        const subjectUpdateMock = jest.fn().mockResolvedValue(mockUpdatedSubject); // Mocking the findByIdAndUpdate method of Subject model

        await teacherRegister(req, res);

        expect(Teacher.findOne).toHaveBeenCalledWith({ email: req.body.email });
        expect(saveMock).toHaveBeenCalled();
        expect(Subject.findByIdAndUpdate).toHaveBeenCalledWith(req.body.teachSubject, { teacher: 'mockTeacherId' });
        expect(res.send).toHaveBeenCalledWith(mockSavedTeacher);
    });

    // Write other test cases for teacherRegister function
});

describe('teacherLogIn', () => {
    // Write test cases for teacherLogIn function
});

// Write similar describe blocks for other functions like getTeachers, getTeacherDetail, etc.
