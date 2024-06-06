import { 
  calculateSubjectAttendancePercentage,
  groupAttendanceBySubject,
  calculateOverallAttendancePercentage 
} from '../components/attendanceCalculator';

describe('Utility Functions Tests', () => {
  test('calculateSubjectAttendancePercentage', () => {
    expect(calculateSubjectAttendancePercentage(0, 0)).toBe(0);
    
    expect(calculateSubjectAttendancePercentage(5, 10)).toBe('50.00');
    
    expect(calculateSubjectAttendancePercentage(1, 3)).toBe('33.33');
  });

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

  test('calculateOverallAttendancePercentage', () => {
    const subjectAttendance = [
        { subName: { _id: '1', sessions: 10 }, status: 'Present' },
        { subName: { _id: '1', sessions: 10 }, status: 'Present' },
        { subName: { _id: '2', sessions: 8 }, status: 'Absent' }
    ];

    const totalSessions = subjectAttendance.reduce((acc, curr) => acc + parseInt(curr.subName.sessions), 0);
    const presentCount = subjectAttendance.filter(attendance => attendance.status === 'Present').length;
    const expectedPercentage = (presentCount / totalSessions) * 100;

    // Calculate the received percentage
    const calculatedPercentage = calculateOverallAttendancePercentage(subjectAttendance);

    // Round both expected and calculated percentages to two decimal places for comparison
    const expectedRoundedPercentage = parseFloat(expectedPercentage.toFixed(2));
    const calculatedRoundedPercentage = parseFloat(calculatedPercentage.toFixed(2));

    expect(calculatedRoundedPercentage).toBe(expectedRoundedPercentage);
});

});
