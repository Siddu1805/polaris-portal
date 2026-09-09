'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type SavedItemType = 'report' | 'dataset' | 'expedition' | 'researcher' | 'story';

export interface SavedRecord {
  type: SavedItemType;
  id: string;
  savedAt: string;
}

interface SavedItemsContextType {
  savedItems: SavedRecord[];
  toggleSave: (type: SavedItemType, id: string) => boolean;
  isSaved: (type: SavedItemType, id: string) => boolean;
  getSavedByType: (type: SavedItemType) => string[];
}

const SavedItemsContext = createContext<SavedItemsContextType | undefined>(undefined);

export function SavedItemsProvider({ children }: { children: React.ReactNode }) {
  const [savedItems, setSavedItems] = useState<SavedRecord[]>([
    { type: 'report', id: 'rep-43-01', savedAt: '2024-02-10' },
    { type: 'dataset', id: 'ds-ice-01', savedAt: '2024-02-12' },
    { type: 'expedition', id: 'exp-43-iae', savedAt: '2024-02-15' },
    { type: 'story', id: 'story-01', savedAt: '2024-02-18' }
  ]);

  useEffect(() => {
    const local = localStorage.getItem('polaris_saved_items');
    if (local) {
      try {
        setSavedItems(JSON.parse(local));
      } catch (e) {
        console.error('Failed to parse saved items', e);
      }
    }
  }, []);

  const persist = (items: SavedRecord[]) => {
    setSavedItems(items);
    localStorage.setItem('polaris_saved_items', JSON.stringify(items));
  };

  const isSaved = (type: SavedItemType, id: string) => {
    return savedItems.some((item) => item.type === type && item.id === id);
  };

  const toggleSave = (type: SavedItemType, id: string) => {
    const exists = isSaved(type, id);
    if (exists) {
      const next = savedItems.filter((i) => !(i.type === type && i.id === id));
      persist(next);
      return false;
    } else {
      const next = [...savedItems, { type, id, savedAt: new Date().toISOString().split('T')[0] }];
      persist(next);
      return true;
    }
  };

  const getSavedByType = (type: SavedItemType) => {
    return savedItems.filter((i) => i.type === type).map((i) => i.id);
  };

  return (
    <SavedItemsContext.Provider value={{ savedItems, toggleSave, isSaved, getSavedByType }}>
      {children}
    </SavedItemsContext.Provider>
  );
}

export function useSavedItems() {
  const context = useContext(SavedItemsContext);
  if (!context) {
    throw new Error('useSavedItems must be used within a SavedItemsProvider');
  }
  return context;
}
