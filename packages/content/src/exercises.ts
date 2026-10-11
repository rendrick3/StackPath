import { Exercise } from '@stackpath/shared';

export const exercises: Exercise[] = [
  {
    id: 'ex-1-1',
    lessonId: 'les-1-1',
    title: 'Calculate Computer Memory Allocation',
    description: 'Practice declaring variables and updating values in memory.',
    instructions: [
      'Declare a constant named "baseBytes" with value 1024.',
      'Declare a variable named "totalKilobytes" with value 4.',
      'Compute "totalBytes" by multiplying "baseBytes" by "totalKilobytes".',
      'Return "totalBytes".'
    ],
    starterCode: `function calculateMemory() {
  // 1. Declare baseBytes (1024)
  const baseBytes = 1024;

  // 2. Declare totalKilobytes (4)
  let totalKilobytes = 4;

  // 3. Compute totalBytes
  const totalBytes = baseBytes * totalKilobytes;

  // 4. Return totalBytes
  return totalBytes;
}`,
    language: 'javascript',
    solutionCode: `function calculateMemory() {
  const baseBytes = 1024;
  let totalKilobytes = 4;
  const totalBytes = baseBytes * totalKilobytes;
  return totalBytes;
}`,
    solutionExplanation: 'The function allocates memory for two variables, computes their product using the CPU arithmetic operator (*), and returns the numeric result 4096.',
    hints: [
      'Multiply using the asterisk (*) operator.',
      'Make sure you return the totalBytes variable.'
    ],
    testCases: [
      {
        id: 'tc-1',
        inputDescription: 'Function execution',
        expectedOutput: '4096',
        testCode: 'calculateMemory() === 4096'
      }
    ]
  },
  {
    id: 'ex-6-1',
    lessonId: 'les-6-1',
    title: 'Filter Active Users Without Mutating Data',
    description: 'Use the immutable array method .filter() to extract active students without modifying the original array.',
    instructions: [
      'Filter the students array to include only students whose "isActive" property is true.',
      'Return the resulting filtered array.'
    ],
    starterCode: `function getActiveStudents(students) {
  // Use students.filter() to find active students
  return students.filter(student => student.isActive === true);
}`,
    language: 'javascript',
    solutionCode: `function getActiveStudents(students) {
  return students.filter(student => student.isActive);
}`,
    solutionExplanation: 'Array.prototype.filter() creates a shallow copy of a portion of the array, filtered down to elements that pass the test function, without mutating the original input array.',
    hints: [
      'Use the filter() method on the students array.',
      'Check student.isActive in the callback.'
    ],
    testCases: [
      {
        id: 'tc-6-1',
        inputDescription: 'List with 2 active and 1 inactive students',
        expectedOutput: '2 active students returned',
        testCode: `const sample = [{ name: 'A', isActive: true }, { name: 'B', isActive: false }, { name: 'C', isActive: true }];
const result = getActiveStudents(sample);
result.length === 2 && result[0].name === 'A' && result[1].name === 'C'`
      }
    ]
  }
];
