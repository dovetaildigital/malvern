export default function MobileToggle({ isOpen, toggle }: { isOpen: boolean; toggle: () => void }) {
  return (
    <button
      onClick={toggle}
      aria-label="Toggle menu"
      aria-expanded={isOpen}
      className="text-2xl"
    >
      <i className={`ph ${isOpen ? 'ph-x' : 'ph-list'}`} />
    </button>
  );
}