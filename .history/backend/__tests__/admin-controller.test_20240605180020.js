const bcrypt = require('bcrypt');
const Admin = require('../models/adminSchema.js');
const adminController = require('../controllers/admin-controller');

jest.mock('bcrypt');
jest.mock('../models/adminSchema.js');

describe('adminRegister', () => {
    it('should register a new admin', async () => {
        const req = {
            body: {
                email: 'admin@example.com',
                password: 'password',
                schoolName: 'Test School'
            }
        };
        const res = {
            send: jest.fn()
        };

        const existingAdminByEmail = null;
        const existingSchool = null;

        Admin.findOne.mockResolvedValueOnce(existingAdminByEmail);
        Admin.findOne.mockResolvedValueOnce(existingSchool);
        const saveMock = jest.fn().mockResolvedValue({ _id: '123', email: req.body.email, schoolName: req.body.schoolName });
        Admin.mockImplementationOnce(() => ({ save: saveMock }));

        await adminController.adminRegister(req, res);

        expect(saveMock).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ _id: '123', email: req.body.email, schoolName: req.body.schoolName }));
    });

    it('should send error if email already exists', async () => {
        // Implement this test case
    });

    it('should send error if school name already exists', async () => {
        // Implement this test case
    });

    it('should send error if any error occurs during registration', async () => {
        // Implement this test case
    });
});

describe('adminLogIn', () => {
    it('should log in an existing admin with correct credentials', async () => {
        // Implement this test case
    });

    it('should send error if user not found during login', async () => {
        // Implement this test case
    });

    it('should send error if password is incorrect during login', async () => {
        // Implement this test case
    });

    it('should send error if email and password are not provided during login', async () => {
        // Implement this test case
    });
});

describe('getAdminDetail', () => {
    it('should get details of an existing admin by id', async () => {
        // Implement this test case
    });

    it('should send error if admin not found by id', async () => {
        // Implement this test case
    });

    it('should send error if any error occurs during fetching admin details', async () => {
        // Implement this test case
    });
});
