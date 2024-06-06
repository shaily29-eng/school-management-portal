import React from 'react';
import { render, screen } from '@testing-library/react';
import CustomBarChart from '../components/CustomBarChart';

// Define test data for the component
const testData = [
  {
    subject: 'Math',
    attendancePercentage: 80,
    totalClasses: 50,
    attendedClasses: 40, // Example value based on the percentage
  },
  {
    subject: 'Science',
    attendancePercentage: 90,
    totalClasses: 60,
    attendedClasses: 54, // Example value based on the percentage
  },
  // Add more test data if needed
];

describe('CustomBarChart Component', () => {
  it('renders without crashing', () => {
    render(<CustomBarChart chartData={testData} dataKey="attendancePercentage" />);
  });

  it('displays correct data in tooltip for attendance percentage', () => {
    // Render the component
    render(<CustomBarChart chartData={testData} dataKey="attendancePercentage" />);

    // Assert that the tooltip displays the correct attendance percentage data
    expect(screen.getByText('Math')).toBeInTheDocument();
    expect(screen.getByText('Attended: (40/50)')).toBeInTheDocument();
    expect(screen.getByText('80%')).toBeInTheDocument();
  });

  // Add more test cases for different scenarios as needed
});
