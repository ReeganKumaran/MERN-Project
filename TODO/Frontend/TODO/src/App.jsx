import { useEffect, useState } from "react";
import "./App.css";
import Card from "./Component/Card";
import PlusBtn from "./Component/PlusBtn.Jsx";
function App() {
  const [todoData, setTodoData] = useState([]);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [cardTodoData, setCardTodoData] = useState("");
  const [isEdit, setEdit] = useState(false);
  const [updatedData, setUpdate] = useState({
    id: null,
    data: null,
    isSelect: false,
  });
  async function fetchData() {
    try {
      const res = await fetch("http://localhost:4000/todo", { method: "GET" });
      const data = await res.json();
      setTodoData(data);
    } catch (err) {
      console.log(err);
    }
  }
  async function addData() {
    try {
      const res = await fetch("http://localhost:4000/todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: cardTodoData,
        }),
      });
      const data = await res.json(); // <-- await here
      console.log(data);
    } catch (err) {
      console.log(err);
    }
    fetchData();
  }
  useEffect(() => {
    fetchData();
  }, []);
  async function deleteData(id) {
    console.log(id);
    try {
      await fetch(`http://localhost:4000/todo?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json", // <-- fixed typo
        },
      });
    } catch (err) {
      console.log(err);
    }
    fetchData();
  }
  async function updateData(data) {
    console.log(JSON.stringify({ data: data.data }));
    try {
      await fetch(`http://localhost:4000/todo?id=${data.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: data.data }),
      });
    } catch (error) {
      console.log(error);
    }
    fetchData();
  }
  async function handleSelect(data) {
    console.log(data);
    console.log(JSON.stringify({ isSelect: data.isSelect, data: data.data }));
    try {
      await fetch(`http://localhost:4000/todo?id=${data.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isSelect: !data.isSelect, data: data.data }),
      });
    } catch (err) {
      console.log(err);
    }
    fetchData();
  }
  console.log(todoData);
  return (
    <>
      <div className="relative min-h-screen bg-gray-50">
        <div className="overflow-x-auto p-4">
          {todoData.length != 0 && (
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
              <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
                <tr>
                  <th className="px-6 py-3 border">Todo</th>
                  <th className="border w-25">Select</th>
                  <th className="px-6 py-3 border w-50">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm">
                {todoData.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-gray-50 transition duration-200"
                  >
                    <td className="px-6 py-4 border text-center">
                      {item.data}
                    </td>
                    <td className="border">
                      <div className="flex justify-center">
                        <input
                          type="checkbox"
                          checked={item.isSelect || false}
                          onChange={() => {
                            setUpdate({
                              id: item._id,
                              data: item.data,
                              isSelect: item.isSelect,
                            });
                            handleSelect({
                              id: item._id,
                              data: item.data,
                              isSelect: item.isSelect,
                            });
                          }}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 border">
                      <div className="flex justify-around items-center">
                        <button
                          onClick={() => {
                            setEdit(true);
                            setIsCardOpen(true);
                            setUpdate(() => ({
                              id: item._id,
                              data: item.data,
                              isSelect: item.isSelect,
                            }));
                          }}
                          className="text-blue-600 hover:underline mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            deleteData(item._id);
                          }}
                          className="text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Card should always be mounted */}
        <Card
          updateData={updateData}
          isEdit={isEdit}
          setEdit={setEdit}
          addData={addData}
          isOpen={isCardOpen}
          setIsOpen={setIsCardOpen}
          cardTodoData={cardTodoData}
          setCardTodoData={setCardTodoData}
          setUpdate={setUpdate}
          updatedData={updatedData}
        />
      </div>

      {/* Floating Plus Button */}
      <PlusBtn isOpen={isCardOpen} setIsOpen={setIsCardOpen} />
    </>
  );
}

export default App;
