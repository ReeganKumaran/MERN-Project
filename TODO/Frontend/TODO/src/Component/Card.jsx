function Card({
  isOpen,
  setIsOpen,
  setCardTodoData,
  cardTodoData,
  addData,
  isEdit,
  setUpdate,
  setEdit,
  updateData,
  updatedData,
}) {
  return (
    <div
      className={`fixed inset-0 z-40 flex items-center justify-center backdrop-blur-sm transition-opacity duration-300 ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`w-[400px] h-[300px] bg-white border shadow-2xl rounded-lg flex flex-col justify-between p-4 transform transition-transform duration-300 ${
          isOpen ? "scale-100" : "scale-90"
        }`}
      >
        <textarea
          onChange={(e) => {
            setCardTodoData(e.target.value);
            if (isEdit)
              setUpdate((prev) => ({ ...prev, data: e.target.value }));
          }}
          value={cardTodoData}
          className="w-full h-full resize-none"
          placeholder="Type something..."
        ></textarea>

        <button
          onClick={() => {
            if (isEdit) updateData(updatedData);
            if (cardTodoData && !isEdit) addData();
            setIsOpen(false);
            setCardTodoData("");
            setEdit(false);
          }}
          className="w-full bg-blue-500 text-white py-2 rounded mt-2"
        >
          {isEdit ? "Update" : "Submit"}
        </button>
      </div>
    </div>
  );
}
export default Card;
