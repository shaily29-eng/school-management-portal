const Subject = require('../models/subjectSchema.js');
const Teacher = require('../models/teacherSchema.js');
const Student = require('../models/studentSchema.js');
const {
    subjectCreate,
} = require('../controllers/subject-controller');

jest.mock('../models/subjectSchema.js');
jest.mock('../models/teacherSchema.js');
jest.mock('../models/studentSchema.js');

describe('subjectCreate', () => {
    it('should create new subjects', async () => {
        const req = {
            body: {
                subjects: [
                    { subName: 'Math', subCode: 'MTH101', sessions: 5 },
                    { subName: 'Science', subCode: 'SCI101', sessions: 4 }
                ],
                adminID: 'admin123',
                sclassName: 'Class 1A'
            }
        };
        const res = {
            send: jest.fn()
        };

        const mockSavedSubjects = [{ _id: 'subject1' }, { _id: 'subject2' }];
        Subject.insertMany.mockResolvedValueOnce(mockSavedSubjects);

        await subjectCreate(req, res);

        expect(Subject.insertMany).toHaveBeenCalledWith([
            { subName: 'Math', subCode: 'MTH101', sessions: 5, sclassName: 'Class 1A', school: 'admin123' },
            { subName: 'Science', subCode: 'SCI101', sessions: 4, sclassName: 'Class 1A', school: 'admin123' }
        ]);
        expect(res.send).toHaveBeenCalledWith(mockSavedSubjects);
    });

    it('should send error if subject subCode already exists', async () => {
        const req = {
            body: {
                subjects: [{ subName: 'Math', subCode: 'MTH101', sessions: 5 }],
                adminID: 'admin123',
                sclassName: 'Class 1A'
            }
        };
        const res = {
            send: jest.fn()
        };

        const existingSubject = { _id: 'existingSubjectId' };
        Subject.findOne.mockResolvedValueOnce(existingSubject);

        await subjectCreate(req, res);

        expect(Subject.findOne).toHaveBeenCalledWith({
            'subjects.subCode': 'MTH101',
            school: 'admin123'
        });
        expect(res.send).toHaveBeenCalledWith({ message: 'Sorry this subcode must be unique as it already exists' });
    });

    it('should handle errors during subject creation', async () => {
        const req = {
            body: {
                subjects: [{ subName: 'Math', subCode: 'MTH101', sessions: 5 }],
                adminID: 'admin123',
                sclassName: 'Class 1A'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const error = new Error('Database Error');
        Subject.insertMany.mockRejectedValueOnce(error);

        await subjectCreate(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(error);
    });
});


