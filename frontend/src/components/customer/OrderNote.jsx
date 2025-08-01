import { Textarea } from "@/components/ui/textarea";
import useCart from "@/stores/useCart";

const OrderNote = () => {
  const note = useCart((state) => state.note);
  const setNote = useCart((state) => state.setNote);

  return (
    <div className="mt-4">
      <label
        htmlFor="order-note"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Add a note to your order
      </label>
      <Textarea
        id="order-note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Special instructions, allergies, etc."
        className="w-full resize-none"
        rows={3}
      />
    </div>
  );
};

export default OrderNote;
