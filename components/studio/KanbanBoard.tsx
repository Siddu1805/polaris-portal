'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  useWorkflow, WorkflowStatus, WorkflowItem 
} from '@/context/WorkflowContext';
import { useToast } from '@/context/ToastContext';
import { 
  CheckCircle2, AlertCircle, Clock, Send, Eye, MessageSquare, 
  ArrowRight, ShieldCheck, Check, RotateCcw, X 
} from 'lucide-react';

export function KanbanBoard() {
  const { items, updateStatus, addComment } = useWorkflow();
  const { showToast } = useToast();

  const [activeReviewItem, setActiveReviewItem] = useState<WorkflowItem | null>(null);
  const [refereeName, setRefereeName] = useState('Dr. Anandita Chatterjee');
  const [reviewNote, setReviewNote] = useState('');

  const columns: WorkflowStatus[] = [
    'Draft',
    'Generated',
    'Under Review',
    'Approved',
    'Published',
  ];

  const getStatusBadge = (status: WorkflowStatus) => {
    switch (status) {
      case 'Draft':
        return 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-700';
      case 'Generated':
        return 'bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border-sky-300 dark:border-sky-800';
      case 'Under Review':
        return 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-800';
      case 'Approved':
        return 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800';
      case 'Published':
        return 'bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-800';
    }
  };

  const handleApprove = (id: string) => {
    updateStatus(id, 'Approved');
    showToast('Item Approved', 'Scientific referee approved the draft for public publication.', 'success');
  };

  const handlePublish = (id: string) => {
    updateStatus(id, 'Published');
    showToast('Published to Portal', 'Article is now live in the polar science portal and distribution feeds.', 'success');
  };

  const handleRequestChanges = (id: string) => {
    updateStatus(id, 'Under Review');
    showToast('Changes Requested', 'Feedback routed back to scientific drafter for revisions.', 'warning');
  };

  const handleSaveRefereeReview = () => {
    if (!activeReviewItem) return;
    if (!reviewNote.trim()) {
      showToast('Note Required', 'Please enter referee comments.', 'alert');
      return;
    }

    addComment(activeReviewItem.id, {
      author: refereeName,
      text: reviewNote,
      decision: 'Approve'
    });

    showToast('Peer Review Logged', 'Referee commentary recorded in audit trail.', 'success');
    setActiveReviewItem(null);
    setReviewNote('');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Metrics */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-sm">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Scientific Peer Review & Editorial Board
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Rigorous validation of outreach drafts against empirical expedition datasets
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/studio"
            className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white shadow-sm transition-colors"
          >
            + Create New Story Draft
          </Link>
          <Link
            href="/studio/distribute"
            className="text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
          >
            Dissemination Feeds
          </Link>
        </div>
      </div>

      {/* Responsive Kanban Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 overflow-x-auto pb-4">
        {columns.map((column) => {
          const columnItems = items.filter((it) => it.status === column);

          return (
            <div
              key={column}
              className="flex flex-col rounded-2xl bg-slate-50/80 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 p-3 min-w-[260px]"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${
                    column === 'Draft' ? 'bg-slate-400' :
                    column === 'Generated' ? 'bg-sky-400' :
                    column === 'Under Review' ? 'bg-amber-400' :
                    column === 'Approved' ? 'bg-emerald-400' : 'bg-purple-400'
                  }`} />
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider">
                    {column}
                  </h4>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {columnItems.length}
                </span>
              </div>

              {/* Column Cards */}
              <div className="space-y-3 flex-1">
                {columnItems.length === 0 ? (
                  <div className="h-28 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-center text-xs text-slate-400 dark:text-slate-600">
                    No items in {column}
                  </div>
                ) : (
                  columnItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700/70 shadow-sm hover:shadow-md transition-all space-y-2.5"
                    >
                      {/* Badge & Type */}
                      <div className="flex items-center justify-between gap-1">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getStatusBadge(item.status)}`}>
                          {item.contentType}
                        </span>
                        <span className="text-[9px] text-slate-400 font-mono">
                          {item.createdDate}
                        </span>
                      </div>

                      {/* Card Title */}
                      <h5 className="text-xs font-bold text-slate-900 dark:text-white leading-snug line-clamp-2">
                        {item.title}
                      </h5>

                      {/* Author & Source */}
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 space-y-0.5">
                        <p className="truncate">👤 {item.author}</p>
                        <p className="truncate text-[10px] italic text-slate-400">
                          Source: {item.sourceReportTitle}
                        </p>
                      </div>

                      {/* Review Notes Preview */}
                      {item.reviewComments.length > 0 && (
                        <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900 text-[10px] text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-slate-800 flex items-start gap-1.5">
                          <MessageSquare className="w-3 h-3 text-sky-500 flex-shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{item.reviewComments[item.reviewComments.length - 1].text}</span>
                        </div>
                      )}

                      {/* Card Action Buttons */}
                      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-1 text-[11px]">
                        <button
                          onClick={() => setActiveReviewItem(item)}
                          className="text-sky-600 dark:text-sky-400 hover:underline font-semibold flex items-center gap-1"
                        >
                          <Eye className="w-3 h-3" /> Review
                        </button>

                        <div className="flex items-center gap-1">
                          {column === 'Draft' && (
                            <button
                              onClick={() => updateStatus(item.id, 'Generated')}
                              className="px-2 py-0.5 rounded bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400 font-medium hover:bg-sky-100"
                            >
                              Generate →
                            </button>
                          )}
                          {column === 'Generated' && (
                            <button
                              onClick={() => updateStatus(item.id, 'Under Review')}
                              className="px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 font-medium hover:bg-amber-100"
                            >
                              Submit →
                            </button>
                          )}
                          {column === 'Under Review' && (
                            <button
                              onClick={() => handleApprove(item.id)}
                              className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 font-medium hover:bg-emerald-100"
                            >
                              Approve
                            </button>
                          )}
                          {column === 'Approved' && (
                            <button
                              onClick={() => handlePublish(item.id)}
                              className="px-2 py-0.5 rounded bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 font-medium hover:bg-purple-100"
                            >
                              Publish 🚀
                            </button>
                          )}
                          {column === 'Published' && (
                            <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-0.5">
                              <Check className="w-3 h-3" /> Live
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Scientific Review / Referee Remarks Modal */}
      {activeReviewItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm"
          onClick={() => setActiveReviewItem(null)}
        >
          <div
            className="w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 rounded-2xl shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                  Peer Review & Validation Inspector
                </span>
                <h4 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                  {activeReviewItem.title}
                </h4>
              </div>
              <button
                onClick={() => setActiveReviewItem(null)}
                className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <p className="font-semibold text-slate-900 dark:text-slate-100 mb-1">Executive Summary:</p>
                <p className="italic">{activeReviewItem.summary}</p>
              </div>

              <div>
                <h5 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">Key Scientific Markers:</h5>
                <ul className="list-disc list-inside space-y-0.5 text-slate-500 dark:text-slate-400">
                  {activeReviewItem.keyFacts.map((fact, i) => (
                    <li key={i}>{fact}</li>
                  ))}
                </ul>
              </div>

              {/* Reviewer Input Form */}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-2">
                <label className="font-bold text-slate-900 dark:text-slate-100 block">
                  Domain Scientist Feedback / Referee Remark:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={refereeName}
                    onChange={(e) => setRefereeName(e.target.value)}
                    placeholder="Referee Name & Domain"
                    className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs"
                  />
                  <span className="text-[11px] text-slate-400 flex items-center">
                    Peer review logged with permanent audit hash
                  </span>
                </div>
                <textarea
                  rows={3}
                  value={reviewNote}
                  onChange={(e) => setReviewNote(e.target.value)}
                  placeholder="Enter scientific verification remarks (e.g. verified ice velocity vectors, checked CTD salinity calculations)..."
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2">
              <button
                onClick={() => {
                  handleRequestChanges(activeReviewItem.id);
                  setActiveReviewItem(null);
                }}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-300 dark:border-rose-800"
              >
                Request Revisions
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    handleApprove(activeReviewItem.id);
                    setActiveReviewItem(null);
                  }}
                  className="px-4 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm"
                >
                  Approve Draft
                </button>
                <button
                  onClick={handleSaveRefereeReview}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white"
                >
                  Save Referee Log
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
