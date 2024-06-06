const Complain = require('../models/complainSchema.js');
const { complainCreate, complainList } = require('../controllers/complain-controller');

jest.mock('../models/complainSchema');

describe('complainCreate', () => {
    it('should create a new complain', async () => {
        const req = {
            body: {
                // Your request body data here
            }
        };
        const res = {
            send: jest.fn()
        };
    
        const mockSavedComplain = { _id: 'mockComplainId', /* Mocked saved complain data */ };
        const saveMock = jest.fn().mockResolvedValue(mockSavedComplain);
        jest.spyOn(Complain.prototype, 'save').mockImplementationOnce(saveMock);
    
        await complainCreate(req, res);
    
        expect(saveMock).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith(mockSavedComplain);
    });
    it('should handle error during complain creation', async () => {
        const req = {
            body: {
                // Your request body data here
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
    beforeEach(() => {
        jest.clearAllMocks(); // Clear mocks before each test case
    });

    it('should retrieve list of complains', async () => {
        const req = {
            params: {
                id: 'school123'
            }
        };
        const res = {
            send: jest.fn()
        };

        const mockComplains = [{ /* Mocked complain data */ }, { /* Mocked complain data */ }];
        Complain.find.mockResolvedValueOnce(mockComplains);

        await complainList(req, res);

        expect(res.send).toHaveBeenCalledWith(mockComplains);
    });

    it('should send message if no complains found', async () => {
        const req = {
            params: {
                id: 'school123'
            }
        };
        const res = {
            send: jest.fn()
        };

        Complain.find.mockResolvedValueOnce([]);

        await complainList(req, res);

        expect(res.send).toHaveBeenCalledWith({ message: 'No complains found' });
    });

    it('should handle error if any occurs during complain retrieval', async () => {
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
        Complain.find.mockRejectedValueOnce(error);

        await complainList(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(error);
    });
});
