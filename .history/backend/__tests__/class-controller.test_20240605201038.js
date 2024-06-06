const {
    sclassCreate,
    sclassList,
    deleteSclass,
    deleteSclasses,
    getSclassDetail,
    getSclassStudents
} = require('../controllers/class-controller');

const Sclass = require('../models/sclassSchema');
const Student = require('../models/studentSchema');
const Subject = require('../models/subjectSchema');
const Teacher = require('../models/teacherSchema');

jest.mock('../models/sclassSchema');
jest.mock('../models/studentSchema');
jest.mock('../models/subjectSchema');
jest.mock('../models/teacherSchema');

describe('sclassCreate', () => {
    it('should create a new sclass', async () => {
        const req = {
            body: {
                sclassName: 'Class 1A',
                adminID: 'admin123'
            }
        };
        const res = {
            send: jest.fn()
        };

        Sclass.findOne.mockResolvedValueOnce(null);

        const saveMock = jest.fn().mockResolvedValue({ _id: '123', sclassName: req.body.sclassName, school: req.body.adminID });
        Sclass.prototype.save = saveMock;

        await sclassCreate(req, res);

        expect(saveMock).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ _id: '123', sclassName: req.body.sclassName, school: req.body.adminID }));
    });

    it('should send error if sclass name already exists', async () => {
        const req = {
            body: {
                sclassName: 'Class 1A',
                adminID: 'admin123'
            }
        };
        const res = {
            send: jest.fn()
        };

        Sclass.findOne.mockResolvedValueOnce({ _id: 'existingSclassID', sclassName: req.body.sclassName, school: req.body.adminID });

        await sclassCreate(req, res);

        expect(res.send).toHaveBeenCalledWith({ message: 'Sorry this class name already exists' });
    });

    it('should handle error if any occurs during sclass creation', async () => {
        const req = {
            body: {
                sclassName: 'Class 1A',
                adminID: 'admin123'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const error = new Error('Database Error');
        Sclass.findOne.mockRejectedValueOnce(error);

        await sclassCreate(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(expect.any(Error));
    });
});

describe('sclassList', () => {
    it('should retrieve list of sclasses', async () => {
        const req = {
            params: {
                id: 'school123'
            }
        };
        const res = {
            send: jest.fn()
        };

        const mockSclasses = [
            { _id: 'sclass1', sclassName: 'Class 1A', school: 'school123' },
            { _id: 'sclass2', sclassName: 'Class 2B', school: 'school123' }
        ];
        Sclass.find.mockResolvedValueOnce(mockSclasses);

        await sclassList(req, res);

        expect(res.send).toHaveBeenCalledWith(mockSclasses);
    });

    it('should send message if no sclasses found', async () => {
        const req = {
            params: {
                id: 'school123'
            }
        };
        const res = {
            send: jest.fn()
        };

        Sclass.find.mockResolvedValueOnce([]);

        await sclassList(req, res);

        expect(res.send).toHaveBeenCalledWith({ message: 'No sclasses found' });
    });

    it('should handle error if any occurs during sclass retrieval', async () => {
        const req = {
            params: {
                id: 'school123'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const error = new Error('Database Error');
        Sclass.find.mockRejectedValueOnce(error);

        await sclassList(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(expect.any(Error));
    });
});

// Add describe blocks for the remaining functions such as deleteSclass, deleteSclasses, getSclassDetail, getSclassStudents

describe('deleteSclass', () => {
    it('should delete a sclass by ID', async () => {
        const req = {
            params: { id: 'sclass123' }
        };
        const res = {
            send: jest.fn()
        };

        Sclass.findByIdAndDelete.mockResolvedValueOnce({ _id: 'sclass123' });

        await deleteSclass(req, res);

        expect(Sclass.findByIdAndDelete).toHaveBeenCalledWith(req.params.id);
        expect(res.send).toHaveBeenCalledWith({ _id: 'sclass123' });
    });

    it('should handle error if any occurs during sclass deletion', async () => {
        const req = {
            params: { id: 'sclass123' }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const error = new Error('Database Error');
        Sclass.findByIdAndDelete.mockRejectedValueOnce(error);

        await deleteSclass(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(expect.any(Error));
    });
});

// Similar blocks for other functions like deleteSclasses, getSclassDetail, getSclassStudents

describe('deleteSclasses', () => {
    it('should delete all sclasses by school ID', async () => {
        const req = {
            params: { id: 'school123' }
        };
        const res = {
            send: jest.fn()
        };

        Sclass.deleteMany.mockResolvedValueOnce({ deletedCount: 2 });

        await deleteSclasses(req, res);

        expect(Sclass.deleteMany).toHaveBeenCalledWith({ school: req.params.id });
        expect(res.send).toHaveBeenCalledWith({ deletedCount: 2 });
    });

    it('should handle error if any occurs during sclass deletion', async () => {
        const req = {
            params: { id: 'school123' }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const error = new Error('Database Error');
        Sclass.deleteMany.mockRejectedValueOnce(error);

        await deleteSclasses(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(expect.any(Error));
    });
});

describe('getSclassDetail', () => {
    it('should retrieve sclass details by ID', async () => {
        const req = {
            params: { id: 'sclass123' }
        };
        const res = {
            send: jest.fn(),
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const mockSclass = { _id: 'sclass123', sclassName: 'Class 1A', school: 'school123' };
        Sclass.findById.mockResolvedValueOnce(mockSclass);

        await getSclassDetail(req, res);

        expect(Sclass.findById).toHaveBeenCalledWith(req.params.id);
        expect(res.send).toHaveBeenCalledWith(mockSclass);
    });
    it('should handle error if any occurs during sclass retrieval', async () => {
        const req = {
            params: { id: 'sclass123' }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const error = new Error('Database Error');
        Sclass.findById.mockRejectedValueOnce(error);

        await getSclassDetail(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(expect.any(Error));
    });
});

describe('getSclassStudents', () => {
    it('should retrieve students of a sclass by class ID', async () => {
        const req = {
            params: { id: 'sclass123' }
        };
        const res = {
            send: jest.fn(),
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const mockStudents = [{ _id: 'student1', name: 'John Doe' }, { _id: 'student2', name: 'Jane Doe' }];
        Student.find.mockResolvedValueOnce(mockStudents);

        await getSclassStudents(req, res);

        expect(Student.find).toHaveBeenCalledWith({ sclass: req.params.id });
        expect(res.send).toHaveBeenCalledWith(mockStudents);
    });

    it('should handle error if any occurs during students retrieval', async () => {
        const req = {
            params: { id: 'sclass123' }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const error = new Error('Database Error');
        Student.find.mockRejectedValueOnce(error);

        await getSclassStudents(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(expect.any(Error));
    });
});