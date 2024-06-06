const Complain = require('../models/complainSchema.js');
const { complainCreate, complainList } = require('../controllers/complain-controller');

jest.mock('../models/complainSchema');

describe('complainCreate', () => {
    it('should create a new complain', async () => {
        const req = {
            body: {
            }
        };
        const res = {
            send: jest.fn()
        };

        const mockSavedComplain = { _id: 'mockComplainId',  };
        Complain.prototype.save = jest.fn().mockResolvedValue(mockSavedComplain);

        await complainCreate(req, res);

        expect(Complain.prototype.save).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith(mockSavedComplain);
    });

    it('should handle error during complain creation', async () => {
        const req = {
            body: {
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
