use tauri::{Manager, PhysicalPosition};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            let window = app.get_webview_window("main").unwrap();

            let monitor = window.current_monitor()?.unwrap();

            // Excludes the taskbar
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

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}