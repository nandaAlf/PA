
import React from 'react'
import Button from './Button'
export default function AccionButtons({ selectedStudies, handleEdit, handleDelete, handleCreate }) {
  return (
    <div>
       {selectedStudies.length == 0 ? (
      <Button iconNumber={1} details={"circular add"} action={handleCreate} />
    ) : (
        <Button iconNumber={3} details={"circular delete"} action={handleDelete} />
    )}
    </div>
  )
}


