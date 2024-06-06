import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import CustomBarChart from '../components/CustomBarChart';

const testData = [
  {
    subject: 'Math',
    attendancePercentage: 80,
    totalClasses: 50,
    attendedClasses: 40,
  },
  {
    subject: 'Science',
    attendancePercentage: 90,
    totalClasses: 60,
    attendedClasses: 54,
  },
  {
    subject: 'History',
    attendancePercentage: 70,
    totalClasses: 45,
    attendedClasses: 32,
  },
];

describe('CustomBarChart Component', () => {
  it('renders without crashing', () => {
    render(<CustomBarChart chartData={testData} dataKey="attendancePercentage" />);
    const xAxisLabel = screen.getByText('Math');
    expect(xAxisLabel).toBeInTheDocument();
  });

  it('displays correct data in tooltip for attendance percentage', async () => {
    render(<CustomBarChart chartData={testData} dataKey="attendancePercentage" />);
    const mathBar = screen.getByText('Math');
    // Trigger mouseover event to show tooltip
    mathBar.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));

    // Wait for the tooltip to render
    await waitFor(() => {
      expect(screen.getByText('Attended: (40/50)')).toBeInTheDocument();
      expect(screen.getByText('80%')).toBeInTheDocument();
    });
  });
});
