import {
  calculateSubjectAttendancePercentage,
  groupAttendanceBySubject,
  calculateOverallAttendancePercentage
} from './yourUtilityFile';

describe('Utility Functions Tests', () => {
  test('calculateSubjectAttendancePercentage', () => {
    // Test cases for calculateSubjectAttendancePercentage
    expect(calculateSubjectAttendancePercentage(0, 0)).toBe(0);
    expect(calculateSubjectAttendancePercentage(5, 10)).toBe('50.00');
    expect(calculateSubjectAttendancePercentage(3, 5)).toBe('60.00');
    expect(calculateSubjectAttendancePercentage(1, 3)).toBe('33.33');
  });

  test('groupAttendanceBySubject', () => {
    // Test cases for groupAttendanceBySubject
    const subjectAttendance = [
      { subName: { subName: 'Math', sessions: 10, _id: '1' }, status: 'Present', date: '2024-06-01' },
      { subName: { subName: 'Math', sessions: 10, _id: '1' }, status: 'Absent', date: '2024-06-02' },
      { subName: { subName: 'Science', sessions: 8, _id: '2' }, status: 'Present', date: '2024-06-01' },
      { subName: { subName: 'Science', sessions: 8, _id: '2' }, status: 'Present', date: '2024-06-02' },
      { subName: { subName: 'Science', sessions: 8, _id: '2' }, status: 'Absent', date: '2024-06-03' }
    ];

    const expectedResult = {
      'Math': {
        present: 1,
        absent: 1,
        sessions: 10,
        allData: [
          { date: '2024-06-01', status: 'Present' },
          { date: '2024-06-02', status: 'Absent' }
        ],
        subId: '1'
      },
      'Science': {
        present: 2,
        absent: 1,
        sessions: 8,
        allData: [
          { date: '2024-06-01', status: 'Present' },
          { date: '2024-06-02', status: 'Present' },
          { date: '2024-06-03', status: 'Absent' }
        ],
        subId: '2'
      }
    };

    expect(groupAttendanceBySubject(subjectAttendance)).toEqual(expectedResult);
  });

  test('calculateOverallAttendancePercentage', () => {
    // Test cases for calculateOverallAttendancePercentage
    const subjectAttendance = [
      { subName: { _id: '1', sessions: 10 }, status: 'Present' },
      { subName: { _id: '1', sessions: 10 }, status: 'Present' },
      { subName: { _id: '2', sessions: 8 }, status: 'Absent' }
    ];

    expect(calculateOverallAttendancePercentage(subjectAttendance)).toBe(60);
  });
});
