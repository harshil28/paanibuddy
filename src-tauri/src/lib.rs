use tauri::{
    include_image,
    menu::{Menu, MenuItem, PredefinedMenuItem},
    tray::{TrayIconBuilder, TrayIconEvent},
    Emitter,
    Manager,
    PhysicalPosition,
    WindowEvent,
};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_store::Builder::default().build())
        .plugin(tauri_plugin_autostart::init(
            tauri_plugin_autostart::MacosLauncher::LaunchAgent,
            None,
        ))
        // Hide window instead of closing
        .on_window_event(|window, event| {
            if let WindowEvent::CloseRequested { api, .. } = event {
                api.prevent_close();
                let _ = window.hide();
            }
        })
        .setup(|app| {
            //-------------------------
            // Position Window
            //-------------------------

            let window = app.get_webview_window("main").unwrap();

            let monitor = window.current_monitor()?.unwrap();
            let work_area = monitor.work_area();

            let window_width = 420;
            let window_height = 520;
            let margin = 16;

            let x = work_area.position.x
                + work_area.size.width as i32
                - window_width
                - margin;

            let y = work_area.position.y
                + work_area.size.height as i32
                - window_height
                - margin;

            window.set_position(PhysicalPosition::new(x, y))?;

            //-------------------------
            // Tray Menu
            //-------------------------

            let open = MenuItem::with_id(
                app,
                "open",
                "⚙ Settings",
                true,
                None::<&str>,
            )?;

            let reminder = MenuItem::with_id(
                app,
                "reminder",
                "💧 Show Reminder",
                true,
                None::<&str>,
            )?;

            let quit = MenuItem::with_id(
                app,
                "quit",
                "Quit",
                true,
                None::<&str>,
            )?;

            let menu = Menu::with_items(
                app,
                &[
                    &open,
                    &reminder,
                    &PredefinedMenuItem::separator(app)?,
                    &quit,
                ],
            )?;

            TrayIconBuilder::new()
                .icon(include_image!("./icons/tray.ico"))
                .tooltip("Paani Buddy")
                .menu(&menu)
                .on_menu_event(|app, event| {
                    match event.id().as_ref() {
                        "open" => {
                            if let Some(window) =
                                app.get_webview_window("main")
                            {
                                let _ = window.show();
                                let _ = window.unminimize();
                                let _ = window.set_focus();

                                let _ = window.emit("open-settings", ());
                            }
                        }

                        "reminder" => {
                            if let Some(window) =
                                app.get_webview_window("main")
                            {
                                let _ = window.show();
                                let _ = window.unminimize();
                                let _ = window.set_focus();

                                let _ = window.emit("show-reminder", ());
                            }
                        }

                        "quit" => {
                            app.exit(0);
                        }

                        _ => {}
                    }
                })
                .on_tray_icon_event(|tray, event| {
                    if let TrayIconEvent::Click {
                        button,
                        button_state,
                        ..
                    } = event
                    {
                        if button == tauri::tray::MouseButton::Left
                            && button_state
                                == tauri::tray::MouseButtonState::Up
                        {
                            if let Some(window) =
                                tray.app_handle().get_webview_window("main")
                            {
                                let _ = window.show();
                                let _ = window.unminimize();
                                let _ = window.set_focus();
                            }
                        }
                    }
                })
                .build(app)?;

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}