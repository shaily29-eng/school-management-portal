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

describe('allSubjects', () => {
    it('should get all subjects for a school', async () => {
        const req = {
            params: { id: 'school123' }
        };
        const res = {
            send: jest.fn()
        };

        const mockSubjects = [{ _id: 'subject1', subName: 'Math' }, { _id: 'subject2', subName: 'Science' }];
        Subject.find.mockResolvedValueOnce(mockSubjects);

        await allSubjects(req, res);

        expect(Subject.find).toHaveBeenCalledWith({ school: req.params.id });
        expect(res.send).toHaveBeenCalledWith(mockSubjects);
    });

    it('should send message if no subjects found', async () => {
        const req = {
            params: { id: 'school123' }
        };
        const res = {
            send: jest.fn()
        };

        Subject.find.mockResolvedValueOnce([]);

        await allSubjects(req, res);

        expect(Subject.find).toHaveBeenCalledWith({ school: req.params.id });
        expect(res.send).toHaveBeenCalledWith({ message: 'No subjects found' });
    });

    it('should handle errors during retrieval of all subjects', async () => {
        const req = {
            params: { id: 'school123' }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const error = new Error('Database Error');
        Subject.find.mockRejectedValueOnce(error);

        await allSubjects(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(error);
    });
});

describe('classSubjects', () => {
    it('should get all subjects for a class', async () => {
        const req = {
            params: { id: 'class123' }
        };
        const res = {
            send: jest.fn()
        };

        const mockSubjects = [{ _id: 'subject1', subName: 'Math' }, { _id: 'subject2', subName: 'Science' }];
        Subject.find.mockResolvedValueOnce(mockSubjects);

        await classSubjects(req, res);

        expect(Subject.find).toHaveBeenCalledWith({ sclassName: req.params.id });
        expect(res.send).toHaveBeenCalledWith(mockSubjects);
    });

    it('should send message if no subjects found for the class', async () => {
        const req = {
            params: { id: 'class123
        };
        const res = {
            send: jest.fn()
        };

        Subject.find.mockResolvedValueOnce([]);

        await classSubjects(req, res);

        expect(Subject.find).toHaveBeenCalledWith({ sclassName: req.params.id });
        expect(res.send).toHaveBeenCalledWith({ message: 'No subjects found' });
    });

    it('should handle errors during retrieval of subjects for a class', async () => {
        const req = {
            params: { id: 'class123' }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const error = new Error('Database Error');
        Subject.find.mockRejectedValueOnce(error);

        await classSubjects(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(error);
    });
});

describe('freeSubjectList', () => {
    it('should get all subjects without assigned teacher for a class', async () => {
        const req = {
            params: { id: 'class123' }
        };
        const res = {
            send: jest.fn()
        };

        const mockSubjects = [{ _id: 'subject1', subName: 'Math' }, { _id: 'subject2', subName: 'Science' }];
        Subject.find.mockResolvedValueOnce(mockSubjects);

        await freeSubjectList(req, res);

        expect(Subject.find).toHaveBeenCalledWith({ sclassName: req.params.id, teacher: { $exists: false } });
        expect(res.send).toHaveBeenCalledWith(mockSubjects);
    });

    it('should send message if no free subjects found for the class', async () => {
        const req = {
            params: { id: 'class123' }
        };
        const res = {
            send: jest.fn()
        };

        Subject.find.mockResolvedValueOnce([]);

        await freeSubjectList(req, res);

        expect(Subject.find).toHaveBeenCalledWith({ sclassName: req.params.id, teacher: { $exists: false } });
        expect(res.send).toHaveBeenCalledWith({ message: 'No subjects found' });
    });

    it('should handle errors during retrieval of free subjects for a class', async () => {
        const req = {
            params: { id: 'class123' }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const error = new Error('Database Error');
        Subject.find.mockRejectedValueOnce(error);

        await freeSubjectList(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(error);
    });
});

describe('getSubjectDetail', () => {
    it('should get the detail of a subject by ID', async () => {
        const req = {
            params: { id: 'subject123' }
        };
        const res = {
            send: jest.fn()
        };

        const mockSubject = { _id: 'subject123', subName: 'Math' };
        Subject.findById.mockResolvedValueOnce(mockSubject);

        await getSubjectDetail(req, res);

        expect(Subject.findById).toHaveBeenCalledWith(req.params.id);
        expect(res.send).toHaveBeenCalledWith(mockSubject);
    });

    it('should send message if no subject found for the ID', async () => {
        const req = {
            params: { id: 'subject123' }
        };
        const res = {
            send: jest.fn()
        };

        Subject.findById.mockResolvedValueOnce(null);

        await getSubjectDetail(req, res);

        expect(Subject.findById).toHaveBeenCalledWith(req.params.id);
        expect(res.send).toHaveBeenCalledWith({ message: 'No subject found' });
    });

    it('should handle errors during retrieval of subject detail by ID', async () => {
        const req = {
            params: { id: 'subject123' }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const error = new Error('Database Error');
        Subject.findById.mockRejectedValueOnce(error);

        await getSubjectDetail(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(error);
    });
});

describe('deleteSubject', () => {
    it('should delete a subject by ID', async () => {
        const req = {
            params: { id: 'subject123' }
        };
        const res = {
            send: jest.fn()
        };

        const mockSubject = { _id: 'subject123', subName: 'Math' };
        Subject.findByIdAndDelete.mockResolvedValueOnce(mockSubject);

        await deleteSubject(req, res);

        expect(Subject.findByIdAndDelete).toHaveBeenCalledWith(req.params.id);
        expect(res.send).toHaveBeenCalledWith(mockSubject);
    });

    it('should handle errors during subject deletion', async () => {
        const req = {
            params: { id: 'subject123' }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const error = new Error('Database Error');
        Subject.findByIdAndDelete.mockRejectedValueOnce(error);

        await deleteSubject(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(error);
    });
});

describe('deleteSubjects', () => {
    it('should delete all subjects by school ID', async () => {
        const req = {
            params: { id: 'school123' }
        };
        const res = {
            send: jest.fn()
        };

        const mockDeletedSubjects = [{ _id: 'subject1', subName: 'Math' }, { _id: 'subject2', subName: 'Science' }];
        Subject.deleteMany.mockResolvedValueOnce(mockDeletedSubjects);

        await deleteSubjects(req, res);

        expect(Subject.deleteMany).toHaveBeenCalledWith({ school: req.params.id });
        expect(res.send).toHaveBeenCalledWith(mockDeletedSubjects);
    });

    it('should handle errors during subjects deletion', async () => {
        const req = {
            params: { id: 'school123' }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const error = new Error('Database Error');
        Subject.deleteMany.mockRejectedValueOnce(error);

        await deleteSubjects(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(error);
    });
});

describe('deleteSubjectsByClass', () => {
    it('should delete all subjects by class ID', async () => {
        const req = {
            params: { id: 'class123' }
        };
        const res = {
            send: jest.fn()
        };

        const mockDeletedSubjects = [{ _id: 'subject1', subName: 'Math' }, { _id: 'subject2', subName: 'Science' }];
        Subject.deleteMany.mockResolvedValueOnce(mockDeletedSubjects);

        await deleteSubjectsByClass(req, res);

        expect(Subject.deleteMany).toHaveBeenCalledWith({ sclassName: req.params.id });
        expect(res.send).toHaveBeenCalledWith(mockDeletedSubjects);
    });

    it('should handle errors during subjects deletion by class', async () => {
        const req = {
            params: { id: 'class123' }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const error = new Error('Database Error');
        Subject.deleteMany.mockRejectedValueOnce(error);

        await deleteSubjectsByClass(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(error);
    });
});
