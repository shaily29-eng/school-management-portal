const Complain = require('../models/complainSchema.js');
const { complainCreate, complainList } = require('../controllers/complain-controller');

jest.mock('../models/complainSchema');

describe('complainCreate', () => {
    it('should create a new complain', async () => {
        const req = {
            body: {
                title: 'Test Complain',
                description: 'This is a test complain.',
                user: 'user123'
            }
        };
        const res = {
            send: jest.fn()
        };

        const mockSavedComplain = { _id: 'mockComplainId', title: req.body.title, description: req.body.description, user: req.body.user };
        Complain.prototype.save = jest.fn().mockResolvedValue(mockSavedComplain);

        await complainCreate(req, res);

        expect(Complain.prototype.save).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith(mockSavedComplain);
    });

    it('should handle error during complain creation', async () => {
        const req = {
            body: {
                title: 'Test Complain',
                description: 'This is a test complain.',
                user: 'user123'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const error = new Error('Database Error');
        Complain.prototype.save = jest.fn().mockRejectedValue(error);

        await complainCreate(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(error);
    });
});

describe('complainList', () => {
    it('should retrieve list of complains', async () => {
        const req = {
            params: {
                // Add necessary params if any
            }
        };
        const res = {
            send: jest.fn()
        };

        const mockComplains = [
            { _id: 'complain1', title: 'Complain 1', description: 'Description 1', user: 'user123' },
            { _id: 'complain2', title: 'Complain 2', description: 'Description 2', user: 'user124' }
        ];
        Complain.find.mockResolvedValueOnce(mockComplains);

        await complainList(req, res);

        expect(Complain.find).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith(mockComplains);
    });

    it('should send message if no complains found', async () => {
        const req = {
            params: {
                // Add necessary params if any
            }
        };
        const res = {
            send: jest.fn()
        };

        Complain.find.mockResolvedValueOnce([]);

        await complainList(req, res);

        expect(Complain.find).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith({ message: 'No complains found' });
    });

    it('should handle error during complain retrieval', async () => {
        const req = {
            params: {
                // Add necessary params if any
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const error = new Error('Database Error');
        Complain.find.mockRejectedValueOnce(error);

        await complainList(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(error);
    });
});
