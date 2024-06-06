const Subject = require('../models/subjectSchema.js');
const Teacher = require('../models/teacherSchema.js');
const Student = require('../models/studentSchema.js');
const {
    subjectCreate,
    allSubjects,
    classSubjects,
    freeSubjectList,
    getSubjectDetail,
    deleteSubject,
    deleteSubjects,
    deleteSubjectsByClass,
} = require('../controllers/subject-controller');

jest.mock('../models/subjectSchema.js');
jest.mock('../models/teacherSchema.js');
jest.mock('../models/studentSchema.js');

describe('subjectCreate', () => {
    it('should create new subjects', async () => {
    });

    it('should send error if subject subCode already exists', async () => {
    });

    it('should handle errors during subject creation', async () => {
    });
});

describe('allSubjects', () => {
    it('should get all subjects for a school', async () => {

    });

    it('should send message if no subjects found', async () => {
        // Implement test case to send message if no subjects found
    });

    it('should handle errors during retrieval of all subjects', async () => {
        // Implement test case to handle errors during retrieval of all subjects
    });
});

// Write similar describe blocks for other functions like classSubjects, freeSubjectList, etc.
