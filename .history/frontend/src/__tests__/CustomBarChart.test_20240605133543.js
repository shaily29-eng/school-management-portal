import React from 'react'; // Add this line
import { render, screen, waitFor } from '@testing-library/react';
import CustomBarChart from '../components/CustomBarChart'; // Adjust the path as needed

// Define sample test data
const testData = {
  // Your sample test data here
};

describe('CustomBarChart Component', () => {
  it('renders without crashing', () => {
    render(<CustomBarChart chartData={testData} dataKey="attendancePercentage" />);
    const xAxisLabel = screen.getByText('Math');
    expect(xAxisLabel).toBeInTheDocument();
  });

  it('displays correct data in tooltip for attendance percentage', async () => {
    render(<CustomBarChart chartData={testData} dataKey="attendancePercentage" />);

    // Wait for the tooltip to render with an increased timeout
    await waitFor(() => {
      expect(screen.getByText('Attended: (40/50)')).toBeInTheDocument();
    }, { timeout: 10000 }); // Increase timeout to 10 seconds
  });
});
