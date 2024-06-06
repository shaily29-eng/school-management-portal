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

