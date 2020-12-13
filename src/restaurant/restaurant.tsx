import React from 'react';
import { useParams } from 'react-router-dom';
import restaurantMocks from '../restaurants-feed/restaurants-mock';
import CommentsList from './comments-list/comments-list';

export default function Resturant() {
  const { id } = useParams<{ id: string }>();
  const resturant = restaurantMocks.find((res) => res.id === id);

  return resturant ? (
    <div>
      <h2>Restaurant with id {id} was chosen</h2>
      <h2>Comments about the restaurant</h2>
      {resturant.comments ? (
        <CommentsList comments={resturant.comments} />
      ) : (
        <h2>This restaurant does not contain comments</h2>
      )}
    </div>
  ) : (
    <h1>No restaurant was found with id {id}</h1>
  );
}
