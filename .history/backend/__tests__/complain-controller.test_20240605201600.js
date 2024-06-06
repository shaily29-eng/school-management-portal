const Complain = require('../models/complainSchema.js');
const { complainCreate, complainList } = require('../controllers/complain-controller');

jest.mock('../models/complainSchema');

describe('complainCreate', () => {
    it('should create a new complain', async () => {
        const req = {
            body: {
                // Add required fields for complain creation
            }
        };
        const res = {
            send: jest.fn()
        };

        const mockSavedComplain = { _id: 'mockComplainId', /* Add other necessary fields */ };
        Complain.prototype.save = jest.fn().mockResolvedValue(mockSavedComplain);

        await complainCreate(req, res);

        expect(Complain.prototype.save).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith(mockSavedComplain);
    });

    it('should handle error during complain creation', async () => {
        const req = {
            body: {
                // Add required fields for complain creation
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
            { _id: 'complain1', /* Add other necessary fields */ },
            { _id: 'complain2', /* Add other necessary fields */ }
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
