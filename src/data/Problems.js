const generateProblems = () => {
  const problems = [
    {
      id: 1,
      title: "Tổng hai số (Two Sum)",
      difficulty: "Dễ",
      category: "Array",
      description:
        "Cho một mảng các số nguyên `nums` và một số nguyên `target`. Hãy trả về chỉ số (index) của hai số sao cho tổng của chúng bằng `target`.\n\nGiả sử mỗi đầu vào chỉ có đúng một giải pháp.",
      example:
        "Input: nums = [2,7,11,15], target = 9\nOutput: [0,1] (Vì 2 + 7 = 9)",
      initialCode: `function twoSum(nums, target) {
  // Viết code của bạn ở đây
}`,
      solution: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
      explanation:
        "Sử dụng Hash Map để lưu trữ giá trị và chỉ số đã duyệt qua. Độ phức tạp O(n).",
      testCase: (fn) => {
        try {
          const r1 = fn([2, 7, 11, 15], 9);
          const r2 = fn([3, 2, 4], 6);
          return (
            JSON.stringify(r1.sort()) === JSON.stringify([0, 1]) &&
            JSON.stringify(r2.sort()) === JSON.stringify([1, 2])
          );
        } catch {
          return false;
        }
      },
    },

    {
      id: 2,
      title: "Kiểm tra Palindrome",
      difficulty: "Dễ",
      category: "String",
      description:
        "Cho một chuỗi, kiểm tra xem nó có phải là chuỗi đối xứng hay không.",
      example: "Input: 'A man, a plan, a canal: Panama'\nOutput: true",
      initialCode: `function isPalindrome(s) {
  // Code here
}`,
      solution: `function isPalindrome(s) {
  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  return clean === clean.split('').reverse().join('');
}`,
      explanation:
        "Loại bỏ ký tự đặc biệt, chuyển về chữ thường rồi so sánh với chuỗi đảo.",
      testCase: (fn) => {
        try {
          return (
            fn("A man, a plan, a canal: Panama") === true &&
            fn("race a car") === false
          );
        } catch {
          return false;
        }
      },
    },

    {
      id: 3,
      title: "Giai thừa (Factorial)",
      difficulty: "Dễ",
      category: "Recursion",
      description: "Tính giai thừa của một số nguyên dương n.",
      example: "Input: 5\nOutput: 120",
      initialCode: `function factorial(n) {
}`,
      solution: `function factorial(n) {
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
}`,
      explanation: "Áp dụng đệ quy: n! = n * (n-1)!",
      testCase: (fn) => {
        try {
          return fn(5) === 120 && fn(0) === 1 && fn(3) === 6;
        } catch {
          return false;
        }
      },
    },

    {
      id: 4,
      title: "FizzBuzz",
      difficulty: "Dễ",
      category: "Basic",
      description:
        "Nếu chia hết cho 3 in 'Fizz', cho 5 in 'Buzz', cả hai in 'FizzBuzz'.",
      example: "Input: 3\nOutput: ['1','2','Fizz']",
      initialCode: `function fizzBuzz(n) {
}`,
      solution: `function fizzBuzz(n) {
  let result = [];
  for (let i = 1; i <= n; i++) {
    let str = '';
    if (i % 3 === 0) str += 'Fizz';
    if (i % 5 === 0) str += 'Buzz';
    result.push(str || i.toString());
  }
  return result;
}`,
      explanation: "Dùng vòng lặp và toán tử modulo.",
      testCase: (fn) => {
        try {
          const r = fn(15);
          return r[2] === "Fizz" && r[4] === "Buzz" && r[14] === "FizzBuzz";
        } catch {
          return false;
        }
      },
    },

    {
      id: 5,
      title: "Đảo ngược chuỗi",
      difficulty: "Dễ",
      category: "String",
      description: "Viết hàm đảo ngược chuỗi.",
      example: "Input: 'hello'\nOutput: 'olleh'",
      initialCode: `function reverseString(s) {
}`,
      solution: `function reverseString(s) {
  return s.split('').reverse().join('');
}`,
      explanation: "Dùng split → reverse → join.",
      testCase: (fn) => {
        try {
          return fn("hello") === "olleh" && fn("OpenAI") === "IAnepO";
        } catch {
          return false;
        }
      },
    },
  ];

  const categories = ["Array", "String", "DP", "Tree", "Graph", "Sorting"];
  const diffs = ["Dễ", "Trung bình", "Khó"];

  for (let i = 6; i <= 50; i++) {
    problems.push({
      id: i,
      title: `Bài tập mô phỏng DSA #${i}`,
      difficulty: diffs[i % 3],
      category: categories[i % 6],
      description: `Đây là mô tả cho bài tập số ${i}.`,
      example: "Input: Bất kỳ\nOutput: true",
      initialCode: `function solveProblem${i}(input) {
  return true;
}`,
      solution: `function solveProblem${i}(input) {
  return true;
}`,
      explanation: "Bài demo tự động.",
      testCase: (fn) => {
        try {
          return fn() === true;
        } catch {
          return false;
        }
      },
    });
  }

  return problems;
};

export default generateProblems;
