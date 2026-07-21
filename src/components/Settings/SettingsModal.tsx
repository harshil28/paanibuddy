import { useEffect, useState } from "react";
import "./SettingsModal.css";
import type { Settings } from "../../types/settings";
import { useSettingsStore } from "../../store/settingsStore";

interface SettingsModalProps {
    open: boolean;
    onClose: () => void;
}

export default function SettingsModal({
    open,
    onClose,
}: SettingsModalProps) {
    const { settings, save } = useSettingsStore();

    const [form, setForm] = useState<Settings>(settings);

    useEffect(() => {
        if (open) {
            setForm(settings);
        }
    }, [open, settings]);

    if (!open) return null;

    const handleSave = async () => {
    console.log("Save button clicked");
    console.log(form);

    await save(form);
onClose();

    onClose();
};

    return (
        <div className="settings-overlay">
            <div className="settings-modal">
                <h2>Paani Buddy Settings</h2>

                <div className="field">
                    <label>Reminder Interval (minutes)</label>

                    <input
                        type="number"
                        value={form.reminderInterval}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                reminderInterval: Number(e.target.value),
                            })
                        }
                    />
                </div>

                <div className="field">
                    <label>Snooze (minutes)</label>

                    <input
                        type="number"
                        value={form.snoozeMinutes}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                snoozeMinutes: Number(e.target.value),
                            })
                        }
                    />
                </div>

                <div className="field">
                    <label>Start Hour</label>

                    <input
                        type="number"
                        value={form.startHour}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                startHour: Number(e.target.value),
                            })
                        }
                    />
                </div>

                <div className="field">
                    <label>End Hour</label>

                    <input
                        type="number"
                        value={form.endHour}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                endHour: Number(e.target.value),
                            })
                        }
                    />
                </div>

                <div className="buttons">
                    <button onClick={onClose}>
                        Cancel
                    </button>

                    <button onClick={handleSave}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}