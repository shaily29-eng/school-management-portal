import React from 'react';
import { render } from '@testing-library/react';
import CustomBarChart from './CustomBarChart';

describe('CustomBarChart', () => {
  const chartData = [
    {
      subject: 'Math',
      attendancePercentage: 80,
      totalClasses: 50,
      attendedClasses: Math.round((80 / 100) * 50),
    },
    {
      subject: 'Science',
      attendancePercentage: 90,
      totalClasses: 60,
      attendedClasses: Math.round((90 / 100) * 60),
    },
    {
      subject: 'History',
      attendancePercentage: 70,
      totalClasses: 45,
      attendedClasses: Math.round((70 / 100) * 45),
    },
  ];

  test('renders without crashing', () => {
    render(<CustomBarChart chartData={chartData} dataKey="attendancePercentage" />);
  });

  test('renders correct tooltip content for attendance percentage', () => {
    const { getByText } = render(<CustomBarChart chartData={chartData} dataKey="attendancePercentage" />);
    const mathTooltip = getByText('Math');
    const scienceTooltip = getByText('Science');
    const historyTooltip = getByText('History');

    expect(mathTooltip).toBeInTheDocument();
    expect(scienceTooltip).toBeInTheDocument();
    expect(historyTooltip).toBeInTheDocument();
  });

  test('renders correct tooltip content for marks obtained', () => {
    const { getByText } = render(<CustomBarChart chartData={chartData} dataKey="marksObtained" />);
    const mathTooltip = getByText('Math');
    const scienceTooltip = getByText('Science');
    const historyTooltip = getByText('History');

    expect(mathTooltip).toBeInTheDocument();
    expect(scienceTooltip).toBeInTheDocument();
    expect(historyTooltip).toBeInTheDocument();
  });

  test('generates distinct colors for bars', () => {
    const { container } = render(<CustomBarChart chartData={chartData} dataKey="attendancePercentage" />);
    const bars = container.querySelectorAll('.recharts-bar-rectangle');

    const colors = new Set();
    bars.forEach((bar) => {
      const fill = bar.getAttribute('fill');
      colors.add(fill);
    });

    // Expecting the number of distinct colors to be equal to the number of bars
    expect(colors.size).toBe(chartData.length);
  });
});
