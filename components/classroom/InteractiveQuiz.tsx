'use client';

import React, { useState } from 'react';
import { POLAR_QUIZ_QUESTIONS, QuizQuestion } from '@/data/polaris-data';
import { CheckCircle2, XCircle, HelpCircle, Award, RotateCcw, ArrowRight } from 'lucide-react';

export function InteractiveQuiz() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Array<{ questionId: number; selected: number; isCorrect: boolean }>>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQ: QuizQuestion = POLAR_QUIZ_QUESTIONS[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    const isCorrect = idx === currentQ.correctIndex;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setUserAnswers((prev) => [
      ...prev,
      { questionId: currentQ.id, selected: idx, isCorrect }
    ]);
  };

  const handleNext = () => {
    if (currentIndex < POLAR_QUIZ_QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setUserAnswers([]);
    setQuizCompleted(false);
  };

  const progressPercent = ((currentIndex + 1) / POLAR_QUIZ_QUESTIONS.length) * 100;

  if (quizCompleted) {
    const percentage = Math.round((score / POLAR_QUIZ_QUESTIONS.length) * 100);

    return (
      <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-xl max-w-2xl mx-auto text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-sky-500 to-cyan-400 mx-auto flex items-center justify-center text-white shadow-lg">
          <Award className="w-8 h-8" />
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
            Assessment Completed
          </span>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
            Polar Science Mastery Result
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
            You scored <strong className="text-sky-600 dark:text-sky-400">{score}</strong> out of{' '}
            <strong>{POLAR_QUIZ_QUESTIONS.length}</strong> ({percentage}%)
          </p>
        </div>

        {/* Evaluation Banner */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-300 leading-relaxed text-left">
          {percentage >= 80 ? (
            <p>
              🌟 <strong>Outstanding Glaciological Acumen!</strong> You have demonstrated a command of polar desert dynamics, ice core paleoclimatology, and Southern Ocean ecological systems.
            </p>
          ) : percentage >= 60 ? (
            <p>
              ❄️ <strong>Commendable Explorer Rank!</strong> Solid understanding of high-latitude mechanisms. Review the IndARC and Atlantification concepts to sharpen your polar expertise.
            </p>
          ) : (
            <p>
              🧭 <strong>Junior Field Cadet!</strong> You are embarking on the journey of polar discovery. Review the interactive modules in Polar Classroom and try again!
            </p>
          )}
        </div>

        <button
          onClick={handleRestart}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs bg-sky-600 hover:bg-sky-500 text-white shadow-md shadow-sky-600/20 transition-all hover:scale-105"
        >
          <RotateCcw className="w-4 h-4" />
          Retake Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-xl max-w-2xl mx-auto space-y-6">
      
      {/* Progress Bar & Counter */}
      <div>
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
          <span>Question {currentIndex + 1} of {POLAR_QUIZ_QUESTIONS.length}</span>
          <span className="text-sky-600 dark:text-sky-400 font-mono">{currentQ.category}</span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-sky-500 to-cyan-400 transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div>
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug">
          {currentQ.question}
        </h3>
      </div>

      {/* Options */}
      <div className="space-y-2.5">
        {currentQ.options.map((option, idx) => {
          let optionClasses = 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/60 hover:border-sky-400 text-slate-800 dark:text-slate-200';

          if (isAnswered) {
            if (idx === currentQ.correctIndex) {
              optionClasses = 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-100 font-medium ring-1 ring-emerald-500';
            } else if (idx === selectedOption) {
              optionClasses = 'bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-900 dark:text-rose-100 ring-1 ring-rose-500';
            } else {
              optionClasses = 'bg-slate-50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-800 text-slate-400 opacity-60';
            }
          }

          return (
            <button
              key={idx}
              type="button"
              disabled={isAnswered}
              onClick={() => handleSelectOption(idx)}
              className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all duration-200 flex items-start gap-3 ${optionClasses}`}
            >
              <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="flex-1">{option}</span>

              {isAnswered && idx === currentQ.correctIndex && (
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
              )}
              {isAnswered && idx === selectedOption && idx !== currentQ.correctIndex && (
                <XCircle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation Box */}
      {isAnswered && (
        <div className="p-4 rounded-xl bg-sky-50/70 dark:bg-sky-950/40 border border-sky-300 dark:border-sky-800 text-xs space-y-2 animate-in fade-in duration-200">
          <div className="flex items-center gap-1.5 font-bold text-sky-800 dark:text-sky-300">
            <HelpCircle className="w-4 h-4" />
            <span>Scientific Explanation:</span>
          </div>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            {currentQ.explanation}
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
            Context: {currentQ.scientificContext}
          </p>
        </div>
      )}

      {/* Next Button */}
      {isAnswered && (
        <div className="flex justify-end pt-2">
          <button
            onClick={handleNext}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-sky-600 hover:bg-sky-500 text-white shadow-md shadow-sky-600/20 transition-all"
          >
            <span>{currentIndex < POLAR_QUIZ_QUESTIONS.length - 1 ? 'Next Question' : 'View Final Score'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
