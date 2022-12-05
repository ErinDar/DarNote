<select size={notebooks.length}>
    {notebooks[0] && notebooks.map((notebook, idx) => (
        <option>{notebook.name}</option>
    ))}
</select>