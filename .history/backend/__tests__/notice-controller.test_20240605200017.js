const Notice = require('../models/noticeSchema.js');
const {
    noticeCreate,
    noticeList,
    updateNotice,
    deleteNotice,
    deleteNotices
} = require('../controllers/notice-controller');

jest.mock('../models/noticeSchema.js');

describe('noticeCreate', () => {
    it('should create a new notice', async () => {
        const req = {
            body: {
            }
        };
        const res = {
            send: jest.fn()
        };

        const mockSavedNotice = { _id: 'mockNoticeId', };
        Notice.prototype.save = jest.fn().mockResolvedValue(mockSavedNotice);

        await noticeCreate(req, res);

        expect(Notice.prototype.save).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith(mockSavedNotice);
    });

    it('should handle error during notice creation', async () => {
        const req = {
            body: {
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const error = new Error('Database Error');
        Notice.prototype.save = jest.fn().mockRejectedValue(error);

        await noticeCreate(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(error);
    });
});

describe('noticeList', () => {

});

describe('updateNotice', () => {
    // Add test cases for updateNotice function
});

describe('deleteNotice', () => {
    // Add test cases for deleteNotice function
});

describe('deleteNotices', () => {
    // Add test cases for deleteNotices function
});
