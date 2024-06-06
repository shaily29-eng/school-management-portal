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
        Sclass.mockImplementationOnce(() => ({ save: saveMock }));

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

        Sclass.findOne.mockRejectedValueOnce(new Error('Database Error'));

        await sclassCreate(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Database Error' });
    });
});

// Implement similar tests for other controller functions like sclassList, getSclassDetail, etc.
