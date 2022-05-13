import { useState } from 'react';

export default function Item({ item, clickUpdate, clickDelete }) {
  const [isEditing, setIsEditing] = useState(false);

  let content;

  if (isEditing) {
    content = (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setIsEditing(false);
        }}
      >
        <input
          value={item.text}
          aria-label="Edit field"
          onChange={(e) => {
            clickUpdate({
              ...item,
              text: e.target.value,
            });
          }}
        />
        <button type="submit" aria-label="Save changes">
          Save
        </button>
      </form>
    );
  } else {
    content = (
      <>
        <p style={{ textDecoration: item.done ? 'line-through' : null }}>
          {item.text}
        </p>
        <button
          type="button"
          onClick={() => setIsEditing(true)}
          aria-label={`Edit ${item.text}`}
        >
          Edit
        </button>
      </>
    );
  }
  return (
    <>
      <div>
        <input
          type="checkbox"
          checked={item.done}
          onChange={(e) => {
            clickUpdate({ ...item, done: e.target.checked });
          }}
        />
        {content}
        <button
          type="button"
          onClick={() => clickDelete(item.id)}
          aria-label={`Delete ${item.text}`}
        >
          Delete
        </button>
      </div>
    </>
  );
}
