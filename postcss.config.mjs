// Tailwind removed (Phase 0) — the design system owns styling via colocated CSS Modules
// against tokens.css's custom properties. No postcss plugins are needed right now; Next's
// built-in CSS pipeline handles autoprefixing on its own. Left as an explicit empty config
// (rather than deleted — this tool can't delete files on your disk) so it's obvious this was
// an intentional removal, not an oversight. Safe to delete manually if you'd rather not keep it.
const config = {
  plugins: {},
};

export default config;
