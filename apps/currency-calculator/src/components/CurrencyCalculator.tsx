'use client';

import { useEffect, useState, useRef } from "react";
import { FiEdit2, FiMoon, FiSun, FiMenu, FiX } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { useTheme } from "@/context/ThemeContext";
import Auth from "./Auth";
import { Counts, Calculation, DialogState, ToastState, DenominationCount } from "@/types";

// Flatten the denominations array
const denominations = [1, 2, 5, 10, 20, 50, 100, 200, 500];

const getISTDateTime = () => {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = { 
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  };
  // Remove the comma and any extra spaces from the formatted date
  return now.toLocaleString('en-IN', options).replace(/,\s*/g, ' ').trim();
};

interface CurrencyCalculatorProps {
  initialSession: Session | null;
}

export default function CurrencyCalculator({ initialSession }: CurrencyCalculatorProps) {
  const { isDarkMode, toggleTheme } = useTheme();
  const [session, setSession] = useState(initialSession);
  const [counts, setCounts] = useState<Counts>(Object.fromEntries(denominations.map(d => [d, { bundle: '', open: '', total: 0 }])));
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [dates, setDates] = useState<string[]>([]);
  const [dateIndex, setDateIndex] = useState(0);
  const [entries, setEntries] = useState<Calculation[]>([]);
  const [entryIndex, setEntryIndex] = useState(0);
  const [showHistory, setShowHistory] = useState(false);
  const [editingEntryId, setEditingEntryId] = useState<string | null>(null);
  const [dialog, setDialog] = useState<DialogState>({ show: false, message: '', type: 'success' });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [toast, setToast] = useState<ToastState>({ show: false, message: '', type: 'success' });
  const dateInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const total = Object.entries(counts).reduce((sum, [d, count]) => {
    return sum + Number(d) * count.total;
  }, 0);

  useEffect(() => {
    if (showHistory) {
      fetchDates();
    }
  }, [showHistory]);

  useEffect(() => {
    if (dates.length > 0 && dateIndex >= 0) {
      fetchEntries(dates[dateIndex]);
    } else {
      setEntries([]);
      setEntryIndex(-1);
    }
  }, [dates, dateIndex]);

  useEffect(() => {
    if (entries.length > 0 && entryIndex >= 0 && entries[entryIndex]?.id) {
      fetchEntry(entries[entryIndex].id);
    } else {
      setCounts(Object.fromEntries(denominations.map(d => [d, { bundle: '', open: '', total: 0 }])));
    }
  }, [entryIndex, entries]);

  const fetchDates = async () => {
    try {
      const { data, error } = await supabase
        .from("calculations")
        .select("ist_timestamp")
        .order("created_at", { ascending: false });
      
      if (error) {
        console.error("Error fetching dates:", error);
        return;
      }

      if (!data || data.length === 0) {
        setDates([]);
        setDateIndex(-1);
        return;
      }

      const uniqueDates = [...new Set(data
        .filter(d => d.ist_timestamp) // Filter out null/undefined timestamps
        .map(d => d.ist_timestamp.split(' ')[0]) // Get just the date part
      )];
      
      setDates(uniqueDates);
      setDateIndex(uniqueDates.length > 0 ? 0 : -1);
    } catch (err) {
      console.error("Unexpected error in fetchDates:", err);
    }
  };

  const fetchEntries = async (selectedDate: string) => {
    if (!selectedDate) return;

    try {
      const { data, error } = await supabase
        .from("calculations")
        .select("id, note, created_at, ist_timestamp, user_id")
        .ilike('ist_timestamp', `${selectedDate}%`)
        .order("created_at", { ascending: false });
      
      if (error) {
        console.error("Error fetching entries:", error);
        return;
      }

      if (!data || data.length === 0) {
        setEntries([]);
        setEntryIndex(-1);
        return;
      }
      
      setEntries(data);
      setEntryIndex(0);
    } catch (err) {
      console.error("Unexpected error in fetchEntries:", err);
    }
  };

  const fetchEntry = async (id: string) => {
    if (!id) return;

    try {
      const { data, error } = await supabase
        .from("denominations")
        .select("denomination, count, bundle_count, open_count")
        .eq("calculation_id", id);
      
      if (error) {
        console.error("Error fetching entry:", error);
        return;
      }

      const newCounts = Object.fromEntries(
        denominations.map(d => [d, { bundle: '', open: '', total: 0 }])
      );

      if (data) {
        data.forEach(({ denomination, count, bundle_count, open_count }) => {
          if (denomination in newCounts) {
            newCounts[denomination] = {
              bundle: bundle_count || '',
              open: open_count || '',
              total: count || 0
            };
          }
        });
      }
      setCounts(newCounts);
    } catch (err) {
      console.error("Unexpected error in fetchEntry:", err);
    }
  };

  const handleChange = (denomination: number, type: 'bundle' | 'open', value: string) => {
    // Allow empty string or any number (positive/negative)
    let newValue = value;
    if (value !== '') {
      newValue = parseInt(value).toString();
      if (isNaN(parseInt(value))) newValue = '';
    }

    setCounts(prev => {
      const prevCount = prev[denomination];
      // Convert values to numbers for calculation, using 0 for empty strings
      const bundleNum = type === 'bundle' ? 
        (newValue === '' ? 0 : Number(newValue)) : 
        (prevCount.bundle === '' ? 0 : Number(prevCount.bundle));
      
      const openNum = type === 'open' ? 
        (newValue === '' ? 0 : Number(newValue)) : 
        (prevCount.open === '' ? 0 : Number(prevCount.open));

      // Calculate total using numbers
      const bundleValue = bundleNum * 100;
      const total = bundleValue + openNum;
      
      return {
        ...prev,
        [denomination]: {
          bundle: type === 'bundle' ? value : prevCount.bundle,
          open: type === 'open' ? value : prevCount.open,
          total: total
        }
      };
    });
  };

  const getRowClassName = (count: DenominationCount) => {
    if (count.total === 0) return 'empty-value';
    if (count.total < 0) return 'negative-value';
    return 'has-value';
  };

  const handleSave = async () => {
    if (!session?.user) {
      setDialog({
        show: true,
        message: "Please sign in to save your calculations.",
        type: 'error'
      });
      return;
    }

    setLoading(true);
    try {
      const istDateTime = getISTDateTime();

      if (editingEntryId) {
        const { error: calcError } = await supabase
          .from("calculations")
          .update({ note })
          .eq('id', editingEntryId)
          .eq('user_id', session.user.id);

        if (calcError) {
          console.error("Error updating calculation:", calcError);
          return;
        }

        const { error: deleteError } = await supabase
          .from("denominations")
          .delete()
          .eq('calculation_id', editingEntryId);

        if (deleteError) {
          console.error("Error deleting old denominations:", deleteError);
          return;
        }

        const entries = denominations
          .filter(d => counts[d].total !== 0)
          .map(d => ({
            calculation_id: editingEntryId,
            denomination: d,
            count: counts[d].total,
            bundle_count: counts[d].bundle === '' ? 0 : parseInt(counts[d].bundle),
            open_count: counts[d].open === '' ? 0 : parseInt(counts[d].open)
          }));

        const { error: denomError } = await supabase
          .from("denominations")
          .insert(entries);

        if (denomError) {
          console.error("Error updating denominations:", denomError);
          return;
        }

        setDialog({
          show: true,
          message: "Entry updated successfully!",
          type: 'success'
        });
      } else {
        const { data: calcData, error: calcError } = await supabase
          .from("calculations")
          .insert([{ 
            note,
            ist_timestamp: istDateTime,
            user_id: session.user.id
          }])
          .select()
          .single();

        if (calcError) {
          console.error("Error saving calculation:", calcError);
          return;
        }

        const entries = denominations
          .filter(d => counts[d].total !== 0)
          .map(d => ({
            calculation_id: calcData.id,
            denomination: d,
            count: counts[d].total,
            bundle_count: counts[d].bundle === '' ? 0 : parseInt(counts[d].bundle),
            open_count: counts[d].open === '' ? 0 : parseInt(counts[d].open)
          }));

        const { error: denomError } = await supabase
          .from("denominations")
          .insert(entries);

        if (denomError) {
          console.error("Error saving denominations:", denomError);
          return;
        }

        setDialog({
          show: true,
          message: "Entry saved successfully!",
          type: 'success'
        });
      }

      setCounts(Object.fromEntries(denominations.map(d => [d, { bundle: '', open: '', total: 0 }])));
      setNote("");
      setEditingEntryId(null);
      
      if (showHistory) {
        fetchDates();
      }
    } catch (err) {
      console.error("Unexpected error in handleSave:", err);
      setDialog({
        show: true,
        message: "An error occurred while saving.",
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    if (entries[entryIndex]?.id) {
      setEditingEntryId(entries[entryIndex].id);
      if (entries[entryIndex]?.note) {
        setNote(entries[entryIndex].note);
      }
      setShowHistory(false);
    }
  };

  const handleDelete = async () => {
    if (!entries[entryIndex]?.id) return;
    
    setDialog({
      show: true,
      message: "Are you sure you want to delete this entry?",
      type: 'confirm',
      onConfirm: async () => {
        setLoading(true);
        try {
          const { error: denomError } = await supabase
            .from("denominations")
            .delete()
            .eq("calculation_id", entries[entryIndex].id);

          if (denomError) {
            console.error("Error deleting denominations:", denomError);
            return;
          }

          const { error: calcError } = await supabase
            .from("calculations")
            .delete()
            .eq("id", entries[entryIndex].id);

          if (calcError) {
            console.error("Error deleting calculation:", calcError);
            return;
          }

          setDialog({
            show: true,
            message: "Entry deleted successfully!",
            type: 'success',
            onClose: () => {
              setDialog({ show: false, message: '', type: 'success' });
              fetchDates();
            }
          });
        } catch (err) {
          console.error("Unexpected error in handleDelete:", err);
        } finally {
          setLoading(false);
        }
      }
    });
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error.message);
    }
  };

  const renderHeader = () => (
    <div className="header">
      <div className="app-title">Cash Counter</div>
      
      {/* Mobile menu button */}
      <button 
        className="menu-toggle"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Header actions container with mobile support */}
      <div className={`header-actions ${isMenuOpen ? 'show' : ''}`}>
        <button 
          className="calculator-theme-toggle"
          onClick={() => {
            toggleTheme();
            setIsMenuOpen(false);
          }}
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
        </button>
        {showHistory ? (
          <button 
            className="history-button"
            onClick={() => {
              setShowHistory(false);
              setCounts(Object.fromEntries(denominations.map(d => [d, { bundle: '', open: '', total: 0 }])));
              setNote("");
              setIsMenuOpen(false);
            }}
          >
            New
          </button>
        ) : (
          <button 
            className="history-button"
            onClick={() => {
              setShowHistory(true);
              setEditingEntryId(null);
              setCounts(Object.fromEntries(denominations.map(d => [d, { bundle: '', open: '', total: 0 }])));
              setNote("");
              setIsMenuOpen(false);
            }}
          >
            History
          </button>
        )}
        <button 
          className="sign-out-button"
          onClick={() => {
            handleSignOut();
            setIsMenuOpen(false);
          }}
        >
          Sign Out
        </button>
      </div>
    </div>
  );

  const renderCalculator = () => (
    <div className="calculator-card">
      {renderHeader()}

      <div className="denominations-container">
        <div className="input-header">
          <span className="header-label">Value</span>
          <span className="header-label">Bundle</span>
          <span className="header-label">Open</span>
          <span className="header-label">Count</span>
          <span className="header-label">Amount</span>
        </div>
        {denominations.map(d => (
          <div key={d} className={`denomination-row ${getRowClassName(counts[d])}`}>
            <label className="denomination-label">₹{d}</label>
            <input
              type="number"
              value={counts[d].bundle}
              onChange={(e) => handleChange(d, 'bundle', e.target.value)}
              className="denomination-input"
              placeholder="0"
              aria-label={`Bundle of ₹${d} notes`}
            />
            <input
              type="number"
              value={counts[d].open}
              onChange={(e) => handleChange(d, 'open', e.target.value)}
              className="denomination-input"
              placeholder="0"
              aria-label={`Open ₹${d} notes`}
            />
            <div className={`denomination-count ${counts[d].total < 0 ? 'negative' : ''}`}>
              {counts[d].total}
            </div>
            <div className={`denomination-total ${counts[d].total < 0 ? 'negative' : ''}`}>
              {d * counts[d].total}
            </div>
          </div>
        ))}
      </div>

      <div className="bottom-container">
        <div className="note-input-container">
          <input
            placeholder="Add note..."
            value={note}
            onChange={(e) => setNote(e.target.value.slice(0, 16))}
            maxLength={16}
            className="note-input"
          />
          <span className="note-char-count">{note.length}/16</span>
        </div>
        <div className="total-amount">
          <span className="total-label">Total:</span>
          <span className="total-value">₹{total}</span>
        </div>
        <button
          onClick={handleSave}
          disabled={loading}
          className="save-button"
        >
          {loading ? "..." : "Save"}
        </button>
      </div>
    </div>
  );

  const renderHistory = () => (
    <div className="calculator-card">
      <div className="header">
        <div className="app-title">Cash Counter</div>
        <button 
          className="history-button"
          onClick={() => {
            setShowHistory(false);
            setCounts(Object.fromEntries(denominations.map(d => [d, { bundle: '', open: '', total: 0 }])));
            setNote("");
          }}
        >
          New
        </button>
      </div>

      <div className="history-navigation">
        <div className="date-selector">
          <button
            className="date-nav-btn prev"
            onClick={() => setDateIndex(Math.min(dateIndex + 1, dates.length - 1))}
            disabled={dateIndex >= dates.length - 1}
            aria-label="Go to past (older date)"
          >
            ←
          </button>
          
          <div className="date-picker-container">
            <input
              ref={dateInputRef}
              type="date"
              max={new Date().toISOString().split('T')[0]}
              value={dates[dateIndex] ? (() => {
                const [dd, mm, yyyy] = dates[dateIndex].split('/');
                return `${yyyy}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`;
              })() : ''}
              onChange={e => {
                const [yyyy, mm, dd] = e.target.value.split('-');
                const picked = `${dd}/${mm}/${yyyy}`;
                const idx = dates.findIndex(d => d === picked);
                if (idx !== -1) {
                  setDateIndex(idx);
                } else {
                  setToast({
                    show: true,
                    message: `No data found for ${picked}`,
                    type: 'error'
                  });
                  // Auto-hide toast after 3 seconds
                  setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
                }
              }}
              className="date-picker-input"
              aria-label="Select date from calendar"
            />
          </div>
          
          <button
            className="date-nav-btn next"
            onClick={() => setDateIndex(Math.max(dateIndex - 1, 0))}
            disabled={dateIndex <= 0}
            aria-label="Go to future (newer date)"
          >
            →
          </button>
        </div>

        <div className="entry-nav">
          <button
            className="nav-button"
            onClick={() => setEntryIndex(Math.min(entryIndex + 1, entries.length - 1))}
            disabled={entryIndex >= entries.length - 1}
          >
            ←
          </button>
          <div className="entry-info">
            <div className="entry-time">
              {entries[entryIndex]?.ist_timestamp ? 
                entries[entryIndex].ist_timestamp.split(' ')[1] :
                ""}
            </div>
            <div className="entry-note">
              {entries[entryIndex]?.note || "-"}
            </div>
          </div>
          <button
            className="nav-button"
            onClick={() => setEntryIndex(Math.max(entryIndex - 1, 0))}
            disabled={entryIndex <= 0}
          >
            →
          </button>
        </div>
      </div>

      <div className="denominations-container">
        <div className="input-header">
          <span className="header-label">Value</span>
          <span className="header-label">Bundle</span>
          <span className="header-label">Open</span>
          <span className="header-label">Count</span>
          <span className="header-label">Amount</span>
        </div>
        {denominations.map(d => (
          <div key={d} className={`denomination-row ${getRowClassName(counts[d])}`}>
            <label className="denomination-label">₹{d}</label>
            <div className="denomination-count">{counts[d].bundle || 0}</div>
            <div className="denomination-count">{counts[d].open || 0}</div>
            <div className={`denomination-count ${counts[d].total < 0 ? 'negative' : ''}`}>
              {counts[d].total}
            </div>
            <div className={`denomination-total ${counts[d].total < 0 ? 'negative' : ''}`}>
              {d * counts[d].total}
            </div>
          </div>
        ))}
      </div>

      <div className="total-container">
        <div className="history-actions">
          <button 
            className="action-button edit"
            onClick={handleEdit}
            disabled={loading}
            title="Edit"
          >
            <FiEdit2 size={20} />
          </button>
          <button 
            className="action-button delete"
            onClick={handleDelete}
            disabled={loading}
            title="Delete"
          >
            {loading ? "..." : <RiDeleteBin6Line size={20} />}
          </button>
        </div>
        <div className="total-amount history-total">
          <span className="total-label">Total:</span>
          <span className="total-value">₹{total}</span>
        </div>
      </div>
    </div>
  );

  const Dialog = () => {
    if (!dialog.show) return null;

    return (
      <div className="dialog-overlay">
        <div className="dialog">
          <div className={`dialog-content ${dialog.type}`}>
            <p>{dialog.message}</p>
            {dialog.type === 'confirm' ? (
              <div className="dialog-actions">
                <button 
                  onClick={() => {
                    dialog.onConfirm?.();
                    setDialog({ show: false, message: '', type: 'success' });
                  }}
                  className="confirm-button"
                >
                  Confirm
                </button>
                <button 
                  onClick={() => setDialog({ show: false, message: '', type: 'success' })}
                  className="cancel-button"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button 
                onClick={() => {
                  dialog.onClose?.();
                  setDialog({ show: false, message: '', type: 'success' });
                }}
                className="ok-button"
              >
                OK
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const Toast = () => {
    if (!toast.show) return null;

    return (
      <div className="toast-overlay">
        <div className={`toast ${toast.type}`}>
          <p>{toast.message}</p>
        </div>
      </div>
    );
  };

  if (!session) {
    return <Auth />;
  }

  return (
    <div className="calculator-container">
      <div className="calculator-wrapper">
        <div className="calculator-card">
          {showHistory ? renderHistory() : renderCalculator()}
        </div>
      </div>
      <Dialog />
      <Toast />
    </div>
  );
}
