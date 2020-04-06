import React, { useState } from "react";
import axios from "axios";

const ToDoItem = (props) => {
  const { listItem } = props;
  const [title, setTitle] = useState(listItem.title);
  const [editMode, setEditMode] = useState(false);

  const handleEdit = async (e) => {
    e.preventDefault();
    const data = listItem;
    data.title = title;
    try {
      const res = await axios.put(
        "https://jsonplaceholder.typicode.com/todos/" + listItem.id,
        data
      );
      console.log(res.data, "successfully changed");
      props.handleEdit(res.data);
      setEditMode(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <li className='list-group-item todo-item'>
      {!editMode ? (
        <span
          style={{
            textDecorationLine: listItem.completed ? "line-through" : "",
          }}
        >
          {listItem.title}
        </span>
      ) : (
        <form onSubmit={handleEdit}>
          <input
            type='text'
            className='form-control'
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </form>
      )}
      <div>
        <button
          type='button'
          className={`btn btn-${listItem.completed ? "" : "outline-"}success`}
          disabled={editMode}
          onClick={() => props.handleCheck(listItem.id)}
        >
          ✓
        </button>
        <button
          type='button'
          className={` btn btn-${editMode ? "" : "outline-"}primary ml-4`}
          onClick={() => setEditMode(!editMode)}
        >
          <svg
            className='bi bi-pencil'
            width='1em'
            height='1em'
            viewBox='0 0 16 16'
            fill='currentColor'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              d='M11.293 1.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.266-1.265l1-3a1 1 0 01.242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z'
              clipRule='evenodd'
            />
            <path
              fillRule='evenodd'
              d='M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 00.5.5H4v.5a.5.5 0 00.5.5H5v.5a.5.5 0 00.5.5H6v-1.5a.5.5 0 00-.5-.5H5v-.5a.5.5 0 00-.5-.5H3z'
              clipRule='evenodd'
            />
          </svg>
        </button>
        <button
          type='button'
          className='btn btn-outline-danger ml-4'
          onClick={() => props.handleDelete(listItem)}
        >
          X
        </button>
      </div>
    </li>
  );
};

export default ToDoItem;
