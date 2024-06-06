import bcrypt from 'bcrypt';
import Admin from '../models/adminSchema.js';
import adminController from '../controllers/admin-controller';

jest.mock('bcrypt');
jest.mock('../models/adminSchema.js');

describe('adminRegister', () => {
    it('should register a new admin', async () => {
        // Implement test case to register a new admin
    });

    it('should send error if email already exists', async () => {
        // Implement test case to send error if email already exists
    });

    it('should send error if school name already exists', async () => {
        // Implement test case to send error if school name already exists
    });

    it('should send error if any error occurs during registration', async () => {
        // Implement test case to send error if any error occurs during registration
    });
});

// Other test suites...

export {};
