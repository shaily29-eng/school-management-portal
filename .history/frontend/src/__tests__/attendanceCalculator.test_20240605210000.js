import { 
  calculateSubjectAttendancePercentage,
  groupAttendanceBySubject,
  calculateOverallAttendancePercentage 
} from '../components/attendanceCalculator';

describe('Utility Functions Tests', () => {

  // Test for calculateSubjectAttendancePercentage
  test('calculateSubjectAttendancePercentage', () => {
    // Edge case: no sessions
    expect(calculateSubjectAttendancePercentage(0, 0)).toBe(0);
    
    // Typical cases
    expect(calculateSubjectAttendancePercentage(5, 10)).toBe('50.00');
    expect(calculateSubjectAttendancePercentage(1, 3)).toBe('33.33');
    expect(calculateSubjectAttendancePercentage(10, 10)).toBe('100.00');
  });

  // Test for groupAttendanceBySubject
  test('groupAttendanceBySubject', () => {
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

  // Test for calculateOverallAttendancePercentage
  test('calculateOverallAttendancePercentage', () => {
    const subjectAttendance = [
        { subName: { _id: '1', sessions: 10 }, status: 'Present' },
        { subName: { _id: '1', sessions: 10 }, status: 'Present' },
        { subName: { _id: '2', sessions: 8 }, status: 'Absent' }
    ];

    const totalSessions = subjectAttendance.reduce((acc, curr) => acc + parseInt(curr.subName.sessions), 0);
    const presentCount = subjectAttendance.filter(attendance => attendance.status === 'Present').length;
    const expectedPercentage = (presentCount / totalSessions) * 100;

    const calculatedPercentage = calculateOverallAttendancePercentage(subjectAttendance);

    const expectedRoundedPercentage = parseFloat(expectedPercentage.toFixed(2));
    const calculatedRoundedPercentage = parseFloat(calculatedPercentage.toFixed(2));

    expect(calculatedRoundedPercentage).toBe(expectedRoundedPercentage);
  });

  // Edge case for calculateOverallAttendancePercentage
  test('calculateOverallAttendancePercentage with zero sessions', () => {
    const subjectAttendance = [
        { subName: { _id: '1', sessions: 0 }, status: 'Absent' },
        { subName: { _id: '2', sessions: 0 }, status: 'Present' }
    ];

    const expectedPercentage = 0;

    const calculatedPercentage = calculateOverallAttendancePercentage(subjectAttendance);

    expect(calculatedPercentage).toBe(expectedPercentage);
  });

});
