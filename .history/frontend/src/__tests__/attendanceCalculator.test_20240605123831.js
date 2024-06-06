export const calculateOverallAttendancePercentage = (subjectAttendance) => {
  let totalSessionsSum = 0;
  let presentCountSum = 0;
  const uniqueSubIds = [];

  subjectAttendance.forEach((attendance) => {
    const subId = attendance.subName._id;
    if (!uniqueSubIds.includes(subId)) {
      const sessions = parseInt(attendance.subName.sessions);
      totalSessionsSum += sessions;
      uniqueSubIds.push(subId);
    }
    presentCountSum += attendance.status === "Present" ? 1 : 0;
  });

  if (totalSessionsSum === 0 || presentCountSum === 0) {
    return 0;
  }

  return Math.round((presentCountSum / totalSessionsSum) * 100); // Round the result to the nearest integer
};
