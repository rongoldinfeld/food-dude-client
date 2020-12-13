import React from 'react';
import { useParams } from 'react-router-dom';
import restaurantMocks from '../restaurants-feed/restaurants-mock';

export default function Resturant() {
  const { id } = useParams<{ id: string }>();
  const resturant = restaurantMocks.find((res) => res.id === id);

  return resturant ? (
    <div>
      <h2>Restaurant with id {id} was chosen</h2>
      <h2>Comments about the restaurant</h2>
      {resturant.comments?.map((comment) => (
        <h3 key={comment.id}>
          {comment.name} said: {comment.data}
        </h3>
      ))}
    </div>
  ) : (
    <h1>No restaurant was found with id {id}</h1>
  );
}
