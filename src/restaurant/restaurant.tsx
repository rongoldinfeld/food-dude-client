import React from 'react';
import { useParams } from 'react-router-dom';
import restaurantMocks from '../restaurants-feed/restaurants-mock';
import CommentsList from './comments-list/comments-list';

export default function Resturant() {
  const { id } = useParams<{ id: string }>();
  const resturant = restaurantMocks.find((res) => res.id === id);

  return !resturant ? (
    <h1>No restaurant was found with id {id}</h1>
  ) : (
    <div>
      <h2>Restaurant with id {id} was chosen</h2>
      <CommentsList comments={resturant.comments} />
    </div>
  );
}
