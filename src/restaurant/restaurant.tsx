import React from 'react';
import { useParams } from 'react-router-dom';

export default function Resturant() {
  const { id } = useParams<{ id: string }>();
  return <h2>Restaurant with id {id} was chosen</h2>;
}
