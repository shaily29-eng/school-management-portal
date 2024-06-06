import { 
  calculateSubjectAttendancePercentage,
  groupAttendanceBySubject,
  calculateOverallAttendancePercentage 
} from '../components/attendanceCalculator';

describe('Utility Functions Tests', () => {
  test('calculateSubjectAttendancePercentage', () => {
    // Test cases for calculateSubjectAttendancePercentage
    // Test case 1: When presentCount and totalSessions are both zero
    expect(calculateSubjectAttendancePercentage(0, 0)).toBe(0);
    
    // Test case 2: When presentCount is half of totalSessions
    expect(calculateSubjectAttendancePercentage(5, 10)).toBe('50.00');
    
    // Test case 3: When presentCount is one-third of totalSessions
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

    // Expected result for groupAttendanceBySubject
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

    // Expected result for calculateOverallAttendancePercentage
    // Here, we expect the overall attendance percentage to be 66.67% (2 out of 3 sessions)
    const expectedPercentage = 66.67;
    const calculatedPercentage = calculateOverallAttendancePercentage(subjectAttendance);
    // Round both expected and calculated percentages to two decimal places for comparison
    expect(Number(calculatedPercentage.toFixed(2))).toBe(expectedPercentage);
});
});
