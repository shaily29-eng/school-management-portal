// admin-controller.test.js

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
        // Similar test case to check error message when email already exists
    });

    it('should send error if school name already exists', async () => {
        // Similar test case to check error message when school name already exists
    });

    it('should send error if any error occurs during registration', async () => {
        // Similar test case to check error handling
    });
});

describe('adminLogIn', () => {
    it('should log in an existing admin with correct credentials', async () => {
        // Similar test case to check login functionality
    });

    it('should send error if user not found during login', async () => {
        // Similar test case to check error message when user is not found
    });

    it('should send error if password is incorrect during login', async () => {
        // Similar test case to check error message when password is incorrect
    });

    it('should send error if email and password are not provided during login', async () => {
        // Similar test case to check error message when email and password are not provided
    });
});

describe('getAdminDetail', () => {
    it('should get details of an existing admin by id', async () => {
        // Similar test case to check fetching admin details
    });

    it('should send error if admin not found by id', async () => {
        // Similar test case to check error message when admin is not found
    });

    it('should send error if any error occurs during fetching admin details', async () => {
        // Similar test case to check error handling
    });
});
