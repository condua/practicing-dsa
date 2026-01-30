import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Code,
  CheckCircle,
  Menu,
  X,
  ChevronRight,
  Award,
  Play,
  Terminal,
  AlertCircle,
  Layout,
  RefreshCw,
} from "lucide-react";
import curriculum from "../data/Typescript";
// --- Dữ liệu khóa học (Curriculum Data) ---

// --- Sub-components ---

const CodeBlock = ({ title, code, lang }) => (
  <div className="my-4 rounded-lg overflow-hidden border border-slate-700 shadow-sm bg-[#1e1e1e]">
    {title && (
      <div className="bg-slate-800 px-4 py-2 text-xs font-mono text-slate-300 border-b border-slate-700 flex items-center justify-between">
        <span>{title}</span>
        <span className="text-slate-500 uppercase">{lang}</span>
      </div>
    )}
    <pre className="p-4 overflow-x-auto text-sm font-mono leading-relaxed text-blue-100">
      <code>{code}</code>
    </pre>
  </div>
);

const ProgressBar = ({ current, total }) => {
  const percent = Math.round(((current + 1) / total) * 100);
  return (
    <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2">
      <div
        className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
        style={{ width: `${percent}%` }}
      ></div>
    </div>
  );
};

// --- Main Application Component ---

export default function TSLearningSystem() {
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("learn"); // 'learn' | 'practice'
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [quizState, setQuizState] = useState({}); // { [moduleId]: { [questionIndex]: selectedOptionIndex } }
  const [showResults, setShowResults] = useState({}); // { [moduleId]: boolean }

  const currentModule = curriculum[activeModuleIndex];

  // Scroll to top when changing modules
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeModuleIndex]);

  const handleNextModule = () => {
    if (activeModuleIndex < curriculum.length - 1) {
      setActiveModuleIndex((prev) => prev + 1);
      setActiveTab("learn");
      setSidebarOpen(false);
    }
  };

  const handlePrevModule = () => {
    if (activeModuleIndex > 0) {
      setActiveModuleIndex((prev) => prev - 1);
      setSidebarOpen(false);
    }
  };

  const handleOptionSelect = (qIndex, optionIndex) => {
    if (showResults[currentModule.id]) return; // Disable changing after submit
    setQuizState((prev) => ({
      ...prev,
      [currentModule.id]: {
        ...(prev[currentModule.id] || {}),
        [qIndex]: optionIndex,
      },
    }));
  };

  const handleSubmitQuiz = () => {
    setShowResults((prev) => ({
      ...prev,
      [currentModule.id]: true,
    }));
  };

  const handleResetQuiz = () => {
    setShowResults((prev) => ({
      ...prev,
      [currentModule.id]: false,
    }));
    setQuizState((prev) => ({
      ...prev,
      [currentModule.id]: {},
    }));
  };

  // Calculate score for current module
  const calculateScore = () => {
    const answers = quizState[currentModule.id] || {};
    let score = 0;
    currentModule.quiz.forEach((q, idx) => {
      if (answers[idx] === q.correct) score++;
    });
    return score;
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 -ml-2 rounded-md hover:bg-slate-100 md:hidden text-slate-600"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="flex items-center gap-2 text-blue-700">
              <Layout className="w-6 h-6" />
              <span className="font-bold text-xl tracking-tight hidden sm:inline">
                TS Master
              </span>
            </div>
            <span className="text-slate-300 text-2xl hidden sm:inline font-light">
              |
            </span>
            <span className="text-sm font-medium text-slate-600 truncate max-w-[200px] sm:max-w-md">
              {currentModule.title}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end min-w-[100px]">
              <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                Tiến độ
              </span>
              <ProgressBar
                current={activeModuleIndex}
                total={curriculum.length}
              />
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 max-w-7xl w-full mx-auto overflow-hidden">
        {/* Sidebar Navigation */}
        <aside
          className={`
            fixed inset-y-0 left-0 z-20 w-72 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out
            md:relative md:translate-x-0 pt-16 md:pt-0
            ${
              sidebarOpen
                ? "translate-x-0 shadow-2xl"
                : "-translate-x-full md:shadow-none"
            }
          `}
        >
          <div className="h-full overflow-y-auto p-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-2">
              Lộ trình học
            </h3>
            <div className="space-y-1">
              {curriculum.map((module, idx) => (
                <button
                  key={module.id}
                  onClick={() => {
                    setActiveModuleIndex(idx);
                    setSidebarOpen(false);
                    setActiveTab("learn");
                  }}
                  className={`
                    w-full flex items-center gap-3 px-3 py-3 text-sm rounded-lg text-left transition-colors
                    ${
                      activeModuleIndex === idx
                        ? "bg-blue-50 text-blue-700 font-semibold border border-blue-100"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }
                  `}
                >
                  <span
                    className={`
                    flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full text-xs
                    ${
                      activeModuleIndex === idx
                        ? "bg-blue-200 text-blue-800"
                        : "bg-slate-100 text-slate-500"
                    }
                  `}
                  >
                    {idx + 1}
                  </span>
                  <span className="truncate">
                    {module.title.split(". ")[1]}
                  </span>
                  {showResults[module.id] && (
                    <CheckCircle size={14} className="ml-auto text-green-500" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Overlay for mobile sidebar */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-10 md:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col h-[calc(100vh-64px)] overflow-hidden">
          {/* Tabs */}
          <div className="bg-white border-b border-slate-200 px-4 md:px-8 pt-6">
            <div className="flex space-x-6">
              <button
                onClick={() => setActiveTab("learn")}
                className={`pb-3 flex items-center gap-2 text-sm font-medium transition-colors border-b-2 ${
                  activeTab === "learn"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                }`}
              >
                <BookOpen size={18} />
                Lý thuyết
              </button>
              <button
                onClick={() => setActiveTab("practice")}
                className={`pb-3 flex items-center gap-2 text-sm font-medium transition-colors border-b-2 ${
                  activeTab === "practice"
                    ? "border-purple-600 text-purple-600"
                    : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                }`}
              >
                <Terminal size={18} />
                Thực hành
                <span className="ml-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs">
                  {currentModule.quiz.length}
                </span>
              </button>
            </div>
          </div>

          {/* Content Scroll Area */}
          <div className="flex-1 overflow-y-auto bg-slate-50/50 p-4 md:p-8">
            <div className="max-w-3xl mx-auto pb-12">
              {/* Tab: Learn */}
              {activeTab === "learn" && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">
                      {currentModule.title}
                    </h1>
                    <p className="text-lg text-slate-600">
                      {currentModule.description}
                    </p>
                  </div>

                  <div className="space-y-6">
                    {currentModule.content.map((block, idx) => {
                      if (block.type === "text") {
                        return (
                          <p
                            key={idx}
                            className="text-slate-700 leading-7 text-base md:text-lg"
                            dangerouslySetInnerHTML={{
                              __html: block.value.replace(
                                /`([^`]+)`/g,
                                '<code class="bg-slate-200 text-pink-600 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>'
                              ),
                            }}
                          />
                        );
                      }
                      if (block.type === "code") {
                        return (
                          <CodeBlock
                            key={idx}
                            title={block.title}
                            code={block.value}
                            lang={block.lang}
                          />
                        );
                      }
                      if (block.type === "note") {
                        return (
                          <div
                            key={idx}
                            className="flex gap-3 bg-amber-50 border border-amber-200 p-4 rounded-lg"
                          >
                            <AlertCircle
                              className="text-amber-500 shrink-0"
                              size={20}
                            />
                            <p className="text-amber-800 text-sm">
                              {block.value}
                            </p>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>

                  {/* Navigation Footer within Learn Tab */}
                  <div className="mt-12 flex justify-between items-center pt-8 border-t border-slate-200">
                    <button
                      onClick={handlePrevModule}
                      disabled={activeModuleIndex === 0}
                      className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                        activeModuleIndex === 0
                          ? "text-slate-300 cursor-not-allowed"
                          : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      Bài trước
                    </button>
                    <button
                      onClick={() => setActiveTab("practice")}
                      className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 shadow-md hover:shadow-lg transition-all"
                    >
                      Làm bài tập <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* Tab: Practice */}
              {activeTab === "practice" && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <div className="mb-8 flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 mb-1">
                        Bài tập thực hành
                      </h2>
                      <p className="text-slate-500">
                        Trả lời đúng các câu hỏi để mở khóa bài tiếp theo.
                      </p>
                    </div>
                    {showResults[currentModule.id] && (
                      <div className="flex flex-col items-end">
                        <span className="text-sm text-slate-500 uppercase font-bold">
                          Kết quả
                        </span>
                        <span
                          className={`text-2xl font-bold ${
                            calculateScore() === currentModule.quiz.length
                              ? "text-green-600"
                              : "text-amber-600"
                          }`}
                        >
                          {calculateScore()} / {currentModule.quiz.length}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-8">
                    {currentModule.quiz.map((q, qIdx) => {
                      const userAns = quizState[currentModule.id]?.[qIdx];
                      const isSubmitted = showResults[currentModule.id];
                      const isCorrect = userAns === q.correct;

                      return (
                        <div
                          key={qIdx}
                          className={`
                          rounded-xl border p-6 bg-white shadow-sm transition-all
                          ${
                            isSubmitted
                              ? isCorrect
                                ? "border-green-200 bg-green-50/30"
                                : "border-red-200 bg-red-50/30"
                              : "border-slate-200"
                          }
                        `}
                        >
                          <div className="flex gap-3 mb-4">
                            <span className="flex-shrink-0 w-6 h-6 rounded bg-slate-100 text-slate-500 text-xs font-bold flex items-center justify-center mt-0.5">
                              {qIdx + 1}
                            </span>
                            <h3 className="text-lg font-medium text-slate-800">
                              {q.question}
                            </h3>
                          </div>

                          <div className="space-y-3 pl-9">
                            {q.options.map((opt, oIdx) => (
                              <label
                                key={oIdx}
                                className={`
                                  flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all relative overflow-hidden
                                  ${
                                    userAns === oIdx
                                      ? "border-blue-500 bg-blue-50 text-blue-800 shadow-sm ring-1 ring-blue-500"
                                      : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                                  }
                                  ${
                                    isSubmitted && oIdx === q.correct
                                      ? "!border-green-500 !bg-green-100 !text-green-800 ring-1 ring-green-500"
                                      : ""
                                  }
                                  ${
                                    isSubmitted &&
                                    userAns === oIdx &&
                                    !isCorrect
                                      ? "!border-red-500 !bg-red-50 !text-red-800"
                                      : ""
                                  }
                                  ${
                                    isSubmitted
                                      ? "pointer-events-none opacity-90"
                                      : ""
                                  }
                                `}
                              >
                                <input
                                  type="radio"
                                  name={`q-${currentModule.id}-${qIdx}`}
                                  className="w-4 h-4 text-blue-600 accent-blue-600"
                                  checked={userAns === oIdx}
                                  onChange={() =>
                                    handleOptionSelect(qIdx, oIdx)
                                  }
                                  disabled={isSubmitted}
                                />
                                <span className="text-sm font-medium">
                                  {opt}
                                </span>

                                {isSubmitted && oIdx === q.correct && (
                                  <CheckCircle
                                    size={16}
                                    className="absolute right-4 text-green-600"
                                  />
                                )}
                                {isSubmitted &&
                                  userAns === oIdx &&
                                  !isCorrect && (
                                    <X
                                      size={16}
                                      className="absolute right-4 text-red-500"
                                    />
                                  )}
                              </label>
                            ))}
                          </div>

                          {isSubmitted && (
                            <div
                              className={`mt-4 ml-9 p-3 rounded text-sm ${
                                isCorrect
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-50 text-red-800"
                              }`}
                            >
                              <p className="font-bold mb-1">
                                {isCorrect ? "Chính xác!" : "Chưa đúng."}
                              </p>
                              <p>{q.explanation}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-8 flex justify-end gap-3 pb-8">
                    {showResults[currentModule.id] ? (
                      <>
                        <button
                          onClick={handleResetQuiz}
                          className="px-5 py-2.5 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50 font-medium flex items-center gap-2"
                        >
                          <RefreshCw size={18} /> Làm lại
                        </button>
                        {activeModuleIndex < curriculum.length - 1 && (
                          <button
                            onClick={handleNextModule}
                            className="px-6 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-md font-medium flex items-center gap-2"
                          >
                            Bài tiếp theo <ChevronRight size={18} />
                          </button>
                        )}
                        {activeModuleIndex === curriculum.length - 1 && (
                          <div className="px-6 py-2.5 rounded-lg bg-green-600 text-white font-medium flex items-center gap-2">
                            <Award size={18} /> Hoàn thành khóa học
                          </div>
                        )}
                      </>
                    ) : (
                      <button
                        onClick={handleSubmitQuiz}
                        disabled={
                          !currentModule.quiz.every(
                            (_, i) =>
                              typeof quizState[currentModule.id]?.[i] !==
                              "undefined"
                          )
                        }
                        className="bg-purple-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-purple-700 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                      >
                        <CheckCircle size={18} />
                        Kiểm tra kết quả
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
