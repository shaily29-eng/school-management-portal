const Sclass = require('../models/sclassSchema.js');
const Student = require('../models/studentSchema.js');
const Subject = require('../models/subjectSchema.js');
const Teacher = require('../models/teacherSchema.js');
const { 
    sclassCreate, 
    sclassList, 
    deleteSclass, 
    deleteSclasses, 
    getSclassDetail, 
    getSclassStudents 
} = require('../controllers/sclass-controller');

jest.mock('../models/sclassSchema.js');
jest.mock('../models/studentSchema.js');
jest.mock('../models/subjectSchema.js');
jest.mock('../models/teacherSchema.js');

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

        // Mock the Sclass model's findOne method to return null (indicating no existing sclass with the same name)
        Sclass.findOne.mockResolvedValueOnce(null);

        // Mock the Sclass model's save method to return a dummy result
        const saveMock = jest.fn().mockResolvedValue({ _id: '123', sclassName: req.body.sclassName, school: req.body.adminID });
        Sclass.mockImplementationOnce(() => ({ save: saveMock }));

        // Call the sclassCreate function with the mocked request and response objects
        await sclassCreate(req, res);

        // Verify that the save method is called
        expect(saveMock).toHaveBeenCalled();

        // Verify that the response contains the expected data
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

        // Mock the Sclass model's findOne method to return a dummy existing sclass
        Sclass.findOne.mockResolvedValueOnce({ _id: 'existingSclassID', sclassName: req.body.sclassName, school: req.body.adminID });

        // Call the sclassCreate function with the mocked request and response objects
        await sclassCreate(req, res);

        // Verify that the response contains the expected error message
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

        // Mock the Sclass model's findOne method to throw an error
        Sclass.findOne.mockRejectedValueOnce(new Error('Database Error'));

        // Call the sclassCreate function with the mocked request and response objects
        await sclassCreate(req, res);

        // Verify that the response contains the expected error message
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Database Error' });
    });
});

describe('sclassList', () => {
    // Implement similar test cases for sclassList function
});

describe('deleteSclass', () => {
    // Implement similar test cases for deleteSclass function
});

describe('deleteSclasses', () => {
    // Implement similar test cases for deleteSclasses function
});

describe('getSclassDetail', () => {
    // Implement similar test cases for getSclassDetail function
});

describe('getSclassStudents', () => {
    // Implement similar test cases for getSclassStudents function
});
