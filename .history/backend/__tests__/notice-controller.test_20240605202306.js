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
            body: {}
        };
        const res = {
            send: jest.fn()
        };

        const mockSavedNotice = { _id: 'mockNoticeId' };
        Notice.prototype.save = jest.fn().mockResolvedValue(mockSavedNotice);

        await noticeCreate(req, res);

        expect(Notice.prototype.save).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith(mockSavedNotice);
    });

    it('should handle error during notice creation', async () => {
        const req = {
            body: {}
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
    it('should retrieve list of notices', async () => {
        const req = {
            params: { id: 'school123' }
        };
        const res = {
            send: jest.fn()
        };

        const mockNotices = [
            { _id: 'notice1', content: 'Notice 1' },
            { _id: 'notice2', content: 'Notice 2' }
        ];
        Notice.find.mockResolvedValueOnce(mockNotices);

        await noticeList(req, res);

        expect(Notice.find).toHaveBeenCalledWith({ school: req.params.id });
        expect(res.send).toHaveBeenCalledWith(mockNotices);
    });

    it('should send message if no notices found', async () => {
        const req = {
            params: { id: 'school123' }
        };
        const res = {
            send: jest.fn()
        };

        Notice.find.mockResolvedValueOnce([]);

        await noticeList(req, res);

        expect(res.send).toHaveBeenCalledWith({ message: 'No notices found' });
    });

    it('should handle error if any occurs during notice retrieval', async () => {
        const req = {
            params: { id: 'school123' }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const error = new Error('Database Error');
        Notice.find.mockRejectedValueOnce(error);

        await noticeList(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(error);
    });
});

describe('updateNotice', () => {
    it('should update a notice by ID', async () => {
        const req = {
            params: { id: 'notice123' },
            body: { content: 'Updated Notice' }
        };
        const res = {
            send: jest.fn()
        };

        const mockUpdatedNotice = { _id: 'notice123', content: 'Updated Notice' };
        Notice.findByIdAndUpdate.mockResolvedValueOnce(mockUpdatedNotice);

        await updateNotice(req, res);

        expect(Notice.findByIdAndUpdate).toHaveBeenCalledWith(req.params.id, { $set: req.body }, { new: true });
        expect(res.send).toHaveBeenCalledWith(mockUpdatedNotice);
    });

    it('should handle error if any occurs during notice update', async () => {
        const req = {
            params: { id: 'notice123' },
            body: { content: 'Updated Notice' }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const error = new Error('Database Error');
        Notice.findByIdAndUpdate.mockRejectedValueOnce(error);

        await updateNotice(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(error);
    });
});

describe('deleteNotice', () => {
    it('should delete a notice by ID', async () => {
        const req = {
            params: { id: 'notice123' }
        };
        const res = {
            send: jest.fn()
        };

        const mockDeletedNotice = { _id: 'notice123' };
        Notice.findByIdAndDelete.mockResolvedValueOnce(mockDeletedNotice);

        await deleteNotice(req, res);

        expect(Notice.findByIdAndDelete).toHaveBeenCalledWith(req.params.id);
        expect(res.send).toHaveBeenCalledWith(mockDeletedNotice);
    });

    
});

describe('deleteNotices', () => {
    it('should delete all notices by school ID', async () => {
        const req = {
            params: { id: 'school123' }
        };
        const res = {
            send: jest.fn()
        };

        const mockDeleteResult = { deletedCount: 2 };
        Notice.deleteMany.mockResolvedValueOnce(mockDeleteResult);

        await deleteNotices(req, res);

        expect(Notice.deleteMany).toHaveBeenCalledWith({ school: req.params.id });
        expect(res.send).toHaveBeenCalledWith(mockDeleteResult);
    });

    it('should send message if no notices found to delete', async () => {
        const req = {
            params: { id: 'school123' }
        };
        const res = {
            send: jest.fn()
        };

        const mockDeleteResult = { deletedCount: 0 };
        Notice.deleteMany.mockResolvedValueOnce(mockDeleteResult);

        await deleteNotices(req, res);

        expect(res.send).toHaveBeenCalledWith({ message: 'No notices found to delete' });
    });

    it('should handle error if any occurs during notice deletion', async () => {
        const req = {
            params: { id: 'school123' }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const error = new Error('Database Error');
        Notice.deleteMany.mockRejectedValueOnce(error);

        await deleteNotices(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(error);

    });
});
