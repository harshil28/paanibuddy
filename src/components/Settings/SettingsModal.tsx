import { useEffect, useState } from "react";
import "./SettingsModal.css";
import type { Settings } from "../../types/settings";
import { useSettingsStore } from "../../store/settingsStore";
import {
    enable,
    disable,
    isEnabled,
} from "@tauri-apps/plugin-autostart";

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

    useEffect(() => {
    const syncAutoStart = async () => {
        const enabled = await isEnabled();

        setForm((prev) => ({
            ...prev,
            launchOnStartup: enabled,
        }));
    };

    if (open) {
        syncAutoStart();
    }
}, [open]);

    if (!open) return null;

   const handleSave = async () => {

    if (form.launchOnStartup) {
        await enable();
    } else {
        await disable();
    }

    await save(form);

    onClose();
};

    return (
        <div className="settings-modal">
            <h2>Paani Buddy</h2>

            <div className="field">
                <label>Reminder</label>

                <div className="input-row">
                    <input
                        type="number"
                        min={1}
                        max={60}
                        value={form.reminderInterval}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                reminderInterval: Number(e.target.value),
                            })
                        }
                    />

                    <span>min</span>
                </div>
            </div>

            <div className="field">
                <label>Snooze</label>

                <div className="input-row">
                    <input
                        type="number"
                        min={1}
                        max={60}
                        value={form.snoozeMinutes}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                snoozeMinutes: Number(e.target.value),
                            })
                        }
                    />

                    <span>min</span>
                </div>
            </div>

            <div className="field">
                <label>Active Hours</label>

                <div className="hours-row">
                    <input
                        type="number"
                        min={8}
                        max={23}
                        value={form.startHour}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                startHour: Number(e.target.value),
                            })
                        }
                    />

                    <span>→</span>

                    <input
                        type="number"
                        min={0}
                        max={23}
                        value={form.endHour}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                endHour: Number(e.target.value),
                            })
                        }
                    />
                </div>
            </div>

            <div className="checkbox-field">
                <label>
                    <input
                        type="checkbox"
                        checked={!!form.launchOnStartup}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                launchOnStartup: e.target.checked,
                            })
                        }
                    />

                    Launch on Windows startup
                </label>
            </div>

            <div className="buttons">
                <button onClick={onClose}>
                    Cancel
                </button>

                <button
                    className="save-btn"
                    onClick={handleSave}
                >
                    Save
                </button>
            </div>
        </div>
);
}