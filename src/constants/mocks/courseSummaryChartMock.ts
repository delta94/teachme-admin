const courseSummaryMock = {
  days: [
    { day: 1, 'Users Started': 4000, 'Users Completed': 2400 },
    { day: 2, 'Users Started': 3000, 'Users Completed': 1398 },
    { day: 3, 'Users Started': 2000, 'Users Completed': 9800 },
    { day: 4, 'Users Started': 2780, 'Users Completed': 3908 },
    { day: 5, 'Users Started': 1890, 'Users Completed': 4800 },
    { day: 6, 'Users Started': 2390, 'Users Completed': 3800 },
    { day: 7, 'Users Started': 3490, 'Users Completed': 4300 },
  ],
  lines: [
    {
      dataKey: 'Users Started',
      stroke: '#F2B529',
      tooltipLabel: 'Users started this course',
    },
    {
      dataKey: 'Users Completed',
      stroke: '#8812FF',
      tooltipLabel: 'Users completed this course',
    },
  ],
};

export default courseSummaryMock;
