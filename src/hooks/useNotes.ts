import { useCallback, useMemo, useEffect, useState } from 'react';
import { trpc } from '@/providers/trpc';
import type { Note } from '@/types';
import { starterNotes, storageConfig } from '@/config';

const LS_KEY = storageConfig.notesKey;

function loadLocalNotes(): Note[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Note[];
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch { /* ignore */ }
  // Seed with starter notes
  const seeded: Note[] = starterNotes.map((n, i) => ({
    id: `local-${i}`,
    title: n.title,
    content: n.content,
    tags: n.tags,
    source: n.source,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  }));
  localStorage.setItem(LS_KEY, JSON.stringify(seeded));
  return seeded;
}

function saveLocalNotes(notes: Note[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(notes));
}

export function useNotes() {
  const utils = trpc.useUtils();
  const [localNotes, setLocalNotes] = useState<Note[]>(loadLocalNotes);

  const { data: dbNotes = [], isLoading, error } = trpc.notes.list.useQuery(
    undefined,
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );

  const isAuthed = !error && dbNotes.length > 0;

  useEffect(() => {
    if (isAuthed && dbNotes.length > 0) {
      // Server notes available — nothing to do
    }
  }, [isAuthed, dbNotes]);

  const notes: Note[] = useMemo(() => {
    if (isAuthed) {
      return dbNotes.map((n) => ({
        id: String(n.id),
        title: n.title,
        content: n.content,
        createdAt: n.createdAt.getTime(),
        updatedAt: n.updatedAt.getTime(),
        tags: (n.tags as string[]) ?? [],
        source: n.source ?? undefined,
      }));
    }
    return localNotes;
  }, [isAuthed, dbNotes, localNotes]);

  const createMutation = trpc.notes.create.useMutation({
    onSuccess: () => {
      utils.notes.list.invalidate();
    },
  });

  const updateMutation = trpc.notes.update.useMutation({
    onSuccess: () => {
      utils.notes.list.invalidate();
    },
  });

  const deleteMutation = trpc.notes.delete.useMutation({
    onSuccess: () => {
      utils.notes.list.invalidate();
    },
  });

  const deleteManyMutation = trpc.notes.deleteMany.useMutation({
    onSuccess: () => {
      utils.notes.list.invalidate();
    },
  });

  const createNote = useCallback(
    (title: string, content: string, source?: string) => {
      return new Promise<Note>((resolve, reject) => {
        if (isAuthed) {
          createMutation.mutate(
            { title, content, tags: [], source },
            {
              onSuccess: (data) => {
                const now = Date.now();
                resolve({
                  id: String(data.id),
                  title,
                  content,
                  createdAt: now,
                  updatedAt: now,
                  tags: [],
                  source,
                });
              },
              onError: (err) => {
                reject(err);
              },
            }
          );
        } else {
          // LocalStorage mode
          const newNote: Note = {
            id: `local-${Date.now()}`,
            title,
            content,
            tags: [],
            source,
            createdAt: Date.now(),
            updatedAt: Date.now(),
          };
          const updated = [...localNotes, newNote];
          setLocalNotes(updated);
          saveLocalNotes(updated);
          resolve(newNote);
        }
      });
    },
    [isAuthed, createMutation, localNotes]
  );

  const updateNote = useCallback(
    (id: string, updates: Partial<Note>) => {
      if (isAuthed) {
        const numId = Number(id);
        if (isNaN(numId)) return;
        updateMutation.mutate({
          id: numId,
          ...(updates.title !== undefined ? { title: updates.title } : {}),
          ...(updates.content !== undefined ? { content: updates.content } : {}),
          ...(updates.tags !== undefined ? { tags: updates.tags } : {}),
          ...(updates.source !== undefined ? { source: updates.source } : {}),
        });
      } else {
        // LocalStorage mode
        const updated = localNotes.map((n) =>
          n.id === id ? { ...n, ...updates, updatedAt: Date.now() } : n
        );
        setLocalNotes(updated);
        saveLocalNotes(updated);
      }
    },
    [isAuthed, updateMutation, localNotes]
  );

  const deleteNote = useCallback(
    (id: string) => {
      if (isAuthed) {
        const numId = Number(id);
        if (isNaN(numId)) return;
        deleteMutation.mutate({ id: numId });
      } else {
        const updated = localNotes.filter((n) => n.id !== id);
        setLocalNotes(updated);
        saveLocalNotes(updated);
      }
    },
    [isAuthed, deleteMutation, localNotes]
  );

  const deleteManyNotes = useCallback(
    (ids: string[]) => {
      if (isAuthed) {
        const numIds = ids.map(Number).filter((n) => !isNaN(n));
        if (numIds.length === 0) return;
        deleteManyMutation.mutate({ ids: numIds });
      } else {
        const updated = localNotes.filter((n) => !ids.includes(n.id));
        setLocalNotes(updated);
        saveLocalNotes(updated);
      }
    },
    [isAuthed, deleteManyMutation, localNotes]
  );

  return {
    notes,
    isLoading: isLoading && isAuthed,
    createNote,
    updateNote,
    deleteNote,
    deleteManyNotes,
  };
}
