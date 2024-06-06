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
        Complain.prototype.save = jest.fn().mockResolvedValue(mockSavedComplain);

        await complainCreate(req, res);

        expect(Complain.prototype.save).toHaveBeenCalled();
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

    // Add test cases for complainList function
});
