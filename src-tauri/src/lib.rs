use tauri::{
    include_image,
    tray::TrayIconBuilder,
    Manager,
    PhysicalPosition,
};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_store::Builder::default().build()) // <-- Add this
        .plugin(
    tauri_plugin_autostart::init(
        tauri_plugin_autostart::MacosLauncher::LaunchAgent,
        None,
    )
)
        .setup(|app| {
            // ----------------------------
            // Position companion window
            // ----------------------------

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

            // ----------------------------
            // Create tray icon
            // ----------------------------

            TrayIconBuilder::new()
                .icon(include_image!("./icons/tray.ico"))
                .tooltip("Paani Buddy")
                .build(app)?;

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}