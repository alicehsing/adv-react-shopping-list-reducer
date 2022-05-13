import { useState } from 'react';
import styles from '../../App.css';

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
          className={styles.editBtn}
        >
          Edit
        </button>
      </>
    );
  }
  return (
    <>
      <div className={styles.item}>
        <input
          type="checkbox"
          checked={item.done}
          onChange={(e) => {
            clickUpdate({ ...item, done: e.target.checked });
          }}
          className={styles.checkbox}
        />
        {content}
        <button
          type="button"
          onClick={() => clickDelete(item.id)}
          aria-label={`Delete ${item.text}`}
          className={styles.deleteBtn}
        >
          Delete
        </button>
      </div>
    </>
  );
}
