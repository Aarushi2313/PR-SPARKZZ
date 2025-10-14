Place your large video assets here so they are served statically by Vite.

Required filename for the hero component in `src/Components/Hero.jsx`:

  public/videos/digital-marketing-promo.mp4

Notes:
- Files in `public/` are served at the root path. So `public/videos/digital-marketing-promo.mp4` is available at `/videos/digital-marketing-promo.mp4` in the browser.
- For development, you can add or replace the MP4 file without rebuilding the app.
- If you prefer bundling the video into the JS bundle (not recommended for very large files), place it under `src/` and import it in the component instead.
