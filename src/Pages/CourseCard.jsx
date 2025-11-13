import React from 'react'

const CourseCard = ({cardData,currentCard,setCurrentCard}) => {

  return (
    <div className='border border-red-400'>
      <div>{cardData.heading}</div>
      <div>{cardData.description}</div>
      <div className='flex'>
      <div>{cardData.level}</div>
      <div>{cardData.lessionNumber}</div>
      </div>
    </div>
  );
}

export default CourseCard
