import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  Play,
  RefreshCw,
  CheckCircle,
  XCircle,
  Lightbulb,
  Code,
  BookOpen,
  ChevronRight,
  Terminal,
} from "lucide-react";
import generateProblems from "../data/Problems";
// --- DATA: 50 DSA PROBLEMS ---
// Note: Implemented full logic for the first few types to demonstrate capability.
// Others have placeholders for the sake of file length, but the structure supports all 50.

const ALL_PROBLEMS = generateProblems();

// --- COMPONENTS ---

const Dsa = () => {
  const [currentProblemId, setCurrentProblemId] = useState(1);
  const [userCode, setUserCode] = useState("");
  const [output, setOutput] = useState([]);
  const [testResult, setTestResult] = useState(null); // null, 'pass', 'fail'
  const [activeTab, setActiveTab] = useState("description"); // 'description', 'solution'
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const currentProblem = ALL_PROBLEMS.find((p) => p.id === currentProblemId);

  useEffect(() => {
    // Reset code when problem changes
    setUserCode(currentProblem.initialCode);
    setOutput([]);
    setTestResult(null);
    setActiveTab("description");
    if (window.innerWidth < 1024) setIsSidebarOpen(false);
  }, [currentProblemId]);

  // Mock Console Implementation
  const runCode = () => {
    setOutput([]);
    setTestResult(null);

    const originalConsoleLog = console.log;
    const logs = [];

    console.log = (...args) => {
      logs.push(
        args
          .map((arg) =>
            typeof arg === "object" ? JSON.stringify(arg) : String(arg)
          )
          .join(" ")
      );
    };

    try {
      // Create a function from the user string.
      // Note: In production, run this in a Web Worker or Sandbox for security.
      // Format: we wrap user code and return the function itself to test it.

      // Extract function name or just use an anonymous wrapper
      const userFnWrapper = new Function(`
        ${userCode}
        // Try to return the first defined function
        const funcs = Object.values(this).filter(v => typeof v === 'function');
        // Return the last defined function in the scope (likely the user's)
        // Or specific parsing based on problem
        return ${userCode.match(/function\s+(\w+)/)?.[1] || "null"};
      `);

      const userFn = userFnWrapper();

      if (typeof userFn !== "function") {
        throw new Error("Không tìm thấy hàm hợp lệ. Hãy giữ nguyên tên hàm.");
      }

      // Run Test Cases
      const passed = currentProblem.testCase(userFn);

      // Update UI
      setOutput(logs);
      setTestResult(passed ? "pass" : "fail");
    } catch (error) {
      console.log("Error:", error.message);
      setOutput([...logs, `Lỗi: ${error.message}`]);
      setTestResult("fail");
    } finally {
      console.log = originalConsoleLog;
    }
  };

  const filteredProblems = ALL_PROBLEMS.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-slate-900 text-slate-100 font-sans overflow-hidden">
      {/* MOBILE OVERLAY */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR (Problem List) */}
      <aside
        className={`
        fixed lg:static inset-y-0 left-0 z-30
        w-72 bg-slate-800 border-r border-slate-700 transform transition-transform duration-200 ease-in-out
        ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }
        flex flex-col
      `}
      >
        <div className="p-4 border-b border-slate-700 flex justify-between items-center">
          <h1 className="text-xl font-bold text-emerald-400 flex items-center gap-2">
            <Code size={24} /> DSA Master
          </h1>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden text-slate-400"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-3">
          <input
            type="text"
            placeholder="Tìm kiếm bài tập..."
            className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredProblems.map((problem) => (
            <button
              key={problem.id}
              onClick={() => setCurrentProblemId(problem.id)}
              className={`w-full text-left px-4 py-3 border-b border-slate-700/50 hover:bg-slate-700/50 transition-colors flex justify-between items-center group
                ${
                  currentProblemId === problem.id
                    ? "bg-slate-700 border-l-4 border-l-emerald-500"
                    : "border-l-4 border-l-transparent"
                }
              `}
            >
              <div>
                <div className="text-sm font-medium group-hover:text-emerald-300 transition-colors line-clamp-1">
                  {problem.id}. {problem.title}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded 
                    ${
                      problem.difficulty === "Dễ"
                        ? "bg-green-900/50 text-green-400"
                        : problem.difficulty === "Trung bình"
                        ? "bg-yellow-900/50 text-yellow-400"
                        : "bg-red-900/50 text-red-400"
                    }`}
                  >
                    {problem.difficulty}
                  </span>
                  <span className="text-xs text-slate-500">
                    {problem.category}
                  </span>
                </div>
              </div>
              <ChevronRight
                size={16}
                className="text-slate-600 group-hover:text-emerald-400"
              />
            </button>
          ))}
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* TOP BAR */}
        <header className="h-14 bg-slate-800 border-b border-slate-700 flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden text-slate-400 hover:text-white"
            >
              <Menu size={24} />
            </button>
            <h2 className="font-semibold text-lg truncate hidden sm:block">
              {currentProblem.id}. {currentProblem.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setUserCode(currentProblem.initialCode);
                setOutput([]);
                setTestResult(null);
              }}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded tooltip-container relative group"
            >
              <RefreshCw size={20} />
              <span className="absolute top-full mt-2 right-0 bg-black text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                Reset Code
              </span>
            </button>
            <button
              onClick={runCode}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-1.5 rounded font-medium transition-colors shadow-lg shadow-emerald-900/20"
            >
              <Play size={18} fill="currentColor" />
              <span className="hidden sm:inline">Chạy Code</span>
              <span className="sm:hidden">Run</span>
            </button>
          </div>
        </header>

        {/* WORKSPACE GRID */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* LEFT PANEL: DESCRIPTION / SOLUTION */}
          <div className="flex-1 lg:w-1/2 flex flex-col border-b lg:border-b-0 lg:border-r border-slate-700 overflow-hidden bg-slate-900">
            {/* Tabs */}
            <div className="flex border-b border-slate-700 bg-slate-800/50">
              <button
                onClick={() => setActiveTab("description")}
                className={`px-4 py-2 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors ${
                  activeTab === "description"
                    ? "border-emerald-500 text-emerald-400"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                <BookOpen size={16} /> Đề bài
              </button>
              <button
                onClick={() => setActiveTab("solution")}
                className={`px-4 py-2 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors ${
                  activeTab === "solution"
                    ? "border-emerald-500 text-emerald-400"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                <Lightbulb size={16} /> Lời giải & Giải thích
              </button>
            </div>

            {/* Content Scroll Area */}
            <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
              {activeTab === "description" ? (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      {currentProblem.title}
                    </h3>
                    <div className="flex gap-2 mb-4">
                      <span
                        className={`px-2 py-0.5 text-xs rounded-full border ${
                          currentProblem.difficulty === "Dễ"
                            ? "border-green-500/30 bg-green-500/10 text-green-400"
                            : currentProblem.difficulty === "Trung bình"
                            ? "border-yellow-500/30 bg-yellow-500/10 text-yellow-400"
                            : "border-red-500/30 bg-red-500/10 text-red-400"
                        }`}
                      >
                        {currentProblem.difficulty}
                      </span>
                      <span className="px-2 py-0.5 text-xs rounded-full border border-slate-600 bg-slate-800 text-slate-300">
                        {currentProblem.category}
                      </span>
                    </div>
                    <p className="text-slate-300 leading-relaxed whitespace-pre-line">
                      {currentProblem.description}
                    </p>
                  </div>

                  <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                    <h4 className="text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider">
                      Ví dụ
                    </h4>
                    <pre className="font-mono text-sm text-slate-300 whitespace-pre-wrap">
                      {currentProblem.example}
                    </pre>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="bg-emerald-900/20 border border-emerald-900/50 p-4 rounded-lg">
                    <h4 className="flex items-center gap-2 text-emerald-400 font-bold mb-2">
                      <Lightbulb size={18} /> Ý tưởng thuật toán
                    </h4>
                    <p className="text-slate-300 leading-relaxed">
                      {currentProblem.explanation}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-slate-400 font-bold mb-2 text-sm">
                      Code mẫu (JavaScript)
                    </h4>
                    <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 overflow-x-auto">
                      <pre className="font-mono text-sm text-blue-300">
                        {currentProblem.solution}
                      </pre>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT PANEL: EDITOR & CONSOLE */}
          <div className="flex-1 lg:w-1/2 flex flex-col bg-[#1e1e1e]">
            {/* Code Editor Area */}
            <div className="flex-1 flex flex-col relative">
              <div className="absolute top-0 right-0 p-2 z-10 opacity-50 hover:opacity-100 transition-opacity">
                <span className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded font-mono">
                  JavaScript (ES6)
                </span>
              </div>
              <textarea
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                className="flex-1 w-full bg-[#1e1e1e] text-[#d4d4d4] p-4 font-mono text-sm resize-none focus:outline-none leading-6 custom-scrollbar"
                spellCheck="false"
                placeholder="// Viết code giải thuật của bạn tại đây..."
              />
            </div>

            {/* Console / Output Area */}
            <div className="h-48 md:h-64 bg-slate-900 border-t border-slate-700 flex flex-col">
              <div className="h-8 bg-slate-800 px-4 flex items-center justify-between border-b border-slate-700">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wide">
                  <Terminal size={14} /> Console / Test Results
                </div>
                {testResult && (
                  <div
                    className={`flex items-center gap-1.5 text-xs font-bold px-2 py-0.5 rounded ${
                      testResult === "pass"
                        ? "bg-green-900/50 text-green-400"
                        : "bg-red-900/50 text-red-400"
                    }`}
                  >
                    {testResult === "pass" ? (
                      <CheckCircle size={14} />
                    ) : (
                      <XCircle size={14} />
                    )}
                    {testResult === "pass" ? "ACCEPTED" : "WRONG ANSWER"}
                  </div>
                )}
              </div>
              <div className="flex-1 p-4 font-mono text-sm overflow-y-auto custom-scrollbar">
                {output.length === 0 && !testResult ? (
                  <span className="text-slate-600 italic">
                    Nhấn "Chạy Code" để xem kết quả...
                  </span>
                ) : (
                  <div className="space-y-1">
                    {output.map((line, idx) => (
                      <div
                        key={idx}
                        className="text-slate-300 break-words border-b border-slate-800/50 pb-1 mb-1 last:border-0"
                      >
                        <span className="text-slate-600 mr-2">{">"}</span>
                        {line}
                      </div>
                    ))}
                    {testResult === "pass" && (
                      <div className="text-green-400 mt-2 font-bold">
                        🎉 Chúc mừng! Bạn đã vượt qua tất cả test cases.
                      </div>
                    )}
                    {testResult === "fail" && (
                      <div className="text-red-400 mt-2 font-bold">
                        ⚠️ Kết quả chưa chính xác hoặc có lỗi xảy ra. Hãy kiểm
                        tra lại logic.
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Custom Styles for Scrollbars */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #0f172a;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #334155;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #475569;
        }
      `}</style>
    </div>
  );
};

export default Dsa;
